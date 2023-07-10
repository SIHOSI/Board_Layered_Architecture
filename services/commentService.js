const { Comments } = require('../models');
const commentRepository = require('../repositories/commentRepository');

// 댓글 목록 조회
const getCommentsByPostId = async (postId) => {
  const response = await commentRepository.getCommentsByPostId(postId);
  return response;
};

// 댓글 작성
const createComment = async (postId, content, userId) => {
  const response = await commentRepository.createComment(
    postId,
    content,
    userId
  );
  return response;
};

// 댓글 수정
const updateComment = async (postId, commentId, content, userId) => {
  const response = await commentRepository.updateComment(
    postId,
    commentId,
    content,
    userId
  );
  return response;
};

// 댓글 삭제
const deleteComment = async (postId, commentId, userId) => {
  const response = await commentRepository.deleteComment(
    postId,
    commentId,
    userId
  );
  return response;
};

module.exports = {
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
};
