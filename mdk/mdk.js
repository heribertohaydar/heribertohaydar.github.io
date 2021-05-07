
/* 
 * MDK 
 * Functions to manage youtube music
 */

var player;
var options = {
    "url" : "",
    "logging" : false,
    "realtime" :false,
    "jwt" : false
}
var db = new restdb("6091adf3f2fc22523a42c81f", options);
var query = {}; // get all records
var hints = {}; // top ten, sort by creation id in descending order
var listVideos;
var initialVideo;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function onYouTubeIframeAPIReady() {

    db.playlist.find(query, hints, function(err, res){
    if (!err){
        listVideos = JSON.stringify(res.map(e => e.idYoutubeVideo)).replace("[","").replace("]","").replace(/\"/g, "");
        initialVideo = res[getRandomInt(res.length)]['idYoutubeVideo'];
        player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: initialVideo,
        playerVars: {
            color: 'white',
            controls: 1,
            autoplay: 1,
            loop: 1,
            modestbranding: 1,
            theme: "light",
            showinfo: 0,
            playlist: listVideos
        },
        });
    }});
}

function validVideoId(id) {
    var img = new Image();
    img.src = "http://img.youtube.com/vi/" + id + "/0.jpg";
    id=id;// I don't get it how this works!!!! but when copy id value .. inner function works
    img.onload = function () {
        if (this.width < 320) {
            console.log("The following video doesn't exist on Youtube database. " + id);
        } else {
            console.log("The following video exists on Youtube database. " + id);
            var jsondata = {"idYoutubeVideo": id};
            var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://mdkv10-85fe.restdb.io/rest/playlist",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "6091adf3f2fc22523a42c81f",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
            }

            $.ajax(settings).done(function (response) {
                setTimeout(() => {  
                    reloadNewSong(id); 
                    console.log("The following video was added to MDK database. " + id);
                }, 1000);
                
            });                    
        }
    }
}

function reloadNewSong(id) {
    //player.cueVideoById(id);
     //player.cuePlaylist()
    //player.cueVideoById(video_id);
    id=id;
    db.playlist.find({}, {}, function(err, res){
    if (!err){
        t=res[0];
        res[0]=res[res.length-1];
        res[res.length-1]=t;
        listVideos = JSON.stringify(res.map(e => e.idYoutubeVideo)).replace("[","").replace("]","").replace(/\"/g, "");
        player.loadVideoById(id);
        player.cuePlaylist(listVideos);
        console.log("The following video was added to play list. " + id);
    }});

}

function addNewSong() {

    var url = $('#urlSong').val();
    $('#urlSong').val("");
    var video_id = url.split('v=')[1];
    if (video_id==null) {
        video_id = url.split('.be/')[1];;
    }
    if (video_id==null) {
        return;
    }
    var ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }
    query={"idYoutubeVideo":video_id};
    hints={};
    db.playlist.find(query, hints, function(err, res){
        if (!err){
            if (res.length > 0) {
                console.log("The following video already exists on MDK database. " + video_id);
            } else {
                console.log("The following video doesn't exist on MDK database. " + video_id);
                validVideoId(video_id);
            }
        }});
}
