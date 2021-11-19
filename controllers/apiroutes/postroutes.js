const router = require('express').Router();
const { User, Post, Comment } = require('../../models')
router.post('/test', (req, res) => { console.log(req.body) })
//create a post
router.post('/create', (req, res) => {
    Post.create({
        PosterId: req.session.user_id,
        heading: req.body.heading,
        content: req.body.content
    })
        .then(post => res.json(post))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

//get all posts 
router.get('/all', (req, res) => {
    Post.findALl({
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User, attributes: ['username']
            }]
    }).then(posts => res.json(posts))

        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//get all posts by user(for dashboard)
router.get('/user/:id', (req, res) => {
    //check if dashboard belongs to logged in user
    if (req.params.id === req.session.id) {
        Post.findALl({
            where: { userId: req.params.id },
            order: [['created_at', 'DESC']]
        })
    }
    // render warning page if someone is able to attempt to view a dashboard they don't own
    else { res.render('Warning') }
})
//get one post include all comments (for post view page)
router.get('/full/:id', (req, res) => {
    Post.findOne(
        {
            where: { id: req.params.id },
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'commentorId', 'postId', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        }

    ).then(posts => res.json(posts))
        .catch(err => { console.log(err); res.status(500).json(err) })
})

//get one post don't include comments)(for edit post page)
router.get('/:id', (req, res) => {
    Post.findOne(
        {
            where: { id: req.params.id },
        }

    ).then(post => res.json(post))
        .catch(err => { console.log(err); res.status(500).json(err) })
})

//update post
router.put('/edit/:id', (req, res) => {
    //check if post belongs to logged in user
    if (req.body.userId === req.session.id) {
        Post.update({
            heading: req.body.heading,
            content: req.body.content
        },
            {
                where: {
                    id: req.params.id,
                }
            }).then(post => {
                if (!post) {
                    res.status(404).json({ Message: "Post not found" })
                    return;
                }
            }
            )
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    }

    // render warning page if someone is able to attempt an update on a post they don't own
    else { res.render('Warning') }
})



//delete post
router.delete('/delete', (req, res) => {
    //check if post belongs to logged in user
    if (req.body.userid === req.session.id) {
        Post.Destroy({
            where: {
                id: req.body.id
            }
        })
            .then(post => {
                res.json(post);
            }).catch(err => {
                console.log(err);
                res.status(500).json(err)
            });

    }
    // render warning page if someone is able to attempt a delete on a post they don't own
    else { res.render('Warning') }
})
module.exports = router;
