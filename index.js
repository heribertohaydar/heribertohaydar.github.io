
let Typer = {
  text: "",
  index: 0,
  speed: 3,
  file: "<span id=\"a\">heriberto<\/span>:<span id=\"b\">~\/about-me<\/span><span id=\"c\"> $ <\/span> cd profile\/now\r\n<span id=\"a\">heriberto<\/span>:<span id=\"b\">~\/about-me<\/span><span id=\"c\"> $ <\/span> cat resume.json<br\/><br\/>\r\n<h2>Technology &amp; Business Transformation Leader<\/h2>\r\n<p>Technology leader with 30 years of experience in technology and 20 years leading teams, delivering business solutions, and managing complex technology environments.<\/p>\r\n<p>I work at the intersection of technology, people, and business. My approach is grounded in a simple principle: technology is not the objective. Business value is.<\/p>\r\n<p>My current focus is helping organizations translate Artificial Intelligence (AI), emerging technologies, and digital capabilities into measurable business outcomes. I combine technical depth, strategic thinking, and leadership experience to identify the right problems, make sound investment decisions, and turn technology initiatives into sustainable business results.<\/p>\r\n<h3>Areas of Focus<\/h3>\r\n<ul>\r\n<li>AI Strategy, Adoption &amp; Business Transformation<\/li>\r\n<li>Technology Strategy &amp; Modernization<\/li>\r\n<li>Digital Transformation &amp; Operating Model Evolution<\/li>\r\n<li>Operational Excellence, Efficiency &amp; Cost Optimization<\/li>\r\n<li>Product Strategy &amp; Business Alignment<\/li>\r\n<li>AI-Enabled Processes, Automation &amp; Innovation<\/li>\r\n<li>Technology Governance, Enterprise Architecture &amp; Risk Management<\/li>\r\n<li>Organizational Change &amp; Cross-Functional Leadership<\/li>\r\n<\/ul>\r\n<h3>Professional Background<\/h3>\r\n<p>Throughout my career, I have worked across banking, construction, consulting, and technology services, taking on responsibilities spanning software development, business analysis, project and product management, PMO, consulting, and technology leadership.<\/p>\r\n<p>My technical background includes enterprise application development, data-intensive platforms, cloud ecosystems, distributed architectures, and modern data technologies. I have worked with technologies and platforms including Java, Python, JavaScript, Spring, Oracle, Google Cloud Platform, Microsoft Azure, Kafka, BigQuery, SQL Server, and Power BI.<\/p>\r\n<p>This combination of engineering experience and business leadership allows me to bridge strategic objectives with technical execution, align teams around business priorities, and deliver solutions that create lasting value.<\/p>\r\n<h3>Leadership Philosophy<\/h3>\r\n<p>The next generation of technology leadership is not about deploying more tools. It is about making better business decisions, building more effective operating models, and delivering measurable value.<\/p>\r\n<p>I believe successful transformation starts with understanding the business problem, challenging conventional approaches, and using technology as an enabler of meaningful change.<\/p>\r\n<h3>Beyond Work<\/h3>\r\n<p>I enjoy experimenting with technology, building independent projects, exploring AI applications, and continuously learning. My personal repositories include experiments and side projects developed for exploration and fun.<\/p>\r\n<p>Explore my <a href=\"https:\/\/github.com\/hhaydar?tab=repositories\">GitHub repositories<\/a>.<\/p>\r\n<p>For professional conversations and collaboration, feel free to reach me via <a href=\"mailto:heriberto.haydar@gmail.com\">Email<\/a> or connect on <a href=\"https:\/\/co.linkedin.com\/in\/hhaydar\">LinkedIn<\/a>.<\/p>\r\n<p>Building technology. Enabling transformation. Delivering business value.<\/p>\r\n",
  /*
  file: "<span id=\"a\">heriberto<\/span>:<span id=\"b\">~\/about-me<\/span><span id=\"c\"> $ <\/span> cd profile\/now\r\n<span id=\"a\">heriberto<\/span>:<span id=\"b\">~\/about-me<\/span><span id=\"c\"> $ <\/span> cat resume.json<br\/><br\/>\r\nHey There! Before start, here my code quote <span>&#128516;<\/span> \"<span id=\"kk\">while(true) code++ joy+=2 family*=n<\/span>\"\r\n<p>Father,husband & Technical development lead, 22+ years of IT experience as a developer, BA, PM, PMO, Lead as well. I like to code in {java, python, javascript} developing data-intensive applications<\/p>\r\n<p>I\'ve worked for several industries like banking, construction, consulting & development, my first dev-project was and ERP for telcos companies builded entirely in a C\/S architecture using PowerBuilder & Oracle, after that I started coding in java building enterprise web applications multi-layered, using spring framework. Part of my career I developed soft skills working as a consultant, salesman, project manager\/owner, IT Lead. Right now I\'m building a stunning dev-team for a banking using big data full-stack {stream & batch} GCP, Azure {BigTable, Data Factory, SQL Server, Kafka, PowerBI and others.} in a hybrid ecosystem, delivering new feature each two week in an agile team.\r\n<br><br><br>My <a href=\"https:\/\/github.com\/hhaydar?tab=repositories\">repo<\/a> for side and fun projects.<\/p>\r\n\r\nFeel free to send me an <a href=\"mailto:heriberto.haydar@gmail.com\">Email<\/a> or get connected on <a href=\"https:\/\/co.linkedin.com\/in\/hhaydar\">Linkedin<\/a>.\r\n\r\n<p>Cheers!<\/p>\r\n\r\n\r\n",
  */
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