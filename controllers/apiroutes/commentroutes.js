const router = require('express').Router();
const { User, Post, Comment } = require('../../models')

//create a comment
router.post('/create', (req, res) => {
    console.log(req.body)
    Comment.create({
        CommentorId: req.session.user_id,
        PostId: req.body.postId,
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
router.put('/edit', (req, res) => {
    //check if comment belongs to logged in user
    console.log(req.body)
    if (req.body.userId === req.session.id) {
        Comment.update(
            { content: req.body.content },
            { where: { id: req.body.commentId } }
        ).then(comment => {
            if (!comment) {
                res.status(404).json({ message: 'Comment not found' });
                return;
            }
            res.json(comment);
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }
    // render warning page if someone is able to attempt an update on a comment they don't own
    else { res.render('Warning') }
})



//delete post
router.delete('/delete', (req, res) => {
    //check if comment belongs to logged in user
    console.log(req.body.commentId)
    Comment.destroy({
        where: {
            id: req.body.commentId
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
)
module.exports = router;
