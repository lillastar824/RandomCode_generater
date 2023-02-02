const User = require("../models/User");

module.exports = async function (req, res, next) {
  let user = null;
  if (req.session.code) {
    user = await User.findOne({ code: req.session.code });
  } else {
    user = await User.findOne({ sessionID: req.sessionID });
  }
  if (!user) {
    return res
      .status(400)
      .json({ errors: "your session is expired. please refresh the page" });
  }
  req.session.user = user;
  next();
};
