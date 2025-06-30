import prisma from "../db.js";
import { hashPassword, comparePasswords, createJWT } from "../modules/auth.js";

export const registerUser = async (req, res) => {
  const { name, phone_number, email, password, address } = req.body;

  const userExist = await prisma.users.findUnique({ 
    where: { email } 
  });
  
  if (userExist) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await prisma.users.create({
    data: {
      name,
      phone_number,
      email,
      password: hashedPassword,
      address
    }
  });

  const token = createJWT({
    id: newUser.id,
    email: newUser.email,
    name: newUser.name
  });

  res.status(201).json({ token });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.users.findUnique({ 
    where: { email } 
  });

  if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const isValid = await comparePasswords(password, user.password);
  
  if (!isValid) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = createJWT({
    id: user.id,
    email: user.email,
    name: user.name
  });

  res.status(200).json({ 
    token,
    userId: user.id
   });
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone_number: true,
        address: true,
      }
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};