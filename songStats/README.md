# songsStats
Personal fun project - working with Spotify data

# DONE Stats 
1. Track list showing "genre list"

# Library

1. Bootstrap
2. Data Analysis 
    <https://danfo.jsdata.org/>
    Danfo.js is heavily inspired by the Pandas library and provides a similar interface and API. This means users familiar with the Pandas API can easily use Danfo.js.
    API reference <https://danfo.jsdata.org/api-reference>

    Example report:
    <https://hhaydar.github.io/songStats/example-report/Spotify-dataanalysis.pdf>

# Feature Engineering
1. Date : extract--> Day/Night, Hour without minutes, Year, Month, long-day
2. Duration : round to -> Minute without seconds
3. Genres : empty -> 'undefined'
4. Genres : new feature 'genre' only one from genres list (use shortest name genre)
5. Country
# TODO - Stats
1. First and latest song added to liked songs playlist 
2. Longest and shortest song
3. Popularity average
4. Bar/Stacked Chart -> Songs by : added date/time, artist, genre, popularity, 
country, explicit-content, year, H24 time added, AM/PM, Album release year
5. Genre map explorer
6. AM/PM which part of the day you usally add more songs to your liked playlist