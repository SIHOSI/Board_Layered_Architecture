const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const postController = require('../controllers/postController');

// 게시글 작성 API
router.post('/posts', authMiddleware, postController.createPost);

// 사용자 작성 글 불러오기 API
router.get('/posts/:userId', authMiddleware, postController.getUserPosts);

// 모든 글 불러오기 API
router.get('/posts', postController.getAllPosts);

module.exports = router;
