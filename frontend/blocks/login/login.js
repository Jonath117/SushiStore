const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="./blocks/login/login.css">

<div class="login">
    <div class="login-fondo">
        <header-bar></header-bar>
        <div class="login-fondo__name">LOGIN</div>
    </div>

    <div class="login-contenido">
        <div class="login-contenido__container">
            <h1 class="login-container__title"><-- LOGIN --></h1>

            <form class="login-form">
                <div class="login-form__group">
                    <label for="email" class="login-form__label"></label>
                    <input 
                        type="email" 
                        id="email-login" 
                        class="login-form__input" 
                        placeholder="Email" 
                        required 
                    />
                </div>

                <div class="login-form__group">
                    <label for="password" class="login-form__label"></label>
                    <input 
                        type="password" 
                        id="password-login" 
                        class="login-form__input" 
                        placeholder="Password" 
                        required 
                    />
                </div>

                <div class="login-submit">
                    <button type="submit" class="login-submit__button">REGISTER</button>
                </div>

                <a class="login-form__redirector" href="#" id="registration-button" >Go to registration instead</a>
            </form>

            <div class="footer">
                <h2 class="footer-text">Licensing Styleguide </h2>
            </div>                  
            
        </div>        
    </div>

</div>
`;

class LoginPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
  }
    connectedCallback() {
        document.documentElement.style.setProperty("--dynamic-background", "black");

        const registrationBtn = this.shadowRoot.getElementById("registration-button");

        const navigate = (route) => {
        window.dispatchEvent(new CustomEvent("navigate", { detail: route }));
        };

        registrationBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        navigate("registration");
        });    
  }  
}

customElements.define("login-page", LoginPage);
