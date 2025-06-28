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
            <div style="display: none;">
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
                            <div class="title-container">
                                <div class="title-group">
                                    <h2 class="title-container__title2">Title Product</h2>
                                    <img src="./assets/pngs/leaf.png" class="title-container__vegan" alt="Icono vegano">
                                </div>
                                <div class="title-container__price">                            
                                    <span class="price-value">$5</span>
                                </div>
                            </div>
                            <div class="menu-layout__description">texto de descripcion</div>
                        </div>
                    </div> 
            </div>    

        <footer-principal> </footer-principal>    
    </div>   
</div>
`;

class MenuPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
  }
  
    async  connectedCallback() {
        document.documentElement.style.setProperty("--dynamic-background", "black");

        await this.renderProductsByCategory(1, "MAKI");
        await this.renderProductsByCategory(2, "URAMAKI");
        await this.renderProductsByCategory(3, "SPECIAL ROLLS");              
    }  
    async renderProductsByCategory(category_Id, category_Name){
        try {
            const res = await fetch(`http://localhost:3000/api/products/category/${category_Id}`);
            const products =  await res.json();

            const container = document.createElement("div");
            const title = document.createElement("arrow-page");

            title.innerHTML = `<h1 slot="title" class="menu-layout__title">${category_Name}</h1>`;
            container.appendChild(title);

            const template = this.shadowRoot.getElementById("product-component");

            products.forEach(product => {
                const clone = template.cloneNode(true);
                clone.style.display = "flex";

                clone.querySelector(".title-container__title2").textContent = product.name;
                clone.querySelector(".price-value").textContent = `$${product.price}`;
                clone.querySelector(".menu-layout__description").textContent = product.description;

                const img = document.createElement("img");
                img.src = product.image;
                img.alt = product.name;
                img.style.width = "150px";
                clone.querySelector(".menu-layout__image").prepend(img);

                clone.dataset.productName = product.name;
                clone.dataset.productImage = product.image;


                clone.addEventListener("click", (event) => {
                    const clickedProduct = event.target.closest(".menu-layout__table");
                    if (event.target.closest(".add-button")) {
                        return;
                    }

                    const productName = clickedProduct.dataset.productName;
                    const productImage = clickedProduct.dataset.productImage;

                    const fondo = this.shadowRoot.querySelector(".menu-layout__fondo");
                    const name = this.shadowRoot.querySelector(".menu-layout__name");            
                    
                    fondo.style.backgroundImage = `
                        linear-gradient(
                            to bottom,
                            rgba(0, 0, 0, 0.0) 0%,
                            rgba(0, 0, 0, 0.0) 50%,
                            rgba(0, 0, 0, 0.0) 100%
                        ), url(${productImage})
                    `;           
                    name.textContent = productName;
                });  

                container.appendChild(clone);
            });

            this.shadowRoot.querySelector(".menu-layout__contenido").appendChild(container);

        } catch (err) {
            console.error("error al traer los productos: ", err);
        }
    }

}   

customElements.define("menu-page", MenuPage);