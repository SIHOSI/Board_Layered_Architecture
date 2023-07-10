const { Comments } = require('../models');

// 댓글 목록 조회
const getCommentsByPostId = async (postId) => {
  const comments = await Comments.findAll({
    where: { PostId: postId },
    order: [['createdAt', 'DESC']],
  });

  return { status: 200, data: { message: '댓글 목록 조회 완료', comments } };
};

// 댓글 작성
const createComment = async (postId, content, userId) => {
  if (!content) {
    return { status: 400, data: { message: '댓글 내용을 입력해주세요.' } };
  }

  const newComment = await Comments.create({
    content,
    PostId: postId,
    UserId: userId,
  });

  return { status: 201, data: { message: '댓글 작성 완료', newComment } };
};

// 댓글 수정
const updateComment = async (postId, commentId, content, userId) => {
  if (!content) {
    return { status: 400, data: { message: '댓글 내용을 입력해주세요.' } };
  }

  const comment = await Comments.findOne({
    where: { id: commentId, PostId: postId, UserId: userId },
  });

  if (!comment) {
    return { status: 404, data: { message: '해당 댓글을 찾을 수 없습니다.' } };
  }

  comment.content = content;
  await comment.save();

  return { status: 200, data: { message: '댓글 수정 완료', comment } };
};

// 댓글 삭제
const deleteComment = async (postId, commentId, userId) => {
  const comment = await Comments.findOne({
    where: { id: commentId, PostId: postId, UserId: userId },
  });

  if (!comment) {
    return { status: 404, data: { message: '해당 댓글을 찾을 수 없습니다.' } };
  }

  await comment.destroy();

  return { status: 200, data: { message: '댓글 삭제 완료' } };
};

module.exports = {
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
};
