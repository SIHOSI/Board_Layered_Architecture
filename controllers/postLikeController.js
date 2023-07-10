const { Posts, PostLikes, Users } = require('../models');
const postLikeService = require('../services/postLikeService');

// 게시글 좋아요 추가 또는 취소
const likePost = async (req, res) => {
  const { postId } = req.params;
  const { user } = res.locals;

  try {
    const response = await postLikeService.likePost(postId, user.userId);

    res.status(response.status).json(response.data);
  } catch (error) {
    console.log('🚀 ~ file: postLikeController.js ~ likePost ~ error:', error);
    res.status(500).json({ message: '게시글 좋아요 오류' });
  }
};

// 사용자가 좋아요한 게시글 조회
const getLikedPosts = async (req, res) => {
  const { user } = res.locals;

  try {
    const response = await postLikeService.getLikedPosts(user.userId);

    res.status(response.status).json(response.data);
  } catch (error) {
    console.log(
      '🚀 ~ file: postLikeController.js ~ getLikedPosts ~ error:',
      error
    );
    res.status(500).json({ message: '좋아요한 게시글 조회 오류' });
  }
};

module.exports = {
  likePost,
  getLikedPosts,
};
