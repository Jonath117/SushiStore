const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="./blocks/side-bar/side-bar.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <div class="side-bar-container">
    <div class="side-bar-principal">
      <div class="side-bar__menu">
        <div class="side-bar-button__container">
          <button class="side-bar__button" id="menu-button">
             MENU <span class="side-bar__icon">→</span>
          </button>
        </div>
      </div>
      <div class="side-bar__reserv">
        <div class="side-bar-button__container">
          <button class="side-bar__button" id="reserv-button">
            RESERVATION <span class="side-bar__icon">→</span>
          </button>
        </div>
      </div>
      <div class="side-bar__about">
        <div class="side-bar-button__container">
          <button class="side-bar__button" id="ab-button">
            OUR RESTAURANT <span class="side-bar__icon">→</span>
          </button>
        </div>
      </div>
    </div>

    </div>
  <div class="home-layout__name">SUSHI SENSATION</div>
`;

class SideBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
  }

connectedCallback() {
  document.documentElement.style.setProperty("--dynamic-background", "url(../assets/images/fondoP.jpg)");

  const menuBtn = this.shadowRoot.getElementById("menu-button");
  const reservBtn = this.shadowRoot.getElementById("reserv-button");
  const aboutBtn = this.shadowRoot.getElementById("ab-button");
  const contactBtn = this.shadowRoot.getElementById("contact-button");

    const navigate = (route) => {
      window.dispatchEvent(new CustomEvent("navigate", { detail: route }));
    };

  menuBtn?.addEventListener("click", () => navigate("menu"));
  reservBtn?.addEventListener("click", () => navigate("reservation"));
  aboutBtn?.addEventListener("click", () => navigate("about"));
  contactBtn?.addEventListener("click", () => navigate("contact"));
  }
}
customElements.define('side-bar', SideBar);
