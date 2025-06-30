const pageTemplate = document.createElement("template");
pageTemplate.innerHTML = `
<link rel="stylesheet" href="./blocks/blog/blog.css">
<div class="blog-layout">
    <div class="blog-layout__fondo">
        <header-bar></header-bar>
        <div class="blog-layout__name">BLOG</div>
    </div>

    <div class="blog-layout__contenido">
        <arrow-page>
            <h1 slot="title" class="blog-container__title">
                BEHIND THE SCENES & LATEST NEWS
            </h1>
        </arrow-page>

        <div class="blog-layout__categorias">
            <button class="blog-layout__btn"> ALL NEWS </button>
            <button class="blog-layout__btn"> FAVORITIES </button>
            <button class="blog-layout__btn"> MY ARTICULES </button>
        </div>

        <div class="blog-articles-container">
            </div>
        
        <footer-principal></footer-principal>
    </div>
</div>
`;

const blogItemTemplate = document.createElement("template");
blogItemTemplate.innerHTML = `
    <div class="blog-article" data-blog-id="">
        <div id="image-article-clone" class="blog-article__image-wrapper">
            <img src="/frontend/assets/images/ct-4.jpg" class="blog-article__image">
            <button class="favorite-button" aria-label="Añadir a favoritos" id="add-favorite-clone">
                <svg class="favorite-icon" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button>
            <button class="edit-button" aria-label="Editar Blog" style="display: none;">
                Editar
            </button>
        </div>
        <div class="blog-article__description-wrapper">
            <p id="fecha-articulo-clone" class="blog-article__date"></p>
            <h1 class="blog-article__title" id="titulo-articulo-clone"></h1>
            <p id="description-articulo-clone" class="blog-article__description"></p>
            <p id="author-articulo-clone" class="blog-article__author"></p> </div>
    </div>
`;


class BlogPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(pageTemplate.content.cloneNode(true));
        this.blogsContainer = this.shadowRoot.querySelector(".blog-articles-container");
        this.favoriteBlogs = new Set();
        this.loggedInUserId = null;
    }

    connectedCallback() {
        document.documentElement.style.setProperty("--dynamic-background", "black");
        this.loadFavoriteBlogs();
        this.getLoggedInUser();
        this.fetchBlogs();
        this.shadowRoot.addEventListener("click", this.handleBlogClick);
    }

    disconnectedCallback() {
        this.shadowRoot.removeEventListener("click", this.handleBlogClick);
    }

    getLoggedInUser() {
        const userId = localStorage.getItem('loggedInUserId');
        if (userId) {
            this.loggedInUserId = parseInt(userId);
        }
    }

    loadFavoriteBlogs() {
        try {
            const favorites = JSON.parse(localStorage.getItem('favoriteBlogs') || '[]');
            this.favoriteBlogs = new Set(favorites);
        } catch (e) {
            console.error("Error cargando blogs favoritos de localStorage:", e);
            this.favoriteBlogs = new Set();
        }
    }

    saveFavoriteBlogs() {
        localStorage.setItem('favoriteBlogs', JSON.stringify(Array.from(this.favoriteBlogs)));
    }

    async fetchBlogs() {
        try {
            const response = await fetch('http://localhost:3000/api/blogs');
            if (response.ok) {
                const blogs = await response.json();
                this.renderBlogs(blogs);
            } else {
                console.error("Error al obtener blogs:", response.status, await response.json());
                this.blogsContainer.innerHTML = "<p>No se pudieron cargar los blogs.</p>";
            }
        } catch (error) {
            console.error("Error de conexión al obtener blogs:", error);
            this.blogsContainer.innerHTML = "<p>Error de conexión al cargar los blogs.</p>";
        }
    }

    renderBlogs(blogs) {
        this.blogsContainer.innerHTML = "";

        if (blogs.length === 0) {
            this.blogsContainer.innerHTML = "<p>No hay blogs disponibles en este momento.</p>";
            return;
        }

        blogs.forEach(blog => {
            const clone = blogItemTemplate.content.cloneNode(true);
            const blogArticleElement = clone.querySelector('.blog-article');

            blogArticleElement.dataset.blogId = blog.id;
            blogArticleElement.dataset.authorId = blog.author_id;

            clone.querySelector('.blog-article__image').src = blog.img;

            clone.querySelector('#fecha-articulo-clone').textContent = new Date(blog.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
            clone.querySelector('#titulo-articulo-clone').textContent = blog.title;
            clone.querySelector('#description-articulo-clone').textContent = blog.description;
            clone.querySelector('#author-articulo-clone').textContent = `Author: ${blog.users?.name || 'Desconocido'}`;

            const favoriteButton = clone.querySelector('.favorite-button');
            if (this.favoriteBlogs.has(blog.id)) {
                favoriteButton.classList.add('active');
            }
            favoriteButton.dataset.blogId = blog.id;

            const editButton = clone.querySelector('.edit-button');
            if (this.loggedInUserId && this.loggedInUserId === blog.author_id) {
                editButton.style.display = 'inline-block';
                editButton.dataset.blogId = blog.id;
            } else {
                editButton.style.display = 'none';
            }
            
            this.blogsContainer.appendChild(clone);
        });
    }

    handleBlogClick = async (event) => {
        const favoriteButton = event.target.closest('.favorite-button');
        const editButton = event.target.closest('.edit-button');
        const blogArticle = event.target.closest('.blog-article');

        if (favoriteButton) {
            event.stopPropagation();
            const blogId = parseInt(favoriteButton.dataset.blogId);
            if (this.favoriteBlogs.has(blogId)) {
                this.favoriteBlogs.delete(blogId);
                favoriteButton.classList.remove('active');
            } else {
                this.favoriteBlogs.add(blogId);
                favoriteButton.classList.add('active');
            }
            this.saveFavoriteBlogs();
            return;
        }

        if (editButton) {
            event.stopPropagation();
            const blogId = parseInt(editButton.dataset.blogId);
            window.dispatchEvent(new CustomEvent("navigate", {
                detail: `blog_single_${blogId}_edit`
            }));
            return;
        }

        if (blogArticle && blogArticle.dataset.blogId) {
            const blogId = blogArticle.dataset.blogId;
            window.dispatchEvent(new CustomEvent("navigate", {
                detail: `blog_single_${blogId}`
            }));
        }
    }
}

customElements.define("blog-page", BlogPage);