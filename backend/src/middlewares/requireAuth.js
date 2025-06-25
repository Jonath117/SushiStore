import { protect } from '../modules/auth.js';

export const requireAuth = (req, res, next) => {
  console.log('Middleware requireAuth ejecutándose');
  
  return protect(req, res, next);
};