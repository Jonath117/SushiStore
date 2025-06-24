const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="./blocks/cart/cart.css">

<div class="cart">
    <div class="cart-fondo">
        <header-bar></header-bar>
        <div class="cart-fondo__name">CART</div>
    </div>

    <div class="cart-contenido">
        <div class="cart-contenido__container">
            <h1 class="cart-container__title"><-- MY CART --></h1>
            <div class="footer">
                <h2 class="footer-text">Licensing Styleguide </h2>
            </div>                  
            
        </div>        
    </div>

</div>
`;

class CartPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
  }
    connectedCallback() {
        document.documentElement.style.setProperty("--dynamic-background", "black");  
  }  
}

customElements.define("cart-page", CartPage);
