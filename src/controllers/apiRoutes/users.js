const router = require('express').Router();
const bcrypt = require('bcrypt')
const { User } = require('../../models/User');

//find all
router.get('/allusers', (req, res) => {
    User.findall()
        .then(
            UserData => res.json(UserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});


//findone
router.get('/oneuser/:id', (req, res) => {
    User.findOne({
        where: { id: req.params.id }
    })
        .then(UserData => {
            if (UserData) {
                res.json(UserData)
            }
            else {
                res.status(404).json({ message: "User not found" })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
})
//register


router.post('/register', async (req, res) => {

    console.log("here is...", req.body)
});






router.post('/', (req, res) => {
    //check that no other users share the username
    // User.findOne({
    //     where: { username: req.body.username }
    // })
    // .then(foundOne => {
    // if (!foundOne) {
    //hash password which comes from body
    const password = bcrypt.hash(req.body.password, bcrypt.genSaltSync(10))
    //create user instance using hashed password
    User.create({
        username: req.body.username,
        password: password
    })
        // store set user to active in session
        .then(UserData => {
            req.session.save(() => {
                req.session.user_id = UserData.id;
                req.session.loggedIn = true;
                res.json(UserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})
// else {
//     res.json({ message: "User already exists" })
//     return;
// }

//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err)
//     })
// });


//login
router.post('/login', (req, res) => {
    user.findOne({
        where: { username: req.body.username }
    }).then(UserData => {
        if (!UserData) {
            res.status(400).json({ message: 'User not found' });
            return;
        }
        if (bcrypt.compare(UserData.password, req.body.password)) {
            req.session.save(() => {
                req.session.user_id = UserData.id;
                req.session.loggedIn = true;
            })

        }
        else {
            res.status(400).json({ message: 'Wrong Password' });
            return;
        }
    })
}),
    //logout
    router.post('/logout', (req, res) => {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    });




module.exports = router;
