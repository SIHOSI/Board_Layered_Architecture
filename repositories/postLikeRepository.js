const { Posts, PostLikes, Users } = require('../models');

// 게시글 좋아요 추가 또는 취소
const likePost = async (postId, userId) => {
  const post = await Posts.findByPk(postId);

  if (!post) {
    return {
      status: 404,
      data: { message: '해당 게시글을 찾을 수 없습니다.' },
    };
  }

  const existingLike = await PostLikes.findOne({
    where: { PostId: postId, UserId: userId },
  });

  if (existingLike) {
    // 이미 좋아요한 글인 경우 좋아요 취소
    await existingLike.destroy();
    await post.decrement('likeCount', { by: 1 }); // likeCount 감소
    return { status: 200, data: { message: '게시글 좋아요 취소 완료' } };
  } else {
    // 좋아요 추가
    await PostLikes.create({
      PostId: postId,
      UserId: userId,
    });
    await post.increment('likeCount', { by: 1 }); // likeCount 증가
    return { status: 201, data: { message: '게시글 좋아요 완료' } };
  }
};

// 사용자가 좋아요한 게시글 조회
const getLikedPosts = async (userId) => {
  const likedPosts = await PostLikes.findAll({
    where: { UserId: userId },
  });

  const postIds = likedPosts.map((like) => like.PostId);

  const posts = await Posts.findAll({
    where: { postId: postIds },
    include: [
      {
        model: Users,
        attributes: ['nickname'],
      },
    ],
  });

  return { status: 200, data: { message: '좋아요한 게시글 조회 완료', posts } };
};

module.exports = {
  likePost,
  getLikedPosts,
};
