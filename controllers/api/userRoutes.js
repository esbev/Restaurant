const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

app.get("/api/user/:username", (req, res) => {
  if (req.params.username) {
    console.info(`${req.method} request received to get a username`);
    const userUsername = req.params.username;
    for (let i = 0; i < user.length; i++) {
      const currentUser = user[i];
      if (currentUser.username === userUsername) {
        res.status(200).json(currentUser);
        return;
      }
    }
    res.status(404).send("Username not found");
  } else {
    res.status(400).send("User ID not provided");
  }
});

module.exports = router;
