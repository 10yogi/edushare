const router = require('express').Router();

const postsController = require('../controllers/posts');
const upload = require('../config/multer-config')

//auth with facebook
router.post('/',upload.single('pic'),postsController.addPost);
router.put('/:postid',postsController.updatePost);
router.delete('/:postid',postsController.deletePost);

router.get('/:postid/likes',postsController.getLikes);
router.post('/:postid/likes',postsController.addLike);
router.delete('/:postid/likes',postsController.deleteLike);

router.get('/:postid/comments',postsController.getComments);
router.post('/:postid/comments',postsController.addComment );
router.delete('/:postid/comments/:commentid',postsController.deleteComment);
router.put('/:postid/comments/:commentid',postsController.updateComment);

router.post('/:postid/comments/:commentid/reply',postsController.addReply);
router.get('/:postid/comments/:commentid/reply',postsController.getReplies);
router.delete('/:postid/comments/:commentid/reply/:replyid',postsController.deleteReply);
router.put('/:postid/comments/:commentid/reply/:replyid',postsController.updateReply);
module.exports = router;