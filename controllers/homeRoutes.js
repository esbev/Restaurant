const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {

    res.render('homepage', {
      logged_in: req.session.logged_in
    });

});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/createAccount', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('createAccount');
});

router.get('/logout', async (req, res) => {
  try {
    if (req.session.logged_in) {
      await req.session.destroy();
      res.redirect('/');
    } else {
      res.status(404).json({ message: 'Session not found' });
    }
  } catch (err) {
    console.error('Error during logout:', err);
    res.status(500).json(err);
  }
  res.render('logout');
});

// router.get('/order', withAuth, async (req, res) => {
//   if (!req.session.logged_in)
//   res.redirect('/login')
// })


module.exports = router;