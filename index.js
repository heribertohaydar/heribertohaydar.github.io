
let Typer = {
  text: "",
  tokens: [],
  index: 0,
  speed: 220,
  commaPause: 350,
  sentencePause: 700,
  output: "",
  console: null,

  file: `<span id="a">heriberto</span>:<span id="b">~/about-me</span><span id="c"> $ </span> cd profile/now<br/>
<span id="a">heriberto</span>:<span id="b">~/about-me</span><span id="c"> $ </span> cat resume.json<br/><br/>

<div class="engineering-signal">
  <div class="signal-track">
    <span class="signal-node"></span>
    <span class="signal-node"></span>
    <span class="signal-node"></span>
    <span class="signal-pulse"></span>
  </div>
</div>

<h2>Technology & Engineering Leader | Architecture | Applied AI</h2>

<p>Technology professional with 30 years of experience across software engineering, enterprise architecture, and data platforms. Experienced in building and evolving enterprise systems and leading engineering initiatives across multiple industries.</p>

<p>Focused on modern software architecture and practical AI integration, bringing intelligent capabilities into applications, data workflows, and existing platforms. Combining technical judgment and business understanding to address complex engineering challenges.</p>

<p><a href="mailto:heriberto.haydar@gmail.com">Email</a> | <a href="https://co.linkedin.com/in/hhaydar">LinkedIn</a></p>`,

  init: function () {
    this.console = document.querySelector("#console");

    if (!this.console) {
      console.error("Typer: #console not found");
      return;
    }

    this.injectStyles();

    this.index = 0;
    this.output = "";
    this.tokens = [];

    const fragments = this.file.match(/<[^>]*>|[^<]+/g) || [];

    fragments.forEach(fragment => {
      if (fragment.startsWith("<")) {
        this.tokens.push(fragment);
      } else {
        fragment.split(/(\s+)/).forEach(part => {
          if (part) this.tokens.push(part);
        });
      }
    });

    this.console.innerHTML = "";

    setTimeout(() => this.addText(), 500);
  },

  injectStyles: function () {
    if (document.querySelector("#engineering-styles")) return;

    const style = document.createElement("style");
    style.id = "engineering-styles";

    style.textContent = `
      #console #a { color: #00ff66; }
      #console #b { color: #ff0080; }
      #console #c { color: #00d9ff; }

      #console h2 {
        color: #f5f5f5;
        line-height: 1.35;
        margin: 32px 0 20px;
      }

      #console p {
        margin-bottom: 17px;
      }

      #console a {
        color: #f5e500;
        text-decoration: none;
      }

      #console a:hover {
        text-decoration: underline;
      }

      .engineering-signal {
        width: 230px;
        height: 30px;
        margin: 18px 0 8px;
        display: flex;
        align-items: center;
      }

      .signal-track {
        position: relative;
        width: 100%;
        height: 2px;
        background: #173c35;
      }

      .signal-node {
        position: absolute;
        top: -4px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #00cc77;
        box-shadow: 0 0 7px #00cc77;
        animation: nodePulse 2.8s infinite;
      }

      .signal-node:nth-child(1) { left: 5%; }
      .signal-node:nth-child(2) {
        left: 48%;
        animation-delay: .9s;
      }
      .signal-node:nth-child(3) {
        left: 92%;
        animation-delay: 1.8s;
      }

      .signal-pulse {
        position: absolute;
        top: -3px;
        left: 0;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #00eaff;
        box-shadow: 0 0 12px #00eaff;
        animation: dataFlow 3.5s linear infinite;
      }

      @keyframes nodePulse {
        0%, 100% { opacity: .45; }
        50% { opacity: 1; box-shadow: 0 0 12px #00ff99; }
      }

      @keyframes dataFlow {
        from { left: 0; }
        to { left: 100%; }
      }

      .typing-cursor {
        display: inline-block;
        width: 8px;
        height: 16px;
        background: #00ff88;
        margin-left: 3px;
        animation: cursorBlink 1s steps(2, start) infinite;
      }

      @keyframes cursorBlink {
        to { visibility: hidden; }
      }
    `;

    document.head.appendChild(style);
  },

  addText: function () {
    let delay = this.speed;

    while (this.index < this.tokens.length) {
      const token = this.tokens[this.index++];
      this.output += token;

      if (token.startsWith("<") || /^\s+$/.test(token)) {
        continue;
      }

      if (/[.!?]$/.test(token)) {
        delay = this.sentencePause;
      } else if (/[,;:]$/.test(token)) {
        delay = this.commaPause;
      }

      break;
    }

    this.console.innerHTML =
      this.output + '<span class="typing-cursor"></span>';

    if (this.index < this.tokens.length) {
      setTimeout(() => this.addText(), delay);
    }
  }
};

function startTyper() {
  Typer.init();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startTyper);
} else {
  startTyper();
}
