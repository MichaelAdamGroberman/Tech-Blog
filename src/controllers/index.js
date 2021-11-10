const router = require('express').Router();


router.use('/', require("./siteRoutes"));

router.use('/api', require("./apiRoutes/index"));

module.exports = router