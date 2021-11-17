const router = require('express').Router();
const { User } = require('../../models')

//register
router.post('/reg', async (req, res) => {
    //create instance of user and post to db
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
        res.json(user);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

//login
router.get('/login', async (req, res) => {
    User.findOne({
        where: { userName: req.body.userName }
    }).then(Userdata => {
        if (!UserData) {
            res.status(404).json({ message: 'user not found' });
            return;
        }

        //runs validate method from user model against input password
        const validate = await Userdata.checkPassword(req.body.password)

        if (!validate) {
            res.status(404).json({ message: "incorrect password or Username" });
            return;
        }
        req.session.save(() => {
            req.session.id = Userdata.id;
            req.session.auth = true;
        })

    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



//logout
router.post('/logout', (req, res) => {
    //if logged in
    if (req.session.auth) {
        //reset session object 
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        //not logged in
        res.status(404).end();
    }
});



module.exports = router;
