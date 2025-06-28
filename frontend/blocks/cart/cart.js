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
        <arrow-page>
            <h1 slot="title" class="cart-container__title">MY CART</h1>
        </arrow-page>
            <div class="cart-templates-hidden" style="display: none;">
            
                <div class="cart-layout__table product-cart-template">
                    <img class="cart-layout__image" src="" alt="Product Image"> 
                    
                    <div class="cart-layout__info">
                        <div class="name-container">
                            <div class="name-group">
                                <h2 class="name-container__nameP">Name Product</h2>
                                <img src="./assets/pngs/leaf.png" class="name-container__vegan" alt="Icono vegano" style="display: none;">
                            </div>
                            <div class="name-container__price">
                                <span class="price-value">$5 x 10 = $50</span>
                            </div>
                        </div>
                        <div class="cart-layout__description">texto de descripcion</div>
                    </div>
                    <div class="cart-item-controls">
                        <span class="cart-item__quantity-display">1</span> 
                        <button class="cart-item__remove-btn">
                            <svg class="remove-icon" viewBox="0 0 24 24">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div class="cart-items-display-area">
            </div>

            <div class="total-container">
                <h2 class="total-container__title">Total</h2>
                <div class="total-container__price">
                    <span class="total-price__value">$75</span>
                </div>
            </div>

            <div class="container-button">
                <button class="order-button" id="order">PLACE ORDER</button>
            </div>
        </div>
        <footer-principal></footer-principal>
    </div>
</div>
`;

class CartPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
        this.cartItems = [];

        this.cartDisplayArea = this.shadowRoot.querySelector(".cart-items-display-area");
        this.productCartTemplate = this.shadowRoot.querySelector(".product-cart-template");
        this.totalPriceValue = this.shadowRoot.querySelector(".total-price__value");
        this.orderButton = this.shadowRoot.getElementById("order");
    }

    connectedCallback() {
        document.documentElement.style.setProperty("--dynamic-background", "black");

        this.loadCart();
        this.renderCart();

        window.addEventListener('cart-updated', this.handleCartUpdate);
        this.orderButton.addEventListener("click", this.placeOrder);

        this.cartDisplayArea.addEventListener('click', this.handleItemAction);
    }

    disconnectedCallback() {
        window.removeEventListener('cart-updated', this.handleCartUpdate);
        this.orderButton.removeEventListener("click", this.placeOrder);
        this.cartDisplayArea.removeEventListener('click', this.handleItemAction);
    }

    handleCartUpdate = (event) => {
        if (event.detail) {
            this.cartItems = event.detail;
        } else {
            this.loadCart();
        }
        this.renderCart();
    }

    loadCart() {
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            this.cartItems = cart.map(item => ({
                ...item,
                price: parseFloat(item.price)
            }));
        } catch (e) {
            console.error("Error loading cart from localStorage:", e);
            this.cartItems = [];
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        window.dispatchEvent(new CustomEvent('cart-updated', {
            detail: this.cartItems
        }));
    }

    renderCart() {
        this.cartDisplayArea.innerHTML = '';

        if (this.cartItems.length === 0) {
            
            this.updateCartTotal();
            return;
        } else {
            const emptyMessage = this.cartDisplayArea.querySelector('.empty-cart-message');
            if (emptyMessage) emptyMessage.remove();
        }

        this.cartItems.forEach(item => {
            const clone = this.productCartTemplate.cloneNode(true);
            clone.style.display = 'flex';
            clone.dataset.productId = item.id;

            clone.querySelector(".cart-layout__image").src = item.image;
            clone.querySelector(".cart-layout__image").alt = item.name;

            clone.querySelector(".name-container__nameP").textContent = item.name;

            const veganIcon = clone.querySelector(".name-container__vegan");
            if (item.vegetarian) {
                veganIcon.style.display = "inline-block";
            } else {
                veganIcon.style.display = "none";
            }

            const itemTotalPrice = item.price * item.quantity;
            clone.querySelector(".price-value").textContent = `${item.price.toFixed(2)} x ${item.quantity} = $${itemTotalPrice.toFixed(2)}`;

            clone.querySelector(".cart-layout__description").textContent = item.description;

            clone.querySelector(".cart-item__quantity-display").textContent = item.quantity;

            this.cartDisplayArea.appendChild(clone);
        });

        this.updateCartTotal();
    }

    updateCartTotal() {
        const total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.totalPriceValue.textContent = `$${total.toFixed(2)}`;
    }

    handleItemAction = (event) => {
        const target = event.target;
        const cartItemElement = target.closest('.cart-layout__table');
        if (!cartItemElement) return;

        const productId = cartItemElement.dataset.productId;
        const productIndex = this.cartItems.findIndex(item => item.id == productId);

        if (productIndex === -1) return;

        let shouldRender = false;

        if (target.closest('.cart-item__remove-btn')) {
            this.cartItems.splice(productIndex, 1);
            shouldRender = true;
        }

        if (shouldRender) {
            this.saveCart();
            this.renderCart();
        }
    }

    placeOrder = () => {
        if (this.cartItems.length === 0) {
            alert("Tu carrito esta vacio, agrega algun producto por favor.");
            return;
        }
        console.log("Orden enviada:", this.cartItems);
        alert("Pedido realizado correctamente!");
        
        this.cartItems = [];
        this.saveCart();
        this.renderCart();
    }
}

customElements.define("cart-page", CartPage);