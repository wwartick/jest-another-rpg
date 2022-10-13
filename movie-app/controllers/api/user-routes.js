const { User, Movie } = require('../../models');
const router = require('express').Router();

// GET /api/users
router.get('/', (req, res) => {
  User.findAll()
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Movie,
        attributes: ['id', 'title', 'created_at']
      }
    ]
  })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
  // expects...
  // { username: <username>,
  // email: <email>,
  // password: <password> }

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then(data => {
    req.session.save(() => {
      req.session.user_id = data.id;
      req.session.username = data.username;
      req.session.email = data.email;
      req.session.loggedIn = true;
  
      res.json(data);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  });

// POST /api/login
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(data => {
      if (!data) {
        res.status(400).json({ message: 'No user found with this email' });
        return;
      }
      const validPassword = data.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ messsage: 'Incorrect password' });
        return;
      }
      req.session.save(() => {
        req.session.user_id = data.id;
        req.session.email = req.body.email;
        req.session.username = data.username;
        req.session.loggedIn = true;
        res.json({ user: data, message: 'You are now logged in!' });

    });
  });
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/logout', (req,res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else { 
    res.status(404).end();
  }
});

module.exports = router;