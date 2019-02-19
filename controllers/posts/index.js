
const deletePost = require('./deletePost');
const addPost = require('./addPost');
const updatePost = require('./updatePost')
const likes = require('./likes')
const comments = require('./comments')

module.exports = {
  deletePost : deletePost,
  addPost: addPost,
  updatePost: updatePost,

  deleteLike: likes.deleteLike,
  getLikes: likes.getLike,
  addLike:likes.addLike,

  addComment: comments.addComment,
  deleteComment: comments.deleteComment,
  updateComment: comments.updateComment,
  getComments: comments.getComments,

  addReply: comments.reply.addReply,
  deleteReply:comments.reply.deleteReply,
  updateReply:comments.reply.updateReply,
  getReplies:comments.reply.getReplies,

};