const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

// 회원가입
const signup = async (req, res) => {
  const { nickname, password } = req.body;
  try {
    // 값이 비어있을 때
    if (!nickname || !password) {
      return res
        .status(401)
        .json({ message: '닉네임과 비밀번호를 입력해주세요.' });
    }

    // 회원가입 처리
    const newUser = await authService.signup(nickname, password);
    res.status(201).json({ message: '회원가입 완료', newUser });
  } catch (error) {
    console.log('🚀 ~ file: authController.js ~ signup ~ error:', error);
    res.status(500).json({ message: '회원가입 오류' });
  }
};

// 로그인
const login = async (req, res) => {
  const { nickname, password } = req.body;
  try {
    // 로그인 처리
    const response = await authService.login(
      nickname,
      password,
      req.cookies.accessToken,
      req.cookies.refreshToken
    );
    res
      .cookie('accessToken', response.newAccessToken, { httpOnly: true })
      .cookie('refreshToken', response.newRefreshToken, { httpOnly: true })
      .json(response);
  } catch (error) {
    console.log('🚀 ~ file: authController.js ~ login ~ error:', error);
    res.status(500).json({ message: '로그인 오류' });
  }
};

// 로그아웃
const logout = (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: '로그아웃되었습니다.' });
};

module.exports = {
  signup,
  login,
  logout,
};
