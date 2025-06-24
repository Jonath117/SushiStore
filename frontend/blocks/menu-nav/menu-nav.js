const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="./blocks/style.css">
  <div class="overlay" id="overlay">
    <span class="close-btn" id="close">&times;</span>
    <a href="#" class="menu-nav__item" id="menu-button">Menu</a>
    <a href="#" class="menu-nav__item" id="reserv-button">Reservation</a>
    <a href="#" class="menu-nav__item" id="ab-button">About</a>
    <a href="#" class="menu-nav__item" id="contact-button">Contact</a>
    <a href="#" class="menu-nav__item" id="blog-button">Blog</a>
  </div>
`;

class MenuNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.getElementById("close").addEventListener("click", () => {
      this.close();
      console.log("menu cerrado");
    });

    const menuBtn = this.shadowRoot.getElementById("menu-button");
    const reservBtn = this.shadowRoot.getElementById("reserv-button");
    const aboutBtn = this.shadowRoot.getElementById("ab-button");
    const contactBtn = this.shadowRoot.getElementById("contact-button");
    const blogBtn = this.shadowRoot.getElementById("blog-button");

    const navigate = (route) => {
      window.dispatchEvent(new CustomEvent("navigate", { detail: route }));
    };

    menuBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      navigate("menu");
      this.shadowRoot.getElementById("overlay").classList.remove("active");
    });

    reservBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      navigate("reservation");
      this.shadowRoot.getElementById("overlay").classList.remove("active");
    });

    aboutBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      navigate("about");
      this.shadowRoot.getElementById("overlay").classList.remove("active");
    });

    contactBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      navigate("contact");
      this.shadowRoot.getElementById("overlay").classList.remove("active");
    });

    blogBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      navigate("blog");
      this.shadowRoot.getElementById("overlay").classList.remove("active");
    });

    }  

  open() {
    this.shadowRoot.getElementById("overlay").classList.add("active");
  }

  close() {
    this.shadowRoot.getElementById("overlay").classList.remove("active");
  }
}

customElements.define('menu-nav', MenuNav);
