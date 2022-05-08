const properties = new Object();

//Environment 'dev', 'qua' or 'prod' -> 'dev' load first 50 tracks only
properties.ENV = "qua"

properties.HOME_URL_DEV = "http://localhost:5500/"
properties.HOME_URL_PROD = "https://hhaydar.github.io/songStats"

//Spotify API parameters

properties.SPOTIFY_API_REDIRECT_URI_DEV =
  "http://localhost:5500/likedsongs.html"
properties.SPOTIFY_API_REDIRECT_URI_PROD =
  "https://hhaydar.github.io/songStats/likedsongs.html"

properties.SPOTIFY_CLIENT_ID_DEV = "e71c9ec155234360ae1c631c62189ac2"
properties.SPOTIFY_CLIENT_ID_PROD = "c2337d04d44c4035824ad6da1fb7d062"

properties.SPOTIFY_SCOPE_USER_DATA =
  "user-read-recently-played user-library-read playlist-read-private"
properties.SPOTIFY_API_URL = "https://accounts.spotify.com/authorize"
properties.SPOTIFY_LOGOUT_URL = "https://www.spotify.com/logout/"

//Spotify API Endpoints URLs to get data
properties.SPOTIFY_ARTISTS_ENDPOINT = "https://api.spotify.com/v1/artists/?"
properties.SPOTIFY_LIKED_SONGS_ENDPOINT =
  "https://api.spotify.com/v1/me/tracks?limit=1"
properties.SPOTIFY_LIKED_SONGS_ENDPOINT_INCREMENTAL =
  "https://api.spotify.com/v1/me/tracks?offset=0&limit=50"

//Make id unique
properties.ID_UNIQUE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

//Set dev/prod accordingly
if (properties.ENV == "prod") {
  properties.HOME_URL = properties.HOME_URL_PROD
  properties.SPOTIFY_API_REDIRECT_URI =
    properties.SPOTIFY_API_REDIRECT_URI_PROD
  properties.SPOTIFY_CLIENT_ID = properties.SPOTIFY_CLIENT_ID_PROD
} else {
  properties.HOME_URL = properties.HOME_URL_DEV
  properties.SPOTIFY_API_REDIRECT_URI = properties.SPOTIFY_API_REDIRECT_URI_DEV
  properties.SPOTIFY_CLIENT_ID = properties.SPOTIFY_CLIENT_ID_DEV
}
