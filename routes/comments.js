const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const commentController = require('../controllers/commentController');

// 댓글 목록 조회 API
router.get('/posts/:postId/comments', commentController.getCommentsByPostId);

// 댓글 작성 API
router.post(
  '/posts/:postId/comments',
  authMiddleware,
  commentController.createComment
);

// 댓글 수정 API
router.put(
  '/posts/:postId/comments/:commentId',
  authMiddleware,
  commentController.updateComment
);

// 댓글 삭제 API
router.delete(
  '/posts/:postId/comments/:commentId',
  authMiddleware,
  commentController.deleteComment
);

module.exports = router;
