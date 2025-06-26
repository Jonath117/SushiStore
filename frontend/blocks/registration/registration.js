const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="./blocks/registration/registration.css">

<div class="registration">
    <div class="registration-fondo">
        <header-bar></header-bar>
        <div class="registration-fondo__name">REGISTRATION</div>
    </div>

    <div class="registration-contenido">
        <div class="registration-contenido__container">
            <arrow-page>
                <h1 slot="title" class="registration-container__title">
                    REGISTRATION
                </h1>
            </arrow-page>            

            <form class="registration-form">
                <div class="registration-form__group">
                    <label for="name" class="registration-form-label"> </label>
                    <input type="text" id="name-register" class="registration-form__input" placeholder="Name" required />
                </div>

                <div class="registration-form__group">
                    <label for="phone" class="registration-form__label"></label>
                    <input type="tel" id="phone-register" class="registration-form__input" placeholder="Phone Number " required />
                </div>

                <div class="registration-form__group">
                    <label for="email" class="registration-form__label"></label>
                    <input type="email" id="email-register" class="registration-form__input" placeholder="Email" required />
                </div>

                <div class="registration-form__group">
                    <label for="password" class="registration-form__label"></label>
                    <input 
                        type="password" 
                        id="password" 
                        class="registration-form__input" 
                        placeholder="Password" 
                        required            
                    />
                </div>

                <div class="registration-form__group">
                    <label for="confirm-password" class="registration-form__label"></label>
                    <input 
                        type="password" 
                        id="confirm-password" 
                        class="registration-form__input" 
                        placeholder="Confirm Password" 
                        required 
                    />
                </div>

                <div class="registration-form__group">
                    <label for="address" class="registration-form__label"></label>
                    <input 
                        type="address" 
                        id="address-register" 
                        class="registration-form__input" 
                        placeholder="Address" 
                        required 
                    />
                </div>                

                <div class="registration-submit">
                    <button type="submit" class="registration-submit__button">REGISTER</button>
                </div>

                <a class="registration-form__redirector" href="#" id="login-button" >Go to login instead</a>
                </form>
                          
        </div>        
    </div>

    <footer-principal></footer-principal> 

</div>
`;

class RegistrationPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
  }
    connectedCallback() {
        document.documentElement.style.setProperty("--dynamic-background", "black");

        const loginBtn = this.shadowRoot.getElementById("login-button");

        const navigate = (route) => {
        window.dispatchEvent(new CustomEvent("navigate", { detail: route }));
        };

        loginBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        navigate("login");
        });  
        
        
    this.shadowRoot.querySelector("form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const shadow = this.shadowRoot;

        const payload = {
            name: shadow.getElementById("name-register").value,
            phone_number: shadow.getElementById("phone-register").value,
            email: shadow.getElementById("email-register").value,
            password: shadow.getElementById("password").value,
            address: shadow.getElementById("address-register").value,
        };

        const confirmPassword = shadow.getElementById("confirm-password").value;

        if (payload.password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const res = await fetch("http://localhost:3000/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (res.ok) {
            localStorage.setItem("token", result.token);
            alert("Registro exitoso");
            window.location.reload(); // o redirecciona
        } else {
            alert(result.message || "Error en el registro");
        }
    });
  }
    
}

customElements.define("registration-page", RegistrationPage);
