import './blocks/side-bar/side-bar.js';
import './blocks/header-bar/header-bar.js';
import './blocks/menu-nav/menu-nav.js';
import './blocks/menu-page/menu-page.js';
import './blocks/reservation/reservation.js';
import './blocks/about-page/about.js';
import './blocks/footer/footer.js';
import './blocks/contact/contact.js';
import './blocks/blog/blog.js';
import './blocks/registration/registration.js';
import './blocks/login/login.js';
import './blocks/cart/cart.js';
import './blocks/blog-single/blog-single.js';
import './blocks/arrow/arrow.js';
import './blocks/footer-principal/footer-principal.js';


import router from './services/router.js';

router.init();


if (localStorage.getItem("token")) {
  document.querySelector("login")?.remove();
  document.querySelector("registration")?.remove();
}