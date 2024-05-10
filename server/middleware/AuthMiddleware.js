import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(401).send('Access Denied / Unauthorized request');

  try {
    token = token.split(' ')[1]; // Удаляем Bearer строку, оставляем только токен
    if (!token) return res.status(401).send('Unauthorized request');

    const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verifiedUser) return res.status(401).send('Unauthorized request');

    req.user = verifiedUser; // {userId: ...}
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};
