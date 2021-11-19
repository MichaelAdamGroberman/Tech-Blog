const express = require('express')
const router = express.Router();
const { Post, Comment, User } = require('../models')
router.get('/', async (req, res) => {
    // Post.findAll({
    // order: [['createdAt', 'DESC']],
    // include: [{ model: User, attributes: ['username'] }]
    // }).then(allposts => {
    // if (allposts) {
    // const posts = allposts.map(post => post.get({ plain: true }));
    // console.log(posts)
    // res.render('home', { posts, auth: req.session.loggedIn })
    // }
    // else {
    res.render('home')
    // }
    // })
})

router.get('/dashboard', (req, res) => {
    Post.findAll({
        where: { PosterId: req.session.user_id },
        order: [['createdAt', 'DESC']]
    }).then(allposts => {
        const posts = allposts.map(post => post.get({ plain: true }));
        console.log(posts)
        res.render('dashboard', { posts, auth: req.session.loggedIn })
    })
})
router.get('/onePost/:id', (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
        include: [{ model: User, attributes: ['username'] }],
        raw: true
    }).then(resPost => {
        let post = resPost
        Comment.findAll({
            where: { postId: req.params.id }, include: [{ model: User, attributes: ['username'] }],
        }).then((resComments) => {
            let comments = resComments.map(comment => comment.get({ plain: true }))
            console.log(post)
            console.log(comments)
            res.render
                ('onePostView', { post, comments, auth: req.session.loggedIn, sessuser: req.session.user_id })
        })


    })
})

router.get('/createpost', (req, res) => {
    res.render('createPost')
})
router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/register', (req, res) => {
    res.render('register')
})
router.get('/createComment/:id', (req, res) => {
    const id = req.params.id
    res.render('createComment', { id: id })
})
router.get('/edit/comment/:id', (req, res) => {
    const id = req.params.id
    const userId = req.session.user_id
    Comment.findOne({
        where: { id: id }, raw: true

    }).then(resComment => {
        let comment = resComment
        console.log(comment)
        res.render('editComment', { comment, userId })
    }).catch(err => console.log(err))
})
//logout
router.get('/logout', (req, res) => {
    //if logged in
    if (req.session.loggedIn) {
        //reset session object 
        req.session.destroy(() => {
            res.redirect('/')
        });
    } else {
        //not logged in
        res.status(404).end();
    }
});
module.exports = router;