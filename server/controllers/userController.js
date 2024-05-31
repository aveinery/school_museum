import ApiError from '../error/apiError.js';
import { User } from '../models/models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { deleteRefreshToken, getRefreshTokenPayload, setRefreshToken } from '../utils/refreshTokens.js';

class UserController {
  async register(req, res, next) {
    try {
      // Хэшируем пароль
      const { password, email } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const user = await User.create({ email, password: hashPassword });
      return res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password, expiresIn = '3h' } = req.body;
      const user = await User.findOne({ where: { email } });

      if (user) {
        const validPassword = await bcrypt.compare(password, user.dataValues.password);

        if (!validPassword) return res.status(401).send('Email or Password is wrong');

        const userId = user.dataValues.id;

        // Создаем токен авторизации
        const payload = { userId };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn });
        const refreshToken = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '7d' });

        setRefreshToken(refreshToken, userId);

        res.status(200).send({ token, refreshToken });
      } else {
        res.status(401).send('Invalid email');
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const verifiedUser = jwt.verify(refreshToken, process.env.TOKEN_SECRET);

      if (!verifiedUser) res.status(401).send('Invalid refresh token');

      const refreshTokenPayload = getRefreshTokenPayload(refreshToken);

      console.log('test - // refreshTokenPayload', refreshTokenPayload, verifiedUser);

      if (refreshTokenPayload && refreshTokenPayload.userId === verifiedUser.userId) {
        const payload = { userId: verifiedUser.userId };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '3h' });
        const refreshToken = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '7d' });

        setRefreshToken(refreshToken, verifiedUser.userId);

        res.status(200).send({ token, refreshToken });
      }

      deleteRefreshToken(refreshToken);

      res.status(401).send('Invalid refresh token');
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

const userController = new UserController();

export default userController;
