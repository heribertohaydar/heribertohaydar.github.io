const time = document.querySelector('.dynamic-time');
const dateClass = document.querySelector('.date');
const dateStringClass = document.querySelector('.dateString');
const orange = document.querySelector('.orange');
const purple = document.querySelectorAll('.purple');

const dateStart = new Date().getTime();

function clockTick() {
    var Difference_In_Time = ((new Date().getTime() - dateStart))/60000;
    const date = new Date();
    let hours = date.getHours();
    const ampm = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    let dateString = date.toDateString().slice(4);
    dateString = dateString.slice(0, 6) + ',' + dateString.slice(6);
    //dateClass.innerHTML = `${hours}:${minutes}  <i class="ampm" style="font-size:40px; margin-left:-70px">${ampm}</i>`;
    dateClass.innerHTML = `You've been enjoying mondak ${Difference_In_Time.toFixed(0)} min.`;
    dateStringClass.innerHTML = `${dateString}`;

}
setInterval(clockTick, 1000);

if (localStorage.seen === 'true') {
    orange.style.display = "none";
    purple.forEach(item => item.style.display = "none");
}

function hideText() {
    orange.style.display = "none";
    purple.forEach(item => item.style.display = "none");
    localStorage.setItem("seen", true);
}
orange.addEventListener('click', hideText);