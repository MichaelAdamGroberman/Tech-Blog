const router = require('express').Router();
const logged = require('../../utils/logged')
const { User, Post, Comment } = require('../../models')

//create a comment
router.post('/create/:id', logged, (req, res) => {
    Comment.create({
        userId: req.session.id,
        postId: req.params.id,
        content: req.body.content
    })
        .then(comment => res.json(comment))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});


//get one comment(for edit post comment)
router.get('/:id', (req, res) => {
    Comment.findOne(
        {
            where: { id: req.params.id },
        }

    ).then(post => res.json(post))
        .catch(err => { console.log(err); res.status(500).json(err) })
})

//update comment
router.put('/edit/:id', logged, (req, res) => {
    //check if comment belongs to logged in user
    if (req.body.userId === req.session.id) {
        Post.Comment({
            content: req.body.content
        },
            {
                where: {
                    id: req.params.id,
                }
            }).then(comment => {
                if (!comment) {
                    res.status(404).json({ Message: "Comment not found" })
                    return;
                }
            }
            )
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    }

    // render warning page if someone is able to attempt an update on a comment they don't own
    else { res.render('Warning') }
})



//delete post
router.delete('/delete', (req, res) => {
    //check if comment belongs to logged in user
    if (req.body.userid === req.session.id) {
        Comment.Destroy({
            where: {
                id: req.body.id
            }
        })
            .then(comment => {
                res.json(comment);
            }).catch(err => {
                console.log(err);
                res.status(500).json(err)
            });

    }
    // render warning page if someone is able to attempt a delete on a comment they don't own
    else { res.render('Warning') }
})
module.exports = router;
