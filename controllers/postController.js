const { Posts } = require('../models');
const postService = require('../services/postService');

// 게시글 작성
const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { user } = res.locals;

  try {
    if (!title || !content) {
      return res.status(400).json({ message: '제목과 내용을 입력해주세요.' });
    }

    const newPost = await postService.createPost(title, content, user.userId);

    res.status(201).json({ message: '게시글 작성 완료', newPost });
  } catch (error) {
    console.log('🚀 ~ file: postController.js ~ createPost ~ error:', error);
    res.status(500).json({ message: '게시글 작성 오류' });
  }
};

// 사용자 작성 글 불러오기
const getUserPosts = async (req, res) => {
  const { user } = res.locals;

  try {
    const posts = await postService.getUserPosts(user.userId);

    res.status(200).json({ message: '사용자 게시글 조회 완료', posts });
  } catch (error) {
    console.log('🚀 ~ file: postController.js ~ getUserPosts ~ error:', error);
    res.status(500).json({ message: '게시글 조회 오류' });
  }
};

// 모든 글 불러오기
const getAllPosts = async (req, res) => {
  try {
    const allPosts = await postService.getAllPosts();

    res.status(200).json({ message: '모든 글 조회 완료', allPosts });
  } catch (error) {
    console.log('🚀 ~ file: postController.js ~ getAllPosts ~ error:', error);
    res.status(500).json({ message: '모든 글 조회 실패' });
  }
};

module.exports = {
  createPost,
  getUserPosts,
  getAllPosts,
};
