const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="./blocks/blog-single/blog-single.css">

<div class="blog-layout">
    <div class="blog-layout__fondo">
        <header-bar></header-bar>
    </div>

    <div class="blog-layout__contenido">
        
        <div class="blog-footer">
            <h2 class="blog-footer__text">Licensing Styleguide </h2>
        </div>        
        
    </div>

</div>
`;

class BlogSinglePage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
  }
    connectedCallback() {
        document.documentElement.style.setProperty("--dynamic-background", "black");
  }  
}

customElements.define("blog-single", BlogSinglePage);
