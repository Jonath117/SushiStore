const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="./blocks/footer-principal/footer-principal.css">

    <div class="footer">
        <h2 class="footer-text">Licensing</h2>
        <img src="./assets/images/rombo.png" class="icon-footer">
        <h2 class="footer-text">Styleguide</h2>
    </div>      
`

class FooterPage extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
    }
}

customElements.define('footer-principal', FooterPage);