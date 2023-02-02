var express = require("express");
var router = express.Router();
const User = require("../../models/User");
const Todo = require("../../models/Todo");
const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 32);

router.get("/", async function (req, res, next) {
  const sessionID = req.sessionID;

  let code = req.query.code;

  if (code) {
    req.session.code = code;
  } else {
    if (!req.session.code) {
      // generate 32 digits
      req.session.code = nanoid();
    }
  }

  const user = await User.findOneAndUpdate(
    { code: req.session.code },
    { code, sessionID },
    { upsert: true, new: true }
  );

  // get all todos
  const todos = await Todo.find({ user: user._id });

  return res.json({ user, todoList: todos });
});

module.exports = router;
