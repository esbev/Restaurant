const router = require("express").Router();
const {Category, Item} = require("../models")
const withAuth = require("../utils/auth");

router.get("/order", withAuth, async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Item
        }
      ]
    })
    const categories = categoryData.map((category) => category.get({plain:true}))

    res.render("order", {
      logged_in: req.session.logged_in,
      categories
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get("/", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("order");
  }

  res.render("homepage", {
    logged_in: req.session.logged_in,
  });
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/createAccount", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("createAccount");
});

router.get("/logout", async (req, res) => {
  try {
    if (req.session.logged_in) {
      await req.session.destroy();
      res.redirect("/");
    } else {
      res.status(404).json({ message: "Session not found" });
    }
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).json(err);
  }
  res.render("logout");
});

module.exports = router;
