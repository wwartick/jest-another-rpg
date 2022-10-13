const router = require('express').Router();

const userRoutes = require('./user-routes');
const generate = require('./generate');
const movieRoutes = require('./movie-routes');

router.use('/users', userRoutes);
router.use('/generate', generate);
router.use('/movies', movieRoutes);

module.exports = router;