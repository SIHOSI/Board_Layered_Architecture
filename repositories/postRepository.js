const { Posts } = require('../models');

// 게시글 작성
const createPost = async (title, content, userId) => {
  const newPost = await Posts.create({
    postTitle: title,
    postContent: content,
    UserId: userId,
  });
  return newPost;
};

// 사용자 작성 글 불러오기
const getUserPosts = async (userId) => {
  const posts = await Posts.findAll({ where: { UserId: userId } });
  return posts;
};

// 모든 글 불러오기
const getAllPosts = async () => {
  const allPosts = await Posts.findAll();
  return allPosts;
};

module.exports = {
  createPost,
  getUserPosts,
  getAllPosts,
};
