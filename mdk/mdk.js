/*
 * MDK
 * Functions to manage youtube music
 */

let player;
let options = {
  url: "",
  logging: false,
  realtime: false,
  jwt: false,
};
let db = new restdb("6091adf3f2fc22523a42c81f", options);
let query = {}; // get all records
let hints = {}; // top ten, sort by creation id in descending order
let listVideos;
let initialVideo;
let dataSpotify;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function loadLatestAddedSongs() {
  let hints = { $max: 7, $orderby: { _id: -1 } };
  db.playlist.find({}, hints, function (err, res) {
    if (!err) {
      for (const r of res) {
        let element = document.getElementById("latestAddedSongSection");
        let div = document.createElement("div");
        let pTitle = document.createElement("p");
        let pPosted = document.createElement("p");
        let i = document.createElement("i");
        let br = document.createElement("br");
        let ahref = document.createElement("a");

        ahref.href =
          "javascript:playLatestAddedSong('" + r.idYoutubeVideo + "');";
        ahref.innerText="Play";

        i.innerText=r.uploader;

        div.classList.add("article");

        pTitle.classList.add("title");
        pPosted.classList.add("posted");

        pTitle.innerText=r.dateAdded.substring(0, 10);
        pPosted.innerText="Added by: ";
        pPosted.appendChild(i);

        div.appendChild(br);
        div.appendChild(pTitle);
        div.appendChild(pPosted);
        div.appendChild(ahref);
        element.appendChild(div);
      }
    }
  });
}

function onYouTubeIframeAPIReady() {
  db.playlist.find(query, hints, function (err, res) {
    if (!err) {
      res.sort(() => Math.random() - 0.5);
      listVideos = JSON.stringify(res.map((e) => e.idYoutubeVideo))
        .replace("[", "")
        .replace("]", "")
        .replace(/\"/g, "");
      initialVideo = res[getRandomInt(res.length)]["idYoutubeVideo"];
      player = new YT.Player("video-placeholder", {
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
        },
      });
    }
  });
}

function getNewReleasesFromSpotify() {
  let url = "https://accounts.spotify.com/api/token";
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader(
    "Authorization",
    "Basic OWRiYmEwNmE1ZDFmNDU2Mjk2MWNhNjEyYjVkMjRjN2E6YTk4Yjg5YTc1ZDI4NGE4NWJkOGM4ODA3ZTI5MTg4MmI="
  );
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  let data = "grant_type=client_credentials";
  xhr.send(data);
  let tokenSpotify;
  xhr.onload = function () {
    tokenSpotify = "Bearer " + JSON.parse(xhr.responseText).access_token;
    getAuthorizedListSpotify(tokenSpotify);
  };
}

function getAuthorizedListSpotify(token) {
  let url =
    "https://api.spotify.com/v1/browse/new-releases?country=CO&limit=7&offset=5";
  let req = new XMLHttpRequest();
  req.open("GET", url);
  req.setRequestHeader("Accept", "application/json");
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("Authorization", token);
  req.send();
  req.onload = function () {
    dataSpotify = JSON.parse(req.responseText);
    for (const album of dataSpotify.albums.items) {
      buildSopotifyElements(
        album.name,
        album.artists[0].name,
        album.release_date,
        album.artists[0].external_urls.spotify
      );
    }
  };
}

function buildSopotifyElements(song, artist, date, link) {
  let element = document.getElementById("newSpotifyReleases");
  let divSong = document.createElement("div");
  let divArtist = document.createElement("div");
  let divDate = document.createElement("div");
  let a = document.createElement("a");
  let divSongText = document.createTextNode(song);
  let divArtistText = document.createTextNode(artist);
  let divDateText = document.createTextNode("Release on: " + date);
  let br = document.createElement("br");

  a.href = link;
  a.target = "_blank";
  a.style = "color: pink";
  a.innerText="Listen"

  divSong.classList.add("ads");
  divSong.appendChild(divSongText);

  divArtist.classList.add("repoTitle");
  divArtist.appendChild(divArtistText);

  divDate.classList.add("issueDetail");
  divDate.appendChild(divDateText);

  divSong.appendChild(divArtist);
  divSong.appendChild(divDate);
  divDate.appendChild(br);
  divDate.appendChild(a);

  element.appendChild(divSong);
}

function pad2(n) {
  return (n < 10 ? "0" : "") + n;
}

function validVideoId(id) {
  let img = new Image();
  img.src = "http://img.youtube.com/vi/" + id + "/0.jpg";
  img.onload = function () {
    if (this.width < 320) {
      sendMessage(
        "The song pasted doesn't exist on youtube database, please verify your url."
      );
    } else {
      let uploader_text = $("#uploader").val();
      if (uploader_text == "") uploader_text = "mdk.";
      let date = new Date();
      let month = pad2(date.getMonth() + 1); //months (0-11)
      let day = pad2(date.getDate()); //day (1-31)
      let year = date.getFullYear();
      let formattedDate = day + "/" + month + "/" + year;
      let jsondata = {
        idYoutubeVideo: id,
        uploader: uploader_text,
        dateAdded: formattedDate,
      };
      let settings = {
        async: true,
        crossDomain: true,
        url: "https://mdkv10-85fe.restdb.io/rest/playlist",
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-apikey": "6091adf3f2fc22523a42c81f",
          "cache-control": "no-cache",
        },
        processData: false,
        data: JSON.stringify(jsondata),
      };

      $.ajax(settings).done(function (response) {
        setTimeout(() => {
          reloadNewSong(id);
        }, 500);
      });
    }
  };
}

function reloadNewSong(id) {
  //player.cueVideoById(id);
  //player.cuePlaylist()
  //player.cueVideoById(video_id);
  db.playlist.find({}, {}, function (err, res) {
    if (!err) {
      t = res[0];
      f = res[res.length - 1];
      //res[0]=res[res.length-1];
      //res[res.length-1]=t;
      res.sort(() => Math.random() - 0.5);
      res[0] = f;
      res[res.length - 1] = t;
      listVideos = JSON.stringify(res.map((e) => e.idYoutubeVideo))
        .replace("[", "")
        .replace("]", "")
        .replace(/\"/g, "");
      player.loadVideoById(id);
      player.cuePlaylist(listVideos);
      sendMessage("Your song was added successfuly to MDK playlist.");
      let element = document.getElementById("latestAddedSongSection");
      removeAllChildNodes(element);
      loadLatestAddedSongs();
    }
  });
}

function reloadPlayList() {
  db.playlist.find({}, {}, function (err, res) {
    if (!err) {
      res.sort(() => Math.random() - 0.5);
      listVideos = JSON.stringify(res.map((e) => e.idYoutubeVideo))
        .replace("[", "")
        .replace("]", "")
        .replace(/\"/g, "");
      player.cuePlaylist(listVideos);
      sendMessage("Playlist reloaded successfuly.");
      let element = document.getElementById("latestAddedSongSection");
      removeAllChildNodes(element);
      loadLatestAddedSongs();
    }
  });
}

function sendMessage(m) {
  document.getElementById("MKD.message").innerHTML = m;
  document.getElementById("MKD.message").style.display = "block";
}
function playLatestAddedSong(id) {
  //player.cueVideoById(id);
  //player.cuePlaylist()
  //player.cueVideoById(video_id);
  id = id;
  player.loadVideoById(id);
  //player.cuePlaylist(listVideos);
  //console.log("Play this video. " + id);
}

function addNewSong() {
  sendMessage("Adding new song to MDK playlist, please wait.");
  let url = $("#urlSong").val();
  $("#urlSong").val("");
  let video_id = url.split("v=")[1];
  if (video_id == null) {
    video_id = url.split(".be/")[1];
  }
  if (video_id == null) {
    return;
  }
  let ampersandPosition = video_id.indexOf("&");
  if (ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
  }
  query = { idYoutubeVideo: video_id };
  hints = {};
  db.playlist.find(query, hints, function (err, res) {
    if (!err) {
      if (res.length > 0) {
        sendMessage(
          "Your song already exists on MDK playlist, please add one different."
        );
      } else {
        validVideoId(video_id);
      }
    }
  });
}
