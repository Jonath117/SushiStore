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
    if (initialRoute) {
      this.navigate(initialRoute);
    } else {
      this.navigate("home"); 
    }
  },

  navigate(route) {
    const root = document.getElementById("main-container");
    if (!root) {
      console.error("No se encontró el elemento #main-container");
      return;
    }

    root.innerHTML = "";

    let tagName = null;
    let dynamicId = null;
    let isEditMode = false;

    if (route.startsWith('blog_single_')) {
      const parts = route.split('_');
      if (parts.length >= 3) {
        dynamicId = parseInt(parts[2]);
        isEditMode = parts[3] === 'edit'; 
        
        tagName = "blog-single"; 
        location.hash = route; 
        
        const page = document.createElement(tagName);
        page.classList.add("fade-in");
        root.appendChild(page);
        return;
      }
    }


    if (route === "home") {
      renderInitialHome();
      return;
    }

    tagName = this.routes[route];

    if (tagName) {
      const page = document.createElement(tagName);
      page.classList.add("fade-in");
      root.appendChild(page);
      location.hash = route; 
    } else {
      root.innerHTML = '<h1>Página no encontrada</h1><p>La URL que intentas acceder no existe.</p>';
      console.warn(`Ruta no reconocida: ${route}`);
    }
  },
};

export function renderInitialHome() {
  const root = document.getElementById("main-container");
  if (!root) return;

  root.innerHTML = "";

  const sidebar = document.createElement("side-bar");
  const header = document.createElement("header-bar");
  const footer = document.createElement("footer-element");

  sidebar.classList.add('fade-in');
  header.classList.add('fade-in');
  footer.classList.add('fade-in');

  header.style.animationDelay = '0.1s';
  sidebar.style.animationDelay = '0.2s';
  footer.style.animationDelay = '0.3s';

  root.appendChild(sidebar);
  root.appendChild(header);
  root.appendChild(footer);

}

export default Router;