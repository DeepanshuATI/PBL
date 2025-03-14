import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'mysecretkey';

export const generateToken = (userId) => {
  return jwt.sign({ user_id: userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};
