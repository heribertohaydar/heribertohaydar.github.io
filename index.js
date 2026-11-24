
let Typer = {
  text: "",
  index: 0,
  speed: 3,
  file: "<span id=\"a\">heriberto<\/span>:<span id=\"b\">~\/about-me<\/span><span id=\"c\"> $ <\/span> cd profile\/now\r\n<span id=\"a\">heriberto<\/span>:<span id=\"b\">~\/about-me<\/span><span id=\"c\"> $ <\/span> cat resume.json<br\/><br\/>\r\n<h2>Technology &amp; Business Transformation Executive | AI Strategy &amp; Adoption<\/h2>\r\n<p>I help organizations turn technology into business advantage. With 30 years of experience in technology and 20 years leading teams and complex technology environments, I bring a perspective that connects engineering, business strategy, and organizational leadership. I have worked across the technology landscape, from building enterprise systems to leading teams and delivering business-critical solutions across banking, consulting, construction, and technology services. I understand what technology can do, where its limitations are, and, most importantly, where it creates real business value.<\/p>\r\n<h3>Where I Create Value<\/h3>\r\n<ul>\r\n<li><strong>AI Strategy &amp; Business Adoption:<\/strong> Identifying high-value opportunities, separating real business potential from hype, and translating AI capabilities into practical applications and measurable outcomes.<\/li>\r\n<li><strong>Technology Strategy &amp; Modernization:<\/strong> Connecting architecture, technology investments, and innovation with long-term business objectives.<\/li>\r\n<li><strong>Business &amp; Operating Model Transformation:<\/strong> Rethinking processes, decision-making, and organizational capabilities to create more effective ways of working.<\/li>\r\n<li><strong>Product &amp; Operational Excellence:<\/strong> Aligning business priorities, product direction, technology execution, efficiency, and cost optimization.<\/li>\r\n<li><strong>Technology &amp; People Leadership:<\/strong> Building high-performing teams, developing talent, aligning stakeholders, and leading change across complex organizations.<\/li>\r\n<\/ul>\r\n<h3>My Point of View<\/h3>\r\n<p>The next generation of business transformation will not be defined by how many technologies organizations adopt, but by how effectively they rethink the way they operate. AI is an opportunity to challenge established processes, rethink work, improve decisions, and amplify human capabilities. The important question is not simply what AI can do, but what organizations should stop doing, start doing, and fundamentally do differently because of it.<\/p>\r\n<h3>From Strategy to Execution<\/h3>\r\n<p>My background combines software engineering, enterprise architecture, data-intensive platforms, cloud ecosystems, product management, business analysis, project leadership, and technology management. This technical foundation allows me to evaluate opportunities beyond presentations and concepts, challenge assumptions, understand architectural implications, and connect strategic decisions with practical execution.<\/p>\r\n<h3>Still Building, Always Learning<\/h3>\r\n<p>I remain hands-on through independent projects and experiments involving AI, APIs, data, and emerging technologies. I believe technology leaders should maintain curiosity, challenge their own assumptions, and understand the tools and capabilities shaping the future. <a href=\"https:\/\/github.com\/hhaydar?tab=repositories\">Explore my GitHub repositories<\/a>.<\/p>\r\n<h3>Let's Connect<\/h3>\r\n<p>I am interested in connecting with organizations and leaders facing meaningful technology and business challenges, particularly those looking to translate AI opportunities into business transformation, modernize operations, and build capabilities for the future.<\/p>\r\n<p><a href=\"mailto:heriberto.haydar@gmail.com\">Get in touch<\/a> or connect with me on <a href=\"https:\/\/co.linkedin.com\/in\/hhaydar\">LinkedIn<\/a>.<\/p>\r\n",
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