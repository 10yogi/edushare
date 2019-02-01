const router = require('express').Router();

const postsController = require('../controllers/posts');
const likesController = require('../controllers/likes');
const commentsController = require('../controllers/comments');
const upload = require('../config/multer-config')

//auth with facebook
router.post('/',upload.single('pic'),postsController.addPost);
router.put('/:postid',postsController.updatePost);
router.delete('/:postid',postsController.deletePost);

router.get('/:postid/likes',likesController.getLike);
router.post('/:postid/likes',likesController.addLike);
router.delete('/:postid/likes',likesController.deleteLike);

router.get('/:postid/comments',commentsController.getComments);
router.post('/:postid/comments',commentsController.addComment);
router.delete('/:postid/comments',commentsController.deleteComment);
router.put('/:postid/comments',commentsController.updateComment);


module.exports = router;