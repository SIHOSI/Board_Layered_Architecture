const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/authRepository');
require('dotenv').config();
const env = process.env;

// 액세스 토큰 발급
const generateAccessToken = (userId) => {
  return jwt.sign({ userId: userId }, env.ACCESS_KEY, {
    expiresIn: '1h',
  });
};

// 리프레시 토큰 발급
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId: userId }, env.REFRESH_KEY, {
    expiresIn: '7d',
  });
};

// 회원가입
const signup = async (nickname, password) => {
  // 닉네임 유효성
  const user = await authRepository.findUserByNickname(nickname);
  if (user) {
    throw new Error('이미 존재하는 닉네임.');
  }

  // 비밀번호 유효성
  const passwordRegex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error('비밀번호는 5글자 이상이며 특수문자를 포함해야 합니다.');
  }

  // 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await authRepository.createUser(nickname, hashedPassword);

  return newUser;
};

// 로그인
const login = async (nickname, password, refreshToken, accessToken) => {
  // Case 1: 처음 로그인하는 경우
  if (!refreshToken) {
    const user = await authRepository.findUserByNickname(nickname);

    // 회원 유효성
    if (!user) {
      throw new Error('닉네임이 존재하지 않습니다.');
    }

    // 비밀번호 유효성
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new Error('잘못된 비밀번호.');
    }

    const newAccessToken = generateAccessToken(user.userId);
    const newRefreshToken = generateRefreshToken(user.userId);

    const userId = user.userId;

    return {
      userId,
      newAccessToken,
      newRefreshToken,
      message: '로그인되었습니다.',
    };
  }

  // Case 2: Access Token과 Refresh Token 모두 만료된 경우
  try {
    jwt.verify(refreshToken, env.REFRESH_KEY);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const decodedRefreshToken = jwt.decode(refreshToken);
      const userId = decodedRefreshToken.userId;

      const newAccessToken = generateAccessToken(userId);
      const newRefreshToken = generateRefreshToken(userId);

      return {
        userId,
        newAccessToken,
        newRefreshToken,
        message: 'ACCESS TOKEN과 REFRESH TOKEN이 갱신되었습니다.',
      };
    }
  }

  // Case 3: Access Token은 만료됐지만 Refresh Token은 유효한 경우
  try {
    jwt.verify(accessToken, env.ACCESS_KEY);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const decodedRefreshToken = jwt.decode(refreshToken);
      const userId = decodedRefreshToken.userId;

      const newAccessToken = generateAccessToken(userId);

      return {
        userId,
        newAccessToken,
        message: 'ACCESS TOKEN이 갱신되었습니다.',
      };
    }
  }

  // Case 4: Access Token은 유효하지만 Refresh Token은 만료된 경우
  try {
    jwt.verify(refreshToken, env.REFRESH_KEY);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const decodedAccessToken = jwt.decode(accessToken);
      const userId = decodedAccessToken.userId;

      const newRefreshToken = generateRefreshToken(userId);

      return {
        userId,
        accessToken,
        newRefreshToken,
        message: 'REFRESH TOKEN이 갱신되었습니다.',
      };
    }
  }

  // Case 5: Access Token과 Refresh Token 모두 유효한 경우
  if (refreshToken) {
    const decodedAccessToken = jwt.decode(accessToken);
    const userId = decodedAccessToken.userId;
    return {
      userId,
      accessToken,
      message: 'ACCESS TOKEN과 REFRESH TOKEN이 모두 유효합니다.',
    };
  }
};

module.exports = {
  signup,
  login,
};
