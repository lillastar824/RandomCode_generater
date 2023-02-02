var express = require("express");
var router = express.Router();
const {
  body,
  query,
  validationResult,
  checkSchema,
} = require("express-validator");
const validationMiddelware = require("../../middlewares/validationMiddleware");

const Todo = require("../../models/Todo");
const { createSchema, deleteSchema, updateSchema } = require("./validation");

router.get("/", function (req, res, next) {
  return res.json({ status: "ok" });
});

router.post(
  "/",
  checkSchema(createSchema),
  validationMiddelware,
  async function (req, res, next) {
    const body = {
      user: req.session.user._id,
      content: req.body.content,
    };

    const existing = await Todo.findOne(body);
    if (existing) {
      return res.status(400).json({ errors: "Duplicated!!" });
    }

    const newTodo = await Todo.create(body);
    return res.json({ todo: newTodo });
  }
);

router.delete(
  "/",
  checkSchema(deleteSchema),
  validationMiddelware,
  async function (req, res, next) {
    const _id = req.query._id;

    try {
      const item = await Todo.findByIdAndDelete(_id);
      return res.json({ msg: "Successfully removed." });
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/",
  checkSchema(updateSchema),
  validationMiddelware,
  async function (req, res, next) {
    try {
      const item = await Todo.findById(req.body._id);
      if (!item) {
        return res.status(400).json({ errors: "Can not find todo item" });
      }
      const updated = await Todo.findByIdAndUpdate(
        req.body._id,
        { isCompleted: req.body.isCompleted },
        { new: true }
      );
      return res.json({ updated });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
