const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="./blocks/menu-page/menu-page.css">
<div class="menu-layout">
    <div class="menu-layout__fondo">
        <header-bar></header-bar>
        <div class="menu-layout__name"> MENU </div>
    </div>

    <div class="menu-layout__contenido">
        <div class="menu-layout__categorias">
            <button class="menu-layout__btn"> All </button>
            <button class="menu-layout__btn"> MAKI </button>
            <button class="menu-layout__btn"> URAMAKI </button>
            <button class="menu-layout__btn"> SPECIAL ROLLS </button>
        </div>

                <h1 class="menu-layout__title"> MAKI </h1>
                <div class="menu-layout__table"> 
                    <div class="menu-layout__image"></div>

                    <div class="menu-layout__info">
                        <h2 class="menu-layout__title2"> Title Product </h2>
                        <div class="menu-layout__description">texto de descripcion afsodjifb </div>
                    </div>
                        <div class="menu-layout__price">
                            5$
                        </div>
                </div>
                <div class="menu-layout__table"> 
                    <div class="menu-layout__image"></div>

                    <div class="menu-layout__info">
                        <h2 class="menu-layout__title2"> Title Product </h2>
                        <div class="menu-layout__description">texto de descripcion afsodjifb </div>
                    </div>
                        <div class="menu-layout__price">
                            5$
                        </div>
                </div>

                <h1 class="menu-layout__title"> URAMAKI </h1>
                <div class="menu-layout__table"> 
                    <div class="menu-layout__image"></div>

                    <div class="menu-layout__info">
                        <h2 class="menu-layout__title2"> Title Product </h2>
                        <div class="menu-layout__description">texto de descripcion afsodjifb </div>
                    </div>
                        <div class="menu-layout__price">
                            5$
                        </div>
                </div>

                <h1 class="menu-layout__title"> SPECIAL ROLLS </h1>            
                <div class="menu-layout__table"> 
                    <div class="menu-layout__image"></div>

                    <div class="menu-layout__info">
                        <h2 class="menu-layout__title2"> Title Product </h2>
                        <div class="menu-layout__description">texto de descripcion afsodjifb </div>
                    </div>
                        <div class="menu-layout__price">
                            5$
                        </div>
                </div>
            </div>
            </div>
            <div class="footer">
                <h2 class="footer-text">Licensing Styleguide </h2>
            </div>            
    </div>   
</div>
`;

class MenuPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
  }
    connectedCallback() {
        document.documentElement.style.setProperty("--dynamic-background", "black");
  }  
}

customElements.define("menu-page", MenuPage);