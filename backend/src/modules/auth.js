import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET no está definido en .env');
  }
  return secret;
};

// 3. Generación de JWT
export const createJWT = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name
    },
    getJwtSecret(),
    { expiresIn: '7d' }
  );
};

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const token = bearer.split(' ')[1];

  try {
    const payload = jwt.verify(token, getJwtSecret());
    req.user = payload;
    next();
  } catch (err) {
    console.error('Error de JWT:', err);
    return res.status(401).json({ message: 'Token inválido' });
  }
};