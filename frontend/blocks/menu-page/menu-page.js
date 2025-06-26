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

                    <arrow-page>
                        <h1 slot="title" class="menu-layout__title">
                            MAKI             
                        </h1>
                    </arrow-page>
                    <div class="menu-layout__table" id="product-component"> 
                        <div class="menu-layout__image">
                            <button class="add-button" aria-label="Agregar al carrito" id="agregar">
                                <svg class="add-icon" viewBox="0 0 24 24">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                                </svg>
                            </button>                              
                        </div>

                        <div class="menu-layout__info">
                            <h2 class="menu-layout__title2"> Title Product </h2>
                            <div class="menu-layout__description">texto de descripcion afsodjifb dfdfd fd fdsf ds f s fknadg ha hb hb bhb bhb hgftbct c   fvghnhjfdfd </div>
                        </div>
                        <div class="menu-layout__price">
                            <span class="price-value">$5</span>
                        </div>
                    </div>
                    <div class="menu-layout__table" id="product-component">  
                        <div class="menu-layout__image"></div>

                        <div class="menu-layout__info">
                            <h2 class="menu-layout__title2"> Title Product </h2>
                            <div class="menu-layout__description">texto de descripcion afsodjifb </div>
                        </div>
                            <div class="menu-layout__price">
                                5$
                            </div>
                    </div>

                    <arrow-page>
                        <h1 slot="title" class="menu-layout__title">
                            URAMAKI             
                        </h1>
                    </arrow-page>
                    <div class="menu-layout__table" id="product-component"> 
                        <div class="menu-layout__image"></div>

                        <div class="menu-layout__info">
                            <h2 class="menu-layout__title2"> Title Product </h2>
                            <div class="menu-layout__description">texto de descripcion afsodjifb </div>
                        </div>
                            <div class="menu-layout__price">
                                5$
                            </div>
                    </div>

                    <arrow-page>
                        <h1 slot="title" class="menu-layout__title">
                            SPECIAL ROLLS            
                        </h1>
                    </arrow-page>         
                    <div class="menu-layout__table" id="product-component"> 
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
        <footer-principal></footer-principal>    
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

        const productBtn = this.shadowRoot.getElementById("product-component");

        productBtn.addEventListener("click", (event) => {
            if (event.target.closest(".add-button")) {
                return;
            }
            const menuLayout = productBtn.closest(".menu-layout");
            const fondo = menuLayout.querySelector(".menu-layout__fondo");
            const name = menuLayout.querySelector(".menu-layout__name");
            
            fondo.style.backgroundImage = `
                linear-gradient(
                    to bottom,
                    rgba(0, 0, 0, 0.0) 0%,
                    rgba(0, 0, 0, 0.0) 50%,
                    rgba(0, 0, 0, 0.0) 100%
                ), url('/frontend/assets/images/detail-item.jpg')
            `;           
            
            
            name.textContent = "SPICY TUNA MAKI";
        })

  }  
}

customElements.define("menu-page", MenuPage);