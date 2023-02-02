const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  sessionID: Schema.Types.String,
  code: Schema.Types.String,
});

module.exports = mongoose.model("User", schema);
