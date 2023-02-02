const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URL;
module.exports = function () {
  console.log("Trying to connect mongo db server now.", url);
  mongoose.connect(url);

  mongoose.connection.once("open", async () => {
    console.log("Connected to server");

    try {
      // Maybe we can add some db seed logic here if this is for dev env.
    } catch (e) {}
  });
};
