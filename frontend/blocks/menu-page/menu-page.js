const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="./blocks/menu-page/menu-page.css">
<div class="menu-layout">
    <div class="menu-layout__fondo">
        <header-bar></header-bar>

        <div class="menu-icons">
            <div class="left-group">
                <div class="menu-layout__name"> MENU </div>
                <div class="menu-layout__icon"></div> </div>
            <div class="menu-layout__icon2">
                <button class="add-button2" aria-label="Agregar al carrito" id="add-to-cart-top-button" style="display: none;">
                    <svg class="add-icon" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <div class="menu-layout__contenido">
        <div class="menu-layout__categorias">
            <button class="menu-layout__btn" data-category="all"> All </button>
            <button class="menu-layout__btn" data-category="MAKI"> MAKI </button>
            <button class="menu-layout__btn" data-category="URAMAKI"> URAMAKI </button>
            <button class="menu-layout__btn" data-category="SPECIAL ROLLS"> SPECIAL ROLLS </button>
        </div>
        
        <div class="product-templates-hidden" style="display: none;" id="product-item-template">
            <arrow-page>
                <h1 slot="title" class="menu-layout__title">MAKI</h1>
            </arrow-page>

            <div class="menu-layout__table product-item-template"> 
                <div class="menu-layout__image">
                    <button class="add-button" aria-label="Agregar al carrito"> <svg class="add-icon" viewBox="0 0 24 24">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                            </svg>
                    </button>
                </div>

                <div class="menu-layout__info">
                    <div class="title-container">
                        <div class="title-group">
                            <h2 class="title-container__title2">Title Product</h2>
                            <img src="./assets/pngs/leaf.png" class="title-container__vegan" alt="Icono vegano" style="display: none;">
                        </div>
                        <div class="title-container__price">
                            <span class="price-value">$5</span>
                        </div>
                    </div>
                    <div class="menu-layout__description">texto de descripcion</div>
                </div>
            </div>
        </div>
        
        <div id="products-display-area"></div> 
        <div id="scroll-sentinel" style="height: 10px; background: transparent;"></div> <footer-principal> </footer-principal>
    </div>
</div>
`;

class MenuPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
        this.allProducts = []; 
        this.displayedProducts = []; 
        this.currentProductDisplayed = null;
        this.currentIndex = 0; 
        this.batchSize = 6;
        this.loading = false;
        this.observer = null;
        this.sentinel = null;
    }

    async connectedCallback() {
        document.documentElement.style.setProperty("--dynamic-background", "black");

        this.fondoElement = this.shadowRoot.querySelector(".menu-layout__fondo");
        this.nameElement = this.shadowRoot.querySelector(".menu-layout__name");
        this.veganIconTop = this.shadowRoot.querySelector(".menu-layout__icon");
        this.addToCartTopButton = this.shadowRoot.getElementById("add-to-cart-top-button");
        this.categoryButtons = this.shadowRoot.querySelectorAll(".menu-layout__categorias .menu-layout__btn");
        this.productsDisplayArea = this.shadowRoot.getElementById("products-display-area");
        this.sentinel = this.shadowRoot.getElementById("scroll-sentinel"); 

        await this.loadAllProducts();
        
        this.displayedProducts = [...this.allProducts];
        this.currentIndex = 0;
        this.productsDisplayArea.innerHTML = "";
        
        this.setupIntersectionObserver(); 
        this.showNextBatch();

        this.resetFondoAndTitle();

        this.categoryButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const category = event.target.dataset.category || event.target.textContent.trim();
                this.filterProducts(category);
            });
        });

        this.addToCartTopButton.addEventListener("click", () => {
            if (this.currentProductDisplayed) {
                this.addToCart(this.currentProductDisplayed);
            }
        });
    }

    disconnectedCallback() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    resetFondoAndTitle() {
        this.fondoElement.style.backgroundImage = `
            linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.0) 0%,
                rgba(0, 0, 0, 0.0) 50%,
                rgba(0, 0, 0, 0.0) 100%
            ), url(./assets/images/cart.jpg)
        `;
        this.nameElement.textContent = "MENU";
        this.veganIconTop.innerHTML = "";
        this.addToCartTopButton.style.display = "none";
        this.currentProductDisplayed = null;
    }

    async loadAllProducts() {
        const categories = [
            { id: 1, name: "MAKI" },
            { id: 2, name: "URAMAKI" },
            { id: 3, name: "SPECIAL ROLLS" }
        ];

        this.allProducts = [];

        for (const cat of categories) {
            try {
                const res = await fetch(`http://localhost:3000/api/products/category/${cat.id}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const products = await res.json();
                products.forEach(p => this.allProducts.push({ ...p, category: cat.name }));
            } catch (err) {
                console.error(`Error al cargar productos de la categoría ${cat.name}: `, err);
            }
        }
    }

    setupIntersectionObserver() {
        if (this.observer) {
            this.observer.disconnect(); 
        }

        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !this.loading) {
                this.showNextBatch();
            }
        }, {
            root: this.productsDisplayArea, 
            rootMargin: "0px 0px 100px 0px",
            threshold: 0.1
        });

        if (this.sentinel) {
            this.observer.observe(this.sentinel);
        }
    }

    showNextBatch() {
        this.loading = true;

        const startIndex = this.currentIndex;
        let endIndex = this.currentIndex + this.batchSize;
        
        let batch;
        let shouldRepeat = false;

        if (startIndex >= this.displayedProducts.length) {
            this.currentIndex = 0;
            startIndex = this.currentIndex;
            endIndex = this.currentIndex + this.batchSize;
            shouldRepeat = true; 
        }

        batch = this.displayedProducts.slice(startIndex, endIndex);

        if (batch.length < this.batchSize && this.displayedProducts.length > 0) {
            const remainingNeeded = this.batchSize - batch.length;
            const repeatedPart = this.displayedProducts.slice(0, remainingNeeded);
            batch = batch.concat(repeatedPart);
            this.currentIndex = remainingNeeded;
        } else {
             this.currentIndex = endIndex;
        }


        batch.forEach(product => {
            const clone = this.shadowRoot.querySelector("#product-item-template .product-item-template").cloneNode(true);
            clone.style.display = "flex";

            clone.querySelector(".title-container__title2").textContent = product.name;
            clone.querySelector(".price-value").textContent = `$${product.price}`;
            clone.querySelector(".menu-layout__description").textContent = product.description;

            const veganIconProduct = clone.querySelector(".title-container__vegan");
            if (product.vegetarian) {
                veganIconProduct.style.display = "inline-block";
            } else {
                veganIconProduct.style.display = "none";
            }

            const img = document.createElement("img");
            img.src = product.image;
            img.alt = product.name;
            img.style.width = "150px";
            clone.querySelector(".menu-layout__image").prepend(img);

            clone.dataset.productId = product.id; 
            clone.dataset.productName = product.name;
            clone.dataset.productPrice = product.price;
            clone.dataset.productImage = product.image;
            clone.dataset.productDescription = product.description;
            clone.dataset.productCategory = product.category;
            clone.dataset.productVegetarian = product.vegetarian;

            clone.addEventListener("click", (event) => {
                if (event.target.closest(".add-button")) {
                    this.addToCart(product); 
                    return;
                }
                this.updateFondoAndTitle(product);
            });

            this.productsDisplayArea.appendChild(clone);
        });
        
        if (this.observer && this.sentinel) {
            this.observer.unobserve(this.sentinel); 
            this.productsDisplayArea.appendChild(this.sentinel);
            this.observer.observe(this.sentinel); 
        }

        this.loading = false;
    }

    updateFondoAndTitle(product) {
        this.fondoElement.style.backgroundImage = `
            linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.0) 0%,
                rgba(0, 0, 0, 0.0) 50%,
                rgba(0, 0, 0, 0.0) 100%
            ), url(${product.image})
        `;
        this.nameElement.textContent = product.name;
        this.currentProductDisplayed = product;

        this.veganIconTop.innerHTML = "";
        if (product.vegetarian) {
            const leafIcon = document.createElement("img");
            leafIcon.src = "./assets/pngs/leaf.png";
            leafIcon.alt = "Vegano";
            leafIcon.classList.add("menu-layout__vegan-icon");
            this.veganIconTop.appendChild(leafIcon);
            this.veganIconTop.style.display = "block";
        } else {
            this.veganIconTop.style.display = "none";
        }

        this.addToCartTopButton.style.display = "block";
    }

    filterProducts(category) {
        if (this.observer) {
            this.observer.disconnect();
        }
        
        if (category.toLowerCase() === "all") {
            this.displayedProducts = [...this.allProducts];
            this.resetFondoAndTitle();
        } else {
            this.displayedProducts = this.allProducts.filter(product => product.category === category);
            this.veganIconTop.innerHTML = ""; 
            this.addToCartTopButton.style.display = "none";
            this.currentProductDisplayed = null; 
        }

        this.currentIndex = 0; 
        this.productsDisplayArea.innerHTML = ""; 
        this.setupIntersectionObserver(); 
        this.showNextBatch();
    }

    addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItemIndex = cart.findIndex(item => item.id === product.id);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        console.log("Producto añadido al carrito:", product.name);
        console.log("Carrito actual:", cart);

        window.dispatchEvent(new CustomEvent('cart-updated', {
            detail: cart
        }));

        alert(`${product.name} ha sido añadido al carrito.`);
    }
}

customElements.define("menu-page", MenuPage);