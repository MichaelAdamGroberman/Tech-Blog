const router = require('express').Router();
const { User } = require('../../models')
const bcrypt = require('bcrypt')
//register
router.post('/reg', async (req, res) => {
    //create instance of user and post to db
    console.log(req.body)
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        //using response from .create add user to session
        .then(user => {
            req.session.save(() => {
                req.session.user_id = user.id;
                req.session.username = user.username;
                req.session.loggedIn = true;
                res.json(user);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//getbyid
router.get('/:id', async (req, res) => {
    //find user where id
    User.findOne({
        where: { id: req.params.id }
    }).then(user => {
        if (!user) {
            res.status(404).json({ message: 'user not found' });
            return;
        }
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

//login
router.post('/login', async (req, res) => {
    console.log(req.body)
    User.findOne({
        where: { username: req.body.username }
    }).then(user => {
        console.log(user)
        if (!user) {

            res.status(404).json({ message: 'user not found' });
            return res;
        }

        //runs validate method from user model against input password
        let checkPassword = bcrypt.compareSync(req.body.password, user.password);

        if (!checkPassword) {
            res.status(404);
            alert("incorrect password or Username")
            return res;
        }
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;
            res.json(user);

        }
        )

    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});







module.exports = router;
