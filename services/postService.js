const { Posts } = require('../models');
const postRepository = require('../repositories/postRepository');

// 게시글 작성
const createPost = async (title, content, userId) => {
  const newPost = await postRepository.createPost(title, content, userId);
  return newPost;
};

// 사용자 작성 글 불러오기
const getUserPosts = async (userId) => {
  const posts = await postRepository.getUserPosts(userId);
  return posts;
};

// 모든 글 불러오기
const getAllPosts = async () => {
  const allPosts = await postRepository.getAllPosts();
  return allPosts;
};

module.exports = {
  createPost,
  getUserPosts,
  getAllPosts,
};
