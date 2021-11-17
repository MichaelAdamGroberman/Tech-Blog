const router = require('express').Router();
const users = require('./userroutes');
const posts = require('./postroutes');
const comments = require('./commentroutes');

router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);

module.exports = router;
