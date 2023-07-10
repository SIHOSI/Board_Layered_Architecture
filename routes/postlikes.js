const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const postLikeController = require('../controllers/postLikeController');

// 게시글 좋아요 API
router.post('/posts/:postId/like', authMiddleware, postLikeController.likePost);

// 사용자가 좋아요한 게시글 조회 API
router.get('/posts/like', authMiddleware, postLikeController.getLikedPosts);

module.exports = router;
