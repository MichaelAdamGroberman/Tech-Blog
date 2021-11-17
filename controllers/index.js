const router = require('express').Router();


router.use('/', require("./siteRoutes"));

router.use('/api', require("./apiroutes/index.js"));

module.exports = router