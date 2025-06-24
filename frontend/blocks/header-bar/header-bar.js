const template = document.createElement("template");
template.innerHTML = `

  <link rel="stylesheet" href="./blocks/header-bar/header-bar.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

  <div class="header-container">
    <nav class="navbar-principal">
      <ul class="navbar-principal__menu">
        <div class="burger-menu">
          <input type="checkbox" id="menu-toggle" class="ocultar">
          <label for="menu-toggle" class="menu-icon">&#9776;</label>
        </div>
        <li><a class="navbar-principal__link--Name" href="#" id="home-button">QITCHEN</a></li>
        <li><a class="navbar-principal__link" href="#" id="menu-button">MENU</a></li>
        <li><a class="navbar-principal__link" href="#" id="ab-button">ABOUT</a></li>
        <li><a class="navbar-principal__link--Book" href="#" id="reserv-button">BOOK A TABLE</a></li>
      </ul>
    </nav>

    <div class="icon-bar">
      <button id="register-btn" class="icon-bar__register">Registration</button>
      
      <button id="login-btn" class="icon-bar__btn" >
        <i class="icon-bar__icon fas fa-user"></i>
      </button>

      <button id="carrito-btn" class="icon-bar__btn">
        <i class="icon-bar__icon fas fa-shopping-cart"></i>
      </button>
    </div>

    </div>
`;

class HeaderBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));

  }

  connectedCallback() {
    const burgerBtn = this.shadowRoot.querySelector(".menu-icon");
    burgerBtn.addEventListener("click", () => {
      const menu = document.querySelector("menu-nav");
      if (menu) {
        menu.open();
        console.log("menu abierto");
      }
    });

    const menuBtn = this.shadowRoot.getElementById("menu-button");
    const reservBtn = this.shadowRoot.getElementById("reserv-button");
    const aboutBtn = this.shadowRoot.getElementById("ab-button");
    const homeBtn = this.shadowRoot.getElementById("home-button");
    const registerBtn = this.shadowRoot.getElementById("register-btn");
    const loginBtn = this.shadowRoot.getElementById("login-btn");
    const carritoBtn = this.shadowRoot.getElementById("carrito-btn");

    const navigate = (route) => {
      window.dispatchEvent(new CustomEvent("navigate", { detail: route }));
    };

    menuBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      navigate("menu");
    });

    reservBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      navigate("reservation");
    });

    aboutBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      navigate("about");
    });

    registerBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      navigate("registration");
    });

    loginBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      navigate("login");
    });    

    carritoBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      navigate("carrito");
    });    


    homeBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      const currentRoute = location.hash.slice(1) || "home";
      if (currentRoute !== "home") {
        navigate("home");
      }
    });
    
    }  
}


customElements.define("header-bar", HeaderBar);
