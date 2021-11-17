const router = require('express').Router();
const { sequelize, User } = require('../../models')

//tried hashing password on model side, but it refused to work 
const bcrypt = require('bcrypt')
//register
router.post('/create', async (req, res) => {
    const username = req.body.username

    // hash password before sending to db
    const password = await bcrypt.hash(req.body.password, 10);
    try {
        const user = await User.create({ username, password })
        return res.json(user)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})
//getbyid
router.get('/:id', async (req, res) => {
    User.findOne()
})


module.exports = router;
