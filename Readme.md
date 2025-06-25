## 1 Estructura del proyecto  

### Backend (/backend)  
/src: Contiene todo el código fuente de la aplicación backend.

routers/: Define las rutas principales de la API REST (por ejemplo: /users, /products, /orders).

handlers/: Incluye los controladores de lógica de negocio para cada recurso.

modules/: Funciones reutilizables como autenticación (auth.js), generación de tokens, etc.

middlewares/: Middleware personalizado como requireAuth, validaciones, etc.

validators/: Validaciones con express-validator para datos de entrada.

db.js: Configuración de Prisma y conexión a la base de datos PostgreSQL.

server.js: Punto de entrada del servidor Express.

prisma/schema.prisma: Define el modelo de base de datos usado por Prisma ORM.

.env: Variables de entorno, incluyendo la URL de la base de datos.

### Frontend (/frontend)  

Desarrollado en JavaScript Vanilla con Web Components.

Organización basada en bloques reutilizables:

blocks/: Contiene los componentes personalizados (login-page, registration-page, header-bar, etc.).

Cada componente tiene su HTML, CSS y lógica JS encapsulados.

Se utiliza localStorage para manejar la sesión del usuario de forma simple (almacenando el token JWT).

Comunicación con el backend a través de fetch() a las rutas de la API.


## 2 Justificación de los patrones de diseño seleccionados  
    
El patron implementado fue el patron Router el cual me permite navegar entre diferentes "paginas" (componentes) sin recargar la pagina completamente. Escencialmente y en este caso, detecta cambios en la URL (como #login, #reservation, etc.) y muestra el componente correspondiente.

1 En que archivo se encuentran  

<pre> services/router.js </pre>

2 Pseudo código de la implementación

<pre>
const Router = {
  routes: {
    home: "home",
    menu: "menu-page",
    reservation: "reservation-page",
    about: "about-page",
    contact: "contact-page",
    blog: "blog-page",
    registration: "registration-page",
    login: "login-page",
    carrito: "cart-page",
    blog_single: "blog-single"
  },
</pre>

<pre>  
  navigate(route) {
    const tagName = this.routes[route];
    const root = document.getElementById("main-container");

    if (route === "home") {
      renderInitialHome();
      location.hash = "";
      return;
    }


    if (tagName && root) {
      root.innerHTML = ""; 
      const page = document.createElement(tagName);
      page.classList.add("fade-in");
      root.appendChild(page);
    }

    location.hash = route;
  },
</pre>

## 3 Diagrama de la base de datos  
[Click para ver](./anexos/bd_sushi.png)

## 4 Documentación del proyecto  

## 5 Pasos a seguir  

1. Definición de la arquitectura  
Se estableció una estructura de carpetas clara: assets, blocks, services, index.html, frontend_index.js etc.  
Se definieron los roles del backend y del frontend, y cómo se comunicarían entre sí mediante peticiones HTTP.

2. Configuración del backend
Se creó un servidor con Express.js.  
Se configuró Prisma como ORM para la base de datos PostgreSQL, modelando entidades como users, blogs, orders, etc.  
Se implementaron endpoints REST para funcionalidades como registro y login.  

3. Creación del sistema de rutas (router)
Se desarrolló un enrutador personalizado usando el evento window.hashchange y eventos personalizados como navigate.  
Cada ruta fue asociada a un Web Component dinámico que se renderiza en tiempo real sin recargar la página.  

4. Implementación del frontend con Web Components  
Se crearon componentes personalizados (<login-page>, <registration-page>, <header-bar>, etc.) que encapsulan HTML, CSS y JS.  
Se aplicó lógica para manejar formularios, eventos de navegación y visualización condicional (por ejemplo, ocultar el botón de "Registro" si el usuario ya inició sesión).  

5. Conexión entre frontend y backend  
Se utilizó fetch para consumir los endpoints del backend desde los componentes del frontend.  
Se almacenó el token JWT en localStorage tras el login para manejar autenticación y persistencia de sesión.  
Se validaron respuestas del servidor para mostrar mensajes adecuados al usuario.  

6. Pruebas y validaciones
Se probaron los endpoints con Postman.  
Se validaron los flujos de navegación y sesión en el navegador.  
Se depuraron errores de conexión, validación y respuesta entre cliente y servidor.  

## 6 Link al servicio en vivo  
