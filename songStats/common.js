function getParamsFromURL(new_url) {
    try {
        var hashParams = getHashParams()
        if (hashParams["raw_hash"] != '') {
            sessionStorage.setItem('access_token', hashParams["access_token"])
            sessionStorage.setItem('received_state', hashParams["state"])
            sessionStorage.setItem('raw_hash', hashParams["raw_hash"])
        }
        window.history.replaceState({}, document.title, "/" + new_url)
        return true
    } catch (err) {
        console.log(err.message)
        return false
    }
}

function getHashParams() {
    var hashParams = {}
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    hashParams['raw_hash'] = window.location.hash
    while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2])
    }
    return hashParams
}

function convertDate(date) {
    return  new Date(date)
}

function convertMS(ms) {
    ms = Math.floor(ms)
    var s = (ms / 1000) % 60
    s = Math.floor(s)
    var m = (ms / (1000 * 60)) % 60
    m = Math.floor(m)
    return m + "m " + s + "s"
}

function showAlert(message, type, time) {
    dismissAlert()
    alertdiv = $(".alertdiv")[0]
    alert = document.createElement("div")
    alert.innerHTML = message
    alert.classList = "alert alert-dismissible fade show"
    id = "alert" + Math.floor((Math.random() * 10000000) + 1)
    alert.id = id
    alert.classList.add(type)
    alert.setAttribute("role", "alert")
    button = document.createElement("button")
    button.type = "button"
    button.classList = "close"
    button.setAttribute("data-dismiss", "alert")
    button.setAttribute("aria-label", "Close")
    close = document.createElement("span")
    close.innerHTML = "&times;"
    close.setAttribute("aria-hidden", "true")
    button.append(close)
    alert.append(button)
    alertdiv.append(alert)
    if (time != 0) {
        window.setTimeout(function() { dismissAlert(id); }, time)
    }
}

function showErrorMessage() {
    dismissAlert()
    showAlert('<div id="error">Please login with your spotify account.  <a class="link" id="loginbutton" href="http://localhost:5500">Login here</a></div>', "alert-danger", 0)
}

function loadRequest(url, callbackFunction, identifier) {
    var xhttp
    var oauth_id = sessionStorage.getItem('access_token')
    xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (callbackFunction != null) {
                callbackFunction(this, identifier)
            }
        } else if (this.status == 401) {
            console.log("401: Access token unauthorized")
            if ($('#error').length == 0) {
                showErrorMessage()
            }
            if (callbackFunction != null) {
                callbackFunction(this, identifier)
            }
            this.abort()
        }
    };
    xhttp.ontimeout = function(e) {
        console.log("Request timed out: " + url)
    }
    xhttp.open("GET", url, true)
    xhttp.setRequestHeader("Authorization", "Bearer " + oauth_id)
    xhttp.timeout = 10000
    xhttp.send()
}

function dismissAlert(id) {
    try {
        if (id) {
            $('#' + id).alert('close');
        } else
            $('.alert').alert('close');
    } catch {
        console.log("Auth error.");
    }}

function getShortGenre(arr) {
    return arr.reduce((a, b, i, arr) => arr[i].length < b.length ? arr[i] : b, "-");
}

function timeShit(time) {
    if (time >= 6 && time < 12) {
        return "Morning"
    } else if (time >= 12 && time < 18) {
        return "Afternoon"
    } else if (time >= 18 && time < 24) {
        return "Evening"
    } else if (time >= 0 && time < 6) {
        return "Night"
    } else if (time == 24) {
        return "Night"
    }
    return "Unknown"
}

function songAgeRange(age) {
    if (age < 3) {
        return "New"
    } else if (age < 6) {
        return "Young"
    } else if (age < 10) {
        return "Middle"
    } else if (age < 18) {
        return "Old"
    } else {
        return "Eternal"
    }
}

function convertMsToMin(ms) {
    return Math.floor(ms / 1000 / 60)
}

function unifyGenre(str) {

    if (str.includes('rock')){
        str = 'rock'
    } else if (str.includes('pop')){
        str = 'pop'
    } else if (str.includes('mpb')){
        str = 'mpb'
    } else if (str.includes('hip hop')){
        str = 'hip hop'
    } else if (str.includes('country')){
        str = 'country' 
    } else if (str.includes('jazz')){
        str = 'jazz'
    } else if (str.includes('metal')){
        str = 'rock'
    } else if (str.includes('indie')){
        str = 'indie'
    } else if (str.includes('folk')){
        str = 'folk'
    } else if (str.includes('edm')){
        str = 'edm'
    } else if (str.includes('electro')){
        str = 'electronic'
    } else if (str.includes('classical')){
        str = 'classical'
    } else if (str.includes('dance ')){
        str = 'dance'
    } else if (str.includes('disco')){ 
        str = 'disco'
    } else if (str.includes(' reggae')){
        str = 'reggae'
    } else if (str.includes('soul')){
        str = 'soul'
    } else if (str.includes('salsa')){
        str = 'salsa'
    } else if (str.includes('vallenato')){
        str = 'vallenato'
    } else if (str.includes('punk')){
        str = 'punk'
    } else if (str.includes('blues')){
        str = 'blues'
    } else if (str.includes('ska')){
        str = 'ska'
    } else if (str.includes('reggaeton')){
        str = 'reggaeton'
    } else if (str.includes('cumbia')){
        str = 'cumbia'
    } else if (str.includes('house')){
        str = 'house'
    } else if (str.includes('techno')){
        str = 'techno'
    } else if (str.includes('dancehall')){
        str = 'dancehall'
    } else if (str.includes('house')){
        str = 'house'
    } else if (str.includes('reggae ')){
        str = 'reggae'
    } else if (str.includes('wave')){
        str = 'wave'
    } else if (str.includes('cuba')){
        str = 'cuba'
    } else if (str.includes('latino')){
        str = 'latino'
    } else if (str.includes('latin')){
        str = 'latin'
    } else if (str.includes('funk')){
        str = 'funk'
    } else if (str.includes('afro')){
        str = 'afro'
    } else if (str.includes(' dance')){
        str = 'dance'
    } else if (str.includes('tropical')){
        str = 'tropical'
    } else if (str.includes('trip hop')){
        str = 'hip hop'
    } else if (str.includes('samba')){
        str = 'samba'
    } else if (str.includes('r&b')){
        str = 'r&b'
    } else if (str.includes('world')){
        str = 'world'
    } else if (str.includes('reggae')){
        str = 'reggae'
    } else if (str.includes('grunge')){
        str = 'grunge'
    } else if (str.includes('traphall')){
        str = 'trap'
    } else if (str.includes('beat')) { 
        str = 'beat'
    } else if (str.endsWith(' trap')) { 
        str = 'trap'
    } else if (str.startsWith('trap ')) {
        str = 'trap'
    } else if (str.startsWith('rap ')) {
        str = 'rap'
    } else if (str.endsWith(' rap')) {
        str = 'rap'
    } else if (str.includes('velha guarda')) {
        str = 'samba'
    } else if (str.includes('musica maranhense')) {
        str = 'mpb'
    } else if (str.includes('pagode')) {
        str = 'pagode'
    } else if (str.includes('deutschrap')) {
        str = 'rap'
    } else if (str.includes('zouk')) {
        str = 'soca'
    } else if (str.includes('soukous')) {
        str = 'soca'
    } else if (str.includes('turntablism')) {
        str = 'hip hop'
    }

    return str

}
function durationRange(duration) {
    duration = (duration / (1000 * 60)) % 60
    duration = Math.floor(duration)

    if (duration < 1) {
        return "Short"
    } else if (duration < 4) {
        return "Medium"
    } else if (duration < 7) {
        return "Long"
    } else {
        return "Very Long"
    }
}

function addLoadEvent(func) {
    var oldonload = window.onload
    if (typeof window.onload != 'function') {
        window.onload = func
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload()
            }
            func()
        }
    }
}

function logout() {
    const url = properties.SPOTIFY_LOGOUT_URL                                                                                                                                                                                                                                                                              
    const spotifyLogoutWindow = window.open(url,'_blank')  
    setTimeout(function(){
        spotifyLogoutWindow.close()
        console.log("Logged out")
        window.location.href = properties.HOME_URL
        window.focus()
       }, 2000)                                                                                           
    }

function load() {
    $.get('nav.html', function(data) {
        $('body').prepend(data)
        init()
    })
}

addLoadEvent(load);