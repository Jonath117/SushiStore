const Router = {
  routes: {
    home: "home",
    menu: "menu-page",
    reservation: "reservation-page",
    about: "about-page",
    contact: "contact-page",
    blog: "blog-page",
    registration: "registration-page",
    login: "login-page",
    carrito: "cart-page",
    blog_single: "blog-single"
  },

  init() {
    window.addEventListener("navigate", (e) => {
      const route = e.detail;
      this.navigate(route);
    });

    window.addEventListener("hashchange", () => {
      const route = location.hash.slice(1);
      this.navigate(route);
    });

 
    const initialRoute = location.hash.slice(1);
    if (initialRoute && this.routes[initialRoute]) {
      this.navigate(initialRoute);
    }
  },

  navigate(route) {
    const tagName = this.routes[route];
    const root = document.getElementById("main-container");

    if (route === "home") {
      renderInitialHome();
      location.hash = "";
      return;
    }


    if (tagName && root) {
      root.innerHTML = ""; 
      const page = document.createElement(tagName);
      page.classList.add("fade-in");
      root.appendChild(page);
    }

    location.hash = route;

    
  },
};

export function renderInitialHome() {
  const root = document.getElementById("main-container");
  if (!root) return;

  root.innerHTML = "";
  
  const sidebar = document.createElement("side-bar");
  const header = document.createElement("header-bar");
  const footer = document.createElement("footer-element");

    // Aplica la clase de animación a cada componente
  sidebar.classList.add('fade-in');
  header.classList.add('fade-in');
  footer.classList.add('fade-in');
  
  // Opcional: Retraso escalonado para cada elemento
  header.style.animationDelay = '0.1s';
  sidebar.style.animationDelay = '0.2s';
  footer.style.animationDelay = '0.3s';

  root.appendChild(sidebar);
  root.appendChild(header);
  root.appendChild(footer);
  
}


export default Router;
