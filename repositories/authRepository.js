const { Users } = require('../models');

// 닉네임으로 사용자 조회
const findUserByNickname = async (nickname) => {
  const user = await Users.findOne({ where: { nickname: nickname } });
  return user;
};

// 사용자 생성
const createUser = async (nickname, password) => {
  const newUser = await Users.create({
    nickname: nickname,
    password: password,
  });
  return newUser;
};

module.exports = {
  findUserByNickname,
  createUser,
};
