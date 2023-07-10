const { Comments } = require('../models');
const commentService = require('../services/commentService');

// 댓글 목록 조회
const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    const response = await commentService.getCommentsByPostId(postId);

    res.status(response.status).json(response.data);
  } catch (error) {
    console.log(
      '🚀 ~ file: commentController.js ~ getCommentsByPostId ~ error',
      error
    );
    res.status(500).json({ message: '댓글 목록 조회 오류' });
  }
};

// 댓글 작성
const createComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const { user } = res.locals;

  try {
    const response = await commentService.createComment(
      postId,
      content,
      user.userId
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.log(
      '🚀 ~ file: commentController.js ~ createComment ~ error',
      error
    );
    res.status(500).json({ message: '댓글 작성 오류' });
  }
};

// 댓글 수정
const updateComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { content } = req.body;
  const { user } = res.locals;

  try {
    const response = await commentService.updateComment(
      postId,
      commentId,
      content,
      user.userId
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.log(
      '🚀 ~ file: commentController.js ~ updateComment ~ error',
      error
    );
    res.status(500).json({ message: '댓글 수정 오류' });
  }
};

// 댓글 삭제
const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { user } = res.locals;

  try {
    const response = await commentService.deleteComment(
      postId,
      commentId,
      user.userId
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.log(
      '🚀 ~ file: commentController.js ~ deleteComment ~ error',
      error
    );
    res.status(500).json({ message: '댓글 삭제 오류' });
  }
};

module.exports = {
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
};
