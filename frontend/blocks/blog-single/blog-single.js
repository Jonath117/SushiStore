const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="./blocks/blog-single/blog-single.css">

<div class="blog-layout">
    <div class="blog-layout__fondo">
        <header-bar></header-bar>
        <div class="blog-layout__name" id="blog-single-header-name"></div>
    </div>

    <div class="blog-layout__contenido">
        <arrow-page>
            <h1 slot="title" id="blog-single-arrow-title" class="blog-container__title"></h1>
        </arrow-page>

        <div id="blog-details-render-area">
        </div>
        
        <footer-principal></footer-principal>
    </div>
</div>
`;

const blogContentDetailsTemplate = document.createElement("template");
blogContentDetailsTemplate.innerHTML = `
<link rel="stylesheet" href="./blocks/blog-single/blog-single.css">
    <div class="single-blog-main-content">
        <div class="single-blog-text-wrapper">
            <div class="blog-article__description-wrapper">
                <p id="fecha-articulo" class="blog-article__date"></p>
                <h1 class="blog-article__title" id="titulo-articulo" style="display: none;"></h1>
                <p id="description-articulo" class="blog-article__description"></p>
                <div class="full-blog-content-text" id="full-blog-content-text"></div>
                <p id="author-articulo" class="blog-article__author"></p>
            </div>
        </div>
    </div>

    <div class="edit-form-container" style="display: none;">
        <h3>Editar Blog</h3>
        <form id="edit-blog-form">
            <label for="edit-title">Título:</label>
            <input type="text" id="edit-title" name="title" required>

            <label for="edit-description">Descripción:</label>
            <textarea id="edit-description" name="description" rows="10" required></textarea>

            <label for="edit-content">Contenido Completo:</label>
            <textarea id="edit-content" name="content" rows="10"></textarea> 
            
            <button type="submit">Guardar Cambios</button>
            <p class="edit-message"></p>         
        </form>
    </div>
`;


class BlogSinglePage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
        this.blogDetailsRenderArea = this.shadowRoot.getElementById('blog-details-render-area');
        this.blogLayoutFondo = this.shadowRoot.querySelector('.blog-layout__fondo');
        this.blogId = null;
        this.loggedInUserId = null;
        this.isEditMode = false;
    }

    connectedCallback() {
        document.documentElement.style.setProperty("--dynamic-background", "black");
        this.getLoggedInUser();
        
        window.addEventListener('navigate', this.handleNavigationEvent);
        this.loadBlogFromHash();
    }

    disconnectedCallback() {
        window.removeEventListener('navigate', this.handleNavigationEvent);
    }

    getLoggedInUser() {
        const storedUserId = localStorage.getItem('loggedInUserId');
        if (storedUserId) {
            this.loggedInUserId = parseInt(storedUserId);
        }
    }

    loadBlogFromHash() {
        const currentPath = window.location.hash.substring(1);
        if (currentPath.startsWith('blog_single_')) {
            const parts = currentPath.split('_');
            this.blogId = parseInt(parts[2]);
            this.isEditMode = parts[3] === 'edit';

            if (this.blogId) {
                this.fetchBlogDetails();
            }
        }
    }

    handleNavigationEvent = (event) => {
        const detail = event.detail;
        if (detail.startsWith('blog_single_')) {
            const parts = detail.split('_');
            this.blogId = parseInt(parts[2]);
            this.isEditMode = parts[3] === 'edit';

            if (this.blogId) {
                this.fetchBlogDetails();
            }
        }
    }

    async fetchBlogDetails() {
        if (!this.blogId) return;

        try {
            const response = await fetch(`http://localhost:3000/api/blogs/${this.blogId}`);
            if (response.ok) {
                const blog = await response.json();
                this.renderBlog(blog);
            } else {
                console.error("Error al obtener detalle del blog:", response.status, await response.json());
                this.blogDetailsRenderArea.innerHTML = "<p>No se pudo cargar el blog.</p>";
            }
        } catch (error) {
            console.error("Error de conexión al obtener detalle del blog:", error);
            this.blogDetailsRenderArea.innerHTML = "<p>Error de conexión al cargar el blog.</p>";
        }
    }

    renderBlog(blog) {
        this.blogDetailsRenderArea.innerHTML = '';
        const clone = blogContentDetailsTemplate.content.cloneNode(true);

        if (this.blogLayoutFondo && blog.img) {
            this.blogLayoutFondo.style.backgroundImage = `url(${blog.img})`;
        }

        this.shadowRoot.getElementById('blog-single-header-name').textContent = blog.title;
        this.shadowRoot.getElementById('blog-single-arrow-title').textContent = blog.title;
        
        const date = new Date(blog.date);
        const formattedDate = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
        clone.querySelector('#fecha-articulo').textContent = formattedDate;

        clone.querySelector('#author-articulo').textContent = `Author: ${blog.users?.name || 'Desconocido'}`;
        clone.querySelector('#titulo-articulo').textContent = blog.title;
        clone.querySelector('#description-articulo').textContent = blog.description;
        
        const fullContentElement = clone.querySelector('#full-blog-content-text');
        if (blog.content) { 
            fullContentElement.innerHTML = blog.content;
        } else {
            fullContentElement.style.display = 'none'; 
        }

        // Lógica para mostrar/ocultar el formulario de edición
        const editFormContainer = clone.querySelector('.edit-form-container');
        const editTitleInput = clone.querySelector('#edit-title');
        const editDescriptionTextarea = clone.querySelector('#edit-description');
        const editContentTextarea = clone.querySelector('#edit-content');
        const editMessage = clone.querySelector('.edit-message');

        if (this.isEditMode && this.loggedInUserId && this.loggedInUserId === blog.author_id) {
            editFormContainer.style.display = 'block';
            editTitleInput.value = blog.title;
            editDescriptionTextarea.value = blog.description;
            editContentTextarea.value = blog.content || '';
            
            const oldForm = editFormContainer.querySelector('#edit-blog-form');
            const newForm = oldForm.cloneNode(true);
            oldForm.parentNode.replaceChild(newForm, oldForm);
            
            newForm.addEventListener('submit', (e) => this.handleEditSubmit(e, blog.id, editMessage));
        } else {
            editFormContainer.style.display = 'none';
        }
        
        this.blogDetailsRenderArea.appendChild(clone);
    }

    async handleEditSubmit(event, blogId, messageElement) {
        event.preventDefault();
        messageElement.textContent = '';
        messageElement.classList.remove('success', 'error');

        const authToken = localStorage.getItem('token');
        if (!authToken) {
            messageElement.textContent = "No estás autenticado para editar.";
            messageElement.classList.add('error');
            return;
        }

        const formData = new FormData(event.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const content = formData.get('content');

        if (!title.trim() || !description.trim() || !content.trim()) {
            messageElement.textContent = "El título, descripción y contenido no pueden estar vacíos.";
            messageElement.classList.add('error');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/blogs/${blogId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({ title, description, content })
            });

            const result = await response.json();
            if (response.ok) {
                messageElement.textContent = result.message;
                messageElement.classList.remove('error');
                messageElement.classList.add('success');
                this.fetchBlogDetails();
            } else {
                messageElement.textContent = result.message || "Error al actualizar el blog.";
                messageElement.classList.remove('success');
                messageElement.classList.add('error');
            }
        } catch (error) {
            console.error("Error de conexión al actualizar blog:", error);
            messageElement.textContent = "Error de conexión al actualizar.";
            messageElement.classList.remove('success');
            messageElement.classList.add('error');
        }
    }
}

customElements.define("blog-single", BlogSinglePage);