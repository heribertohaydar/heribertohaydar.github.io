const properties = new Object();
properties.HOME_URL = 'http://localhost:5500/'
//Environment 'dev' or 'prod' -> 'dev' load first 50 tracks only
properties.ENV = 'dev'

//Spotify API parameters
properties.SPOTIFY_API_REDIRECT_URI = 'http://localhost:5500/likedsongs.html'
properties.SPOTIFY_CLIENT_ID = 'e71c9ec155234360ae1c631c62189ac2'
properties.SPOTIFY_SCOPE_USER_DATA = 'user-read-recently-played user-library-read playlist-read-private'
properties.SPOTIFY_API_URL = 'https://accounts.spotify.com/authorize'
properties.SPOTIFY_LOGOUT_URL = 'https://www.spotify.com/logout/'

//Spotify API Endpoints URLs to get data
properties.SPOTIFY_ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/artists/?'
properties.SPOTIFY_LIKED_SONGS_ENDPOINT = 'https://api.spotify.com/v1/me/tracks?limit=1'
properties.SPOTIFY_LIKED_SONGS_ENDPOINT_INCREMENTAL = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=50'

//Make id unique
properties.ID_UNIQUE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'