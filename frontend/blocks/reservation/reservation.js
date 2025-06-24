const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="./blocks/reservation/reservation.css">
<div class="reservation-layout">
    <div class="reservation-layout__fondo">
        <header-bar></header-bar>
        <div class="reservation-layout__name">BOOK A TABLE</div>
    </div>

    <div class="reservation-layout__contenido">
        <h1 class="reservation-layout__title"> RESERVATION </h1>
        <div class="reservation-layout__description">Secure your spot at Qitchen, where execptional sushi and a remarkabel dining experience await. </div>
        
            <form class="reservation-form">
                <div class="reservation-form__group">
                    <label for="name" class="reservation-form__label"> </label>
                    <input 
                        type="text" 
                        id="name-reservation" 
                        class="reservation-form__input" 
                        placeholder="Name" 
                        required 
                    />
                </div>

                <div class="reservation-form__group">
                    <label for="phone" class="reservation-form__label"></label>
                    <input
                        type="tel" 
                        id="phone-reservation" 
                        class="reservation-form__input" 
                        placeholder="Phone Number" 
                        required 
                    />
                </div>

                <div class="reservation-form__group">
                    <label for="email" class="reservation-form__label"></label>
                    <input 
                        type="email" 
                        id="email-reservation" 
                        class="reservation-form__input" 
                        placeholder="Email" 
                        required 
                    />
                </div>

                <div class="reservation-form__row">
                    <div class="reservation-form__group reservation-form__group--small">
                        <label for="guests" class="reservation-form__label"></label>
                        <input 
                            type="number" 
                            id="guests-reservation" 
                            class="reservation-form__input" 
                            min="1" max="70" 
                            placeholder="Guests"
                            required 
                        />
                    </div>

                    <div class="reservation-form__group reservation-form__group--small">
                        <label for="date" class="reservation-form__label"></label>
                        <input 
                            type="date" 
                            id="date-reservation" 
                            class="reservation-form__input" 
                            placeholder="Date" 
                            required 
                        />
                    </div>

                    <div class="reservation-form__group reservation-form__group--small">
                        <label for="time" class="reservation-form__label"></label>
                        <input 
                            type="time" 
                            id="time-reservation" 
                            class="reservation-form__input" 
                            placeholder="Time" 
                            required 
                        />
                    </div>
                </div>

                <div class="reservation-form__group reservation-form__group--center">
                    <button type="submit" class="reservation-form__button">RESERVE</button>
                </div>
            </form>

            <div class="footer">
                <h2 class="footer-text">Licensing Styleguide </h2>
            </div>      
        </div>
        
    </div>
</div>
`;

class ReservationPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
  }
    connectedCallback() {
        document.documentElement.style.setProperty("--dynamic-background", "black");
  }
}


customElements.define("reservation-page", ReservationPage);