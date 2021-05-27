let Typer = {
  text: "",
  index: 0,
  speed: 3,
  file: "hhaydar.txt",
  init: function () {
    $.get(Typer.file, function (data) {
      Typer.text = data
      Typer.text = Typer.text.slice(0, Typer.text.length - 1)
    });
  },
  addText: function () {
    Typer.index += Typer.speed
    let text = Typer.text.substring(0, Typer.index)
    let rtn = new RegExp("\n", "g")
    $("#console").html(text.replace(rtn, "<br/>"))
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