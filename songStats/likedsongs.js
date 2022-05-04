function init() {
    getParamsFromURL("likedsongs.html")
    loadRequest(properties.SPOTIFY_LIKED_SONGS_ENDPOINT, function(req, identifier) {
        if (req.status != 401) {
            var response = JSON.parse(req.responseText)
            displayPlaylistInfo("Liked Songs", response["total"])
            displayData(response["total"])
        }}, 1)
}

function loadingTemplate(message) {
    return '<i class="fa fa-spinner fa-spin fa-fw fa-2x"></i><br><div id="loadingmessage">Getting your songs.</div>'
}

function displayPlaylistInfo(playlist_name, playlist_songs) {
    $("#playlist_name").html(playlist_name)
    $("#number-of-songs").html(playlist_songs)
}

function displayData(playlist_songs) {
    var $table = $('#table')
    var data = []
    var j = 50

    $table.bootstrapTable('showLoading')

    function getData(url, increment) {
        $("#loadingmessage")[0].innerHTML = "API call: getting " + j + " of " + playlist_songs + " songs"
        if (url != null) {
            loadRequest(url, function(res, identifier) {
                response = JSON.parse(res.responseText)
                id_list = []
                response.items.forEach(element => id_list.push(element.track.artists[0].id))
                loadRequest(properties.SPOTIFY_ARTISTS_ENDPOINT + jQuery.param({ "ids": id_list.join() }), function(feat_res) {
                    features = JSON.parse(feat_res.responseText)
                    for (i in response["items"]) {
                        response["items"][i]["track"]["genres"] = { ...features["artists"][i]["genres"] }
                        data.push(response["items"][i])
                        }
                    j = j + increment
                    properties.ENV == 'dev' ? getData(null, increment) : getData(response["next"], increment)
                }, 1)
            }, 1)
        } else {
            formatted_data = doFeatureEngineering(data)
            $table.bootstrapTable('load', formatted_data)
            $table.bootstrapTable('hideLoading')

            //Plot: Liked songs added by year
                let plot_data = {
                    Year: formatted_data.map(x => x.added_year_at)
                }
                let layout = {
                    title: "Liked songs added by year",
                    xaxis: {
                      title: "Added year"
                    },
                    yaxis: {
                      title: "Count"
                    }
                  }
                let config = {
                    columns: ["Year_count"]
                }
                let df = new dfd.DataFrame(plot_data)
                df.groupby(["Year"])
                    .col(["Year"])
                    .count()
                    .setIndex({ column: "Year" })
                    .plot("plot_div")
                    .line({ config, layout })

            //Plot: Genre distribution
            plot_data = {
                Genre: formatted_data.map(x => x.track.genre)
            }
            const headerStyle = {
                align: "center",
                fill: { color: ["gray"] },
                font: { family: "Roboto", size: 15, color: "white" },
                columnwidth: 200
              }
            const cellStyle = {
                align: ["center"],
                line: { color: "gray", width: 1 }
              }

            layout = {
                title: "Genre distribution"
              }
            config = {
                tableHeaderStyle: headerStyle,
                tableCellStyle: cellStyle
            }
            df = new dfd.DataFrame(plot_data)
            df = df.groupby(["Genre"])
                .col(["Genre"])
                .count()
                .sortValues("Genre_count", { ascending: false})
                
            df.plot("plot_div2")
                .table({ config, layout })
                
        }
    }
    getData(properties.SPOTIFY_LIKED_SONGS_ENDPOINT_INCREMENTAL, j)
}

function doFeatureEngineering(data) {
    for (song of data) {
        var date_options = {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            hour12: true,
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }

        song["added_at_non_conversion"] = song["added_at"]
        song["added_year_at"] = convertDate(song["added_at"]).toLocaleString('en-US', {year: 'numeric'})
        song["added_time_at"] = convertDate(song["added_at"]).toLocaleString('en-US', {hour: '2-digit', minute:'2-digit'})
        song["added_h24_at"] = convertDate(song["added_at"]).toLocaleString('en-US', {hour12: false, hour: '2-digit'})
        song["am_pm_at"] = song["added_h24_at"] > 12 ? "PM" : "AM"
        song["added_at"] = convertDate(song["added_at"]).toLocaleString('en-US', date_options)
        song = song["track"]
        song["duration_ms_non_conversion"] = song["duration_ms"]
        song["duration_ms"] = convertMS(song["duration_ms"])
        song["genre_list"] = Object.values(song["genres"]).join(", ")
        song["explicit"] = song["explicit"] ? "Yes" : "No"
        song["album_name"] = song["album"]["name"]
        song["relase_date"] = song["album"]["release_date"].substring(0,4)
        song["total_tracks"] = song["album"]["total_tracks"]
        song["genre"] = song["genre_list"].replace(/\s/g, '').length < 3 ? 'undefined' : getShortGenre(song["genre_list"].split(", "))

    }
    return data;
}
