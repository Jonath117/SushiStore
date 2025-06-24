const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="./blocks/blog/blog.css">

<div class="blog-layout">
    <div class="blog-layout__fondo">
        <header-bar></header-bar>
        <div class="blog-layout__name">BLOG</div>
    </div>

    <div class="blog-layout__contenido">
        <h1 class="blog-container__title">BEHIND THE SCENES</h1>
        <h1 class="blog-container__title2">& LATEST NEWS</h1>
        <div class="blog-layout__categorias">
            <button class="blog-layout__btn"> ALL NEWS </button>
            <button class="blog-layout__btn"> FAVORITIES </button>
            <button class="blog-layout__btn"> MY ARTICULES </button>
        </div>

        <div class="blog-article" id="componente-detalle">
            <div id="image-article" class="blog-article__image-wrapper">
                <img src="/frontend/assets/images/ct-4.jpg" class="blog-article__image">
                <button class="favorite-button" aria-label="Añadir a favoritos">
                    <svg class="favorite-icon" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>                
            </div>

            <div class="blog-article__description-wrapper">
                <p id="fecha-articulo" class="blog-article__date"><----- 24TH AUG 2023</p>
                <h1 class="blog-article__title" id="titulo-articulo">HOW QITCHEN REDEFINES FLAVOR HARMONY IN EVERY BITE</h1>
                <p id="description-articulo" class="blog-article__description"> Experience an orchestra of tastes as Quitchen's sushi unveils a symphony of perfectly balanced flavors</p>
                <p id="description-articulo" class="blog-article__autor">Author:{}</p>
            </div>
        </div>
        
        <div class="blog-footer">
            <h2 class="blog-footer__text">Licensing Styleguide </h2>
        </div>        
        
    </div>

</div>
`;

class BlogPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
  }
    connectedCallback() {
        document.documentElement.style.setProperty("--dynamic-background", "black");

        
        const componente = this.shadowRoot.getElementById("componente-detalle");

        const navigate = (route) => {
            window.dispatchEvent(new CustomEvent("navigate", { detail: route }));
        }; 
        
        componente?.addEventListener("click", () => navigate("blog_single"));
  }  
}

customElements.define("blog-page", BlogPage);
