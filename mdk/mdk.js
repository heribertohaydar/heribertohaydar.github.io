
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


function loadLatestAddedSongs() {
    var hints = {"$max": 5, "$orderby": {"_id": -1}};
    db.playlist.find({}, hints, function(err, res){
        if (!err){
            for (const r of res) {
                let element = document.getElementById('latestAddedSongSection');
                let div = document.createElement('div');
                let pTitle = document.createElement('p');
                let pPosted = document.createElement('p');
                let i = document.createElement('i');
                let br = document.createElement('br');
                let nodeTitle = document.createTextNode(r.dateAdded.substring(0,10));
                let nodePosted = document.createTextNode("Added by: ");
                let iText = document.createTextNode(r.uploader);
                let aText = document.createTextNode("Play");

                let ahref = document.createElement('a');
                ahref.href="javascript:playLatestAddedSong('" + r.idYoutubeVideo + "');"
                ahref.appendChild(aText);

                i.appendChild(iText);

                div.classList.add('article');


                pTitle.classList.add('title');
                pPosted.classList.add('posted');

                pTitle.appendChild(nodeTitle);
                pPosted.appendChild(nodePosted);
                pPosted.appendChild(i);


                div.appendChild(br);
                div.appendChild(pTitle);
                div.appendChild(pPosted);
                div.appendChild(ahref);
                element.appendChild(div);

            }
        }});
}

function onYouTubeIframeAPIReady() {
    db.playlist.find(query, hints, function(err, res){
    if (!err){
        res.sort(() => Math.random() - 0.5);
        listVideos = JSON.stringify(res.map(e => e.idYoutubeVideo)).replace("[","").replace("]","").replace(/\"/g, "");
        initialVideo = res[getRandomInt(res.length)]['idYoutubeVideo'];
        player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: initialVideo,
        playerVars: {
            controls: 1,
            showinfo: 1,
            playlist: listVideos,
            enablejsapi: 1,
            loop: 1,
            modestbranding: 1,
            origin: "127.0.0.1"
        },
        });
    }});
}

function pad2(n) {
    return (n < 10 ? '0' : '') + n;
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
            var uploader_text = $('#uploader').val();
            if (uploader_text == "") uploader_text="Not defined."
            var date = new Date();
            var month = pad2(date.getMonth()+1);//months (0-11)
            var day = pad2(date.getDate());//day (1-31)
            var year= date.getFullYear();
            var formattedDate =  day+"/"+month+"/"+year;
            var jsondata = {"idYoutubeVideo": id, "uploader": uploader_text, "dateAdded": formattedDate};
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
        f=res[res.length-1];
        //res[0]=res[res.length-1];
        //res[res.length-1]=t;
        res.sort(() => Math.random() - 0.5);
        res[0]=f;
        res[res.length-1]=t;
        listVideos = JSON.stringify(res.map(e => e.idYoutubeVideo)).replace("[","").replace("]","").replace(/\"/g, "");
        player.loadVideoById(id);
        player.cuePlaylist(listVideos);
        console.log("The following video was added to play list. " + id);
    }});

}

function reloadPlayList()  {
    db.playlist.find({}, {}, function(err, res){
        if (!err){
            res.sort(() => Math.random() - 0.5);
            listVideos = JSON.stringify(res.map(e => e.idYoutubeVideo)).replace("[","").replace("]","").replace(/\"/g, "");
            player.cuePlaylist(listVideos);
            console.log("Playlist was reload succesfully.");
        }});
}

function playLatestAddedSong(id) {
    //player.cueVideoById(id);
     //player.cuePlaylist()
    //player.cueVideoById(video_id);
    id=id;
    player.loadVideoById(id);
    //player.cuePlaylist(listVideos);
    console.log("Play this video. " + id);
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
