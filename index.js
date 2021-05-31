
let Typer = {
  text: "",
  index: 0,
  speed: 3,
  file: "<span id=\"a\">heriberto<\/span>:<span id=\"b\">~\/about-me<\/span><span id=\"c\"> $ <\/span> cd profile\/now\r\n<span id=\"a\">heriberto<\/span>:<span id=\"b\">~\/about-me<\/span><span id=\"c\"> $ <\/span> cat resume.json<br\/><br\/>\r\nHey There! Before start, here my code quote <span>&#128516;<\/span> \"<span id=\"kk\">while(true) code++ joy+=2 family*=n<\/span>\"\r\n<p>Father,husband & Technical development lead, 22+ years of IT experience as a developer, BA, PM, PMO, Lead as well. I like to code in {java, python, javascript} developing data-intensive applications<\/p>\r\n<p>I\'ve worked for several industries like banking, construction, consulting & development, my first dev-project was and ERP for telcos companies builded entirely in a C\/S architecture using PowerBuilder & Oracle, after that I started coding in java building enterprise web applications multi-layered, using spring framework. Part of my career I developed soft skills working as a consultant, salesman, project manager\/owner, IT Lead. Right now I\'m building a stunning dev-team for a banking using big data full-stack {stream & batch} GCP, Azure {BigTable, Data Factory, SQL Server, Kafka, PowerBI and others.} in a hybrid ecosystem, delivering new feature each two week in an agile team.\r\n<br><br><br>My <a href=\"https:\/\/github.com\/hhaydar?tab=repositories\">repo<\/a> for side and fun projects.<\/p>\r\n\r\nFeel free to send me an <a href=\"mailto:heriberto.haydar@gmail.com\">Email<\/a> or get connected on <a href=\"https:\/\/co.linkedin.com\/in\/hhaydar\">Linkedin<\/a>.\r\n\r\n<p>Cheers!<\/p>\r\n\r\n\r\n",
  init: function () {

    /*
    Un-comment the follow coding block if you want to use hhaydar.txt file
    I put all data in Typer.file to improve loading at first time
    if file hhaydar.txt will be use, 19 and 20 line code must be deleted.
    */

    /*
    This site 
    https://www.freeformatter.com/javascript-escape.html
    allows to escape and unescape text
    */

    /*
    remember uncomment line 10 you need to include ajax
    or replace the below code with a vanilla one.
    */
    /*
    $.get(Typer.file, function (data) {
      Typer.text = data
      Typer.text = Typer.text.slice(0, Typer.text.length - 1)
    });
    */
    Typer.text = Typer.file
    Typer.text.slice(0, Typer.text.length - 1)
  },
  addText: function () {
    Typer.index += Typer.speed
    let text = Typer.text.substring(0, Typer.index)
    let rtn = new RegExp("\n", "g")
    document.querySelector("#console").innerHTML= text.replace(rtn, "<br/>");
    window.scrollBy(0, 50)
  },
};

Typer.init()

let timer = setInterval("t();", 30)

function t() {
  Typer.addText()
  if (Typer.index > Typer.text.length) {
    clearInterval(timer)
  }
}