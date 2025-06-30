import prisma from "../db.js";

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await prisma.blogs.findMany({
            orderBy: { date: "desc" },
            include: {
                users: {
                    select: { name: true }
                }
            }
        });
        res.json(blogs);
    } catch (error) {
        console.error("Error al traer los blogs:", error);
        res.status(500).json({ error: "Error interno al obtener los blogs" });
    }
};

export const getBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await prisma.blogs.findUnique({
            where: { id: parseInt(id) }, 
            include: {
                users: {
                    select: { name: true, id: true }
                }
            }
        });

        if (!blog) {
            return res.status(404).json({ message: "Blog no encontrado" });
        }
        res.json(blog);
    } catch (error) {
        console.error(`Error al obtener blog con ID ${id}:`, error);
        res.status(500).json({ error: "Error interno al obtener el blog" });
    }
};

export const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, description, content } = req.body;
    const loggedInUserId = req.user.id;

    if (!title && !description) {
        return res.status(400).json({ message: "Se requiere al menos un título o una descripción para actualizar." });
    }

    try {
        const blogToUpdate = await prisma.blogs.findUnique({
            where: { id: parseInt(id) },
        });

        if (!blogToUpdate) {
            return res.status(404).json({ message: "Blog no encontrado" });
        }

        if (blogToUpdate.author_id !== loggedInUserId) {
            return res.status(403).json({ message: "No tienes permiso para editar este blog." });
        }

        const updatedBlog = await prisma.blogs.update({
            where: { id: parseInt(id) },
            data: {
                title: title || blogToUpdate.title,
                description: description || blogToUpdate.description,
                content: content || blogToUpdate.content,
            },
            include: {
                users: {
                    select: { name: true, id: true }
                }
            }
        });

        res.status(200).json({
            message: "Blog actualizado exitosamente",
            blog: updatedBlog
        });
    } catch (error) {
        console.error(`Error al actualizar blog con ID ${id}:`, error);
        res.status(500).json({ error: "Error interno al actualizar el blog" });
    }
};
