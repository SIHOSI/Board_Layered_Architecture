const { Posts, PostLikes, Users } = require('../models');
const postLikeRepository = require('../repositories/postLikeRepository');

// 게시글 좋아요 추가 또는 취소
const likePost = async (postId, userId) => {
  const response = await postLikeRepository.likePost(postId, userId);
  return response;
};

// 사용자가 좋아요한 게시글 조회
const getLikedPosts = async (userId) => {
  const response = await postLikeRepository.getLikedPosts(userId);
  return response;
};

module.exports = {
  likePost,
  getLikedPosts,
};
