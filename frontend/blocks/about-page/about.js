const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="./blocks/about-page/about.css">
    <div class="about-layout"> 
        <div class="about-layout__fondo">
            <header-bar></header-bar>
            <div class="about-layout__name">ABOUT</div>
        </div>
        <div class="about-layout__contenido">
            <div class="about-layout__font">
                <div class="about-layout__description1">
                    <h2 class="about-layout__title">SUSHI ARTISTRY REDEFINED </h2>
                    <p class="about-layout__text">Where culinary craftsmanship meets modern elegance. Indulge in the finest sushi, expertly curated to elevate your dining experience.</p>
                </div>
                <div class="about-layout__containerimg">
                    <img class="about-layout__img" src="/frontend/assets/images/about-2.jpg"></img>
                </div>
            </div>
            
            <div class="about-layout__container">
                <div class="about-layout__achieves1">
                    <span class="about-layout__stars">&#9733 &#9733 &#9733 &#9733 &#9733;</span>
                    <h2 class="about-layout__title2">TRIP ADVISOR</h2>
                    <p class="about-layout__minitext">BEST STEAK HOUSE PRAGUE</p>
                </div>

                <div class="about-layout__achieves2">
                    <span class="about-layout__stars">&#9733 &#9733 &#9733 &#9733 &#9733;</span>
                    <h2 class="about-layout__title2">MICHELIN GUIDE</h2>
                    <p class="about-layout__minitext">BEST STEAK HOUSE PRAGUE</p>
                </div>

                <div class="about-layout__achieves3">
                    <span class="about-layout__stars">&#9733 &#9733 &#9733 &#9733 &#9733;</span>
                    <h2 class="about-layout__title2">STAR DINING</h2>
                    <p class="about-layout__minitext">BEST STEAK HOUSE PRAGUE</p>
                </div>
            </div>   
            
            <div class="about-layout__font2">
                <div class="about-layout__containerimg2">
                    <img class="about-layout__img2" src="/frontend/assets/images/about-3.jpg"></img>
                </div>
                    <div class="about-layout__description2">
                        <h2 class="about-layout__title3">OUR HISTORY</h2>
                        <p class="about-layout__text2">Founded with passion for culinary excellence. Qitchen's journey began in the heart of Prague. Over years, it evolved into a haven for sushi enthusiasts. Celebrated for its arful mastery and devotion to redefining gastronomy.</p>
                    </div>
            </div>

            <div class="about-footer">
                <h2 class="about-footer__text">Licensing Styleguide </h2>
            </div>

        </div>  
    </div>
`;

class AboutPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
  }
    connectedCallback() {
        document.documentElement.style.setProperty("--dynamic-background", "black");
  }  
}

customElements.define("about-page", AboutPage);