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
            <arrow-page>
                <h1 slot="title" class="login-container__title">
                    LOGIN            
                </h1>
            </arrow-page>

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
                    <button type="submit" class="login-submit__button">LOGIN</button>
                </div>

                <a class="login-form__redirector" href="#" id="registration-button" >Go to registration instead</a>
            </form>

            <footer-principal></footer-principal>               
            
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


     this.shadowRoot.querySelector("form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = {
        email: this.shadowRoot.getElementById("email-login").value,
        password: this.shadowRoot.getElementById("password-login").value,
      };

      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        localStorage.setItem("token", result.token);
        alert("Login exitoso");
        location.reload();
      } else {
        alert(result.message || "Credenciales inválidas");
      }
    });
  }
}

customElements.define("login-page", LoginPage);
