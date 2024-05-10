import jwt from 'jsonwebtoken';

const refreshTokens = new Map();

export const getRefreshTokenPayload = (refreshToken) => {
  if (!refreshTokens.has(refreshToken)) {
    return null;
  }

  const verifiedUser = jwt.verify(refreshToken, process.env.TOKEN_SECRET);

  if (!verifiedUser) {
    return null;
  }

  return verifiedUser;
};

export const setRefreshToken = (refreshToken, userId) => {
  refreshTokens.set(refreshToken, userId);
};

export const deleteRefreshToken = (refreshToken) => {
  refreshTokens.delete(refreshToken);
};

