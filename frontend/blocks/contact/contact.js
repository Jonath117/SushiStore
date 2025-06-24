const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="./blocks/contact/contact.css">

<div class="contact-layout">
    <div class="contact-layout__fondo">
        <header-bar></header-bar>
        <div class="contact-layout__name">CONTACT</div>
    </div>

    <div class="contact-layout__contenido">
        <div class="contact-layout__font">
            <div class="contact-layout__description1">
                <h2 class="contact-layout__title"><-- OPENING HOURS --></h2>
                <p class="contact-layout__text">Monday ----------------------------- 16:00 - 22:30</p>
                <p class="contact-layout__text">Tuesday ---------------------------- 16:00 - 22:30</p>
                <p class="contact-layout__text">Wednesday -------------------------- 16:00 - 22:30</p>
                <p class="contact-layout__text">Thursday --------------------------- 16:00 - 22:30</p>
                <p class="contact-layout__text">Friday ----------------------------- 16:00 - 22:30</p>
                <p class="contact-layout__text">Saturday & Sunday ------------------ 16:00 - 22:30</p>
            </div>
            <div class="contact-layout__containerimg">
                <div class="image-wrapper">
                    <img class="contact-layout__img1" src="/frontend/assets/images/contact.jpg" alt="Imagen">
                    <a href="https://instagram.com/tuperfil" target="_blank" class="instagram-logo">
                        <img src="/frontend/assets/pngs/ig.png" alt="Instagram" width="40">
                    </a>
                </div>
                <img class="contact-layout__img2" src="/frontend/assets/images/ct-2.jpg"></img>
                <img class="contact-layout__img3" src="/frontend/assets/images/ct-3.jpg"></img>
                <img class="contact-layout__img4" src="/frontend/assets/images/ct-4.jpg"></img>
            </div>

            <div class="contact-layout__maps">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.467703273079!2d-63.17822432406772!3d-17.769702974690937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e7768a916b3b%3A0xbfa258118cbb9a77!2sSushiTowers!5e0!3m2!1ses-419!2sbo!4v1750633647455!5m2!1ses-419!2sbo" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                </iframe>                
            </div>

            <div class="contact-layout__getintouch">
                <h2 class="contact-layout__title"><-- GET IN TOUCH --></h2>
                <p class="contact-layout__text">ADDRES ------------- 23 Greenfield Avenue, 120 00</p>
                <p class="contact-layout__text">PHONE --------------------------- +49 1234 56789</p>
                <p class="contact-layout__text">EMAIL --------------------- email@example.com</p>
                <p class="contact-layout__text">FOLLOW ------------------
                    <a href="https://instagram.com/tuperfil" target="_blank">
                        <img src="/frontend/assets/pngs/ig.png" alt="Instagram" width="40">
                    </a>

                    <a href="https://facebook.com/tuperfil" target="_blank"> 
                        <img src="/frontend/assets/pngs/fb.png" alt="Facebook" width="40">                    
                    </a>

                    <a href="https://x.com/tuperfil" target="_blank" >
                        <img src="/frontend/assets/pngs/x.png" alt="Twitter" width="40">
                    </a>
                </p>

            </div>            

        </div>        
    </div>

</div>
`;

class ContactPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
  }
    connectedCallback() {
        document.documentElement.style.setProperty("--dynamic-background", "black");
  }  
}

customElements.define("contact-page", ContactPage);
