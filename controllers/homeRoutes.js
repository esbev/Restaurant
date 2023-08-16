const router = require('express').Router();

router.get('/', async (req, res) => {

    res.render('layouts/main');

});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;