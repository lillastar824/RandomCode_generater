const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: Schema.Types.String,
  isCompleted: {
    type: Schema.Types.Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", schema);
