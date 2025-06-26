const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="./blocks/arrow/arrow.css">

  <div class="arrow-container">
    <img src="./assets/images/Grid.png" class="menu-layout_arrow">
        <slot name="title"><span class="title">Default Title</span></slot>
    <img src="./assets/images/Grid.png" class="menu-layout_arrow2">
  </div>

</div>
`;

class ArrowPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
  }
    connectedCallback() {
        document.documentElement.style.setProperty("--dynamic-background", "black");  
  }  
}

customElements.define("arrow-page", ArrowPage);
