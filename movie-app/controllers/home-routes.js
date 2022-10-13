const router = require('express').Router();
const sequelize = require('../config/connection');
const {  User, Movie } = require('../models');


router.get('/', (req, res) => {
  res.render('homepage', {
    id: req.session.user_id,
    username: req.session.username,
    loggedIn: req.session.loggedIn
  });
});

router.get('/profile', (req,res) => {
  User.findOne({
    attributes: {exclude: ['password']},
    where: {
      id: req.session.user_id
    },
    include: [
      {
        model: Movie,
        attributes: ['title', 'id']
      }
    ]
  })
  .then(data => { 
    const user = data.get({ plain: true });
    res.render('profile', {user, 
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      email: req.session.email,
      user_id: req.session.user_id
    });
   });
  });

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});


module.exports = router;