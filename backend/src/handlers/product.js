import prisma from "../db.js";

export const getProductsByCategory = async (req, res) => {
  const categoryId = parseInt(req.params.id);

  if (isNaN(categoryId)) {
    return res.status(400).json({ message: "ID de categoría no válido" });
  }

  try {
    const products = await prisma.products.findMany({
      where: {
        category_id: categoryId,
        available: true
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        vegetarian: true,
        price: true,
        calories: true
      }
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
