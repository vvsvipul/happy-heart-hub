const User = require("../models/user.js");

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "user logged out!!".toUpperCase());
    res.redirect("/");
  });
};


module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};
module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    let u = new User({ email, username });
    const us = await User.register(u, password);

    req.flash("success", username.toUpperCase() + "  WELCOME TO HappyHeartHub!!");
    res.redirect("/login");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};
module.exports.login = async (req, res) => {
  req.flash("success", "logged in successfully".toLocaleUpperCase());
  let redirectUrl = res.locals.redirectUrl || "/";
  res.redirect(redirectUrl);
};
