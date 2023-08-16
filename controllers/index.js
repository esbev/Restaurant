const router = require('express').Router();

// const apiRoute = require("./api")
const homeRoutes = require('./homeRoutes')

// router.use('/api', apiRoute);
router.use('/', homeRoutes);

module.exports = router;