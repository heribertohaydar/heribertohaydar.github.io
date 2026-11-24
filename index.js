
let Typer = {
  text: "",
  index: 0,
  speed: 3,
  file: "<span id=\"a\">heriberto<\/span>:<span id=\"b\">~\/about-me<\/span><span id=\"c\"> $ <\/span> cd profile\/now\r\n<span id=\"a\">heriberto<\/span>:<span id=\"b\">~\/about-me<\/span><span id=\"c\"> $ <\/span> cat resume.json<br\/><br\/>\r\n<h2>Technology Leader | AI Strategy &amp; Adoption | Digital Transformation<\/h2>\r\n<p>With 30 years of experience in technology and 20 years leading teams, I bring together technical expertise, strategic thinking, and business understanding to solve complex problems and deliver technology solutions that create value. My career spans banking, consulting, construction, and technology services, evolving from software engineering and enterprise application development to business analysis, project and product management, PMO, consulting, and technology leadership.<\/p>\r\n<p>I have worked across different layers of technology and business, giving me the ability to understand both the technical implications of a decision and its impact on the organization. I believe technology is not the objective. Business value is.<\/p>\r\n<h3>Current Focus<\/h3>\r\n<p>My current focus is on AI adoption and business transformation: understanding where emerging technologies can make a real difference, identifying practical opportunities, and helping organizations move from experimentation to meaningful application.<\/p>\r\n<ul>\r\n<li><strong>AI Strategy &amp; Adoption:<\/strong> Identifying business opportunities for AI, evaluating practical use cases, and exploring how intelligent automation can improve processes and decision-making.<\/li>\r\n<li><strong>Technology Strategy &amp; Modernization:<\/strong> Aligning technology architecture, platforms, and investments with business needs and long-term objectives.<\/li>\r\n<li><strong>Digital &amp; Business Transformation:<\/strong> Improving processes, rethinking ways of working, and using technology to increase organizational effectiveness.<\/li>\r\n<li><strong>Product &amp; Delivery Leadership:<\/strong> Connecting business priorities with product direction, engineering capabilities, and successful execution.<\/li>\r\n<li><strong>Team &amp; Organizational Leadership:<\/strong> Building capable teams, developing talent, managing stakeholders, and leading cross-functional initiatives.<\/li>\r\n</ul>\r\n<h3>Technical Foundation<\/h3>\r\n<p>My background includes software engineering, enterprise applications, data-intensive platforms, distributed architectures, cloud ecosystems, enterprise architecture, and technology management. Throughout my career, I have worked with technologies including Java, Python, JavaScript, Spring, Oracle, Google Cloud, Microsoft Azure, Kafka, and modern data platforms.<\/p>\r\n<p>This technical foundation allows me to engage with engineering teams, challenge architectural decisions, evaluate emerging technologies, and translate business requirements into practical technology solutions. I value staying close enough to the technology to understand its possibilities without losing sight of the broader business context.<\/p>\r\n<h3>My Perspective on What Comes Next<\/h3>\r\n<p>AI and emerging technologies are changing how organizations operate, but adopting new tools is only part of the challenge. The real opportunity is to rethink processes, improve decisions, rethink how people work, and identify entirely new ways to create value. The important question is not simply what technology can do, but what organizations should do differently because of it.<\/p>\r\n<h3>Still Building, Always Learning<\/h3>\r\n<p>Beyond my professional work, I enjoy building independent projects and experimenting with AI, APIs, data, analytics, and emerging technologies. Staying hands-on keeps me curious, challenges my assumptions, and helps me understand how new capabilities can be applied in practice. <a href=\"https:\/\/github.com\/hhaydar?tab=repositories\">Explore my GitHub repositories<\/a>.<\/p>\r\n<h3>Let's Connect<\/h3>\r\n<p>I welcome conversations about technology leadership, AI adoption, digital transformation, and the challenges organizations face when turning technology opportunities into business value.<\/p>\r\n<p><a href=\"mailto:heriberto.haydar@gmail.com\">Get in touch<\/a> or connect with me on <a href=\"https:\/\/co.linkedin.com\/in\/hhaydar\">LinkedIn<\/a>.<\/p>\r\n",
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