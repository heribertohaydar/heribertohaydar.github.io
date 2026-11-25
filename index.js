
let Typer = {
  text: "",
  index: 0,
  speed: 3,
  file: "<span id=\"a\">heriberto</span>:<span id=\"b\">~/about-me</span><span id=\"c\"> $ </span> cd profile/now\r\n<span id=\"a\">heriberto</span>:<span id=\"b\">~/about-me</span><span id=\"c\"> $ </span> cat resume.json<br/><br/>\r\n<h2>Technology Leader | Software Architecture | AI Engineering</h2>\r\n<p>Technology professional with 30 years of experience across software engineering, enterprise architecture, data platforms, and technology leadership. Background in building software solutions, evolving enterprise systems, and leading engineering initiatives across banking, consulting, construction, and technology services.</p>\r\n<p>Focused on the evolution of software engineering, where AI, intelligent systems, and automation are reshaping how technology is designed, developed, and operated. Combines engineering experience, architectural judgment, and business understanding to evaluate emerging capabilities and turn them into practical, reliable solutions.</p>\r\n<h3>Areas of Expertise</h3>\r\n<ul>\r\n<li><strong>AI & Intelligent Systems:</strong> AI-enabled applications, LLM integration, agentic systems, and intelligent automation.</li>\r\n<li><strong>Software Engineering & Architecture:</strong> Modern application design, distributed systems, APIs, enterprise integration, and AI-assisted software development.</li>\r\n<li><strong>Data & Cloud Platforms:</strong> Data engineering, event-driven architectures, cloud platforms, and scalable systems.</li>\r\n<li><strong>Technical Leadership:</strong> Architecture decisions, engineering direction, technology evaluation, and complex problem solving.</li>\r\n</ul>\r\n<h3>Building & Exploring</h3>\r\n<p>Continuously building independent projects and exploring the practical application of AI, software engineering, APIs, data, and emerging technologies.</p>\r\n<p><a href=\"https://github.com/hhaydar?tab=repositories\">Explore my GitHub repositories</a>.</p>\r\n<h3>Connect</h3>\r\n<p>Interested in challenging engineering problems, AI-enabled products, and opportunities to contribute to the evolution of technology.</p>\r\n<p><a href=\"mailto:heriberto.haydar@gmail.com\">Get in touch</a> or connect with me on <a href=\"https://co.linkedin.com/in/hhaydar\">LinkedIn</a>.</p>\r\n",
  init: function () {
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