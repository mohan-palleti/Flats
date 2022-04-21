require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const connect = require("./configs/db");
var cors = require("cors");

app.use(cors());
const flat_controll = require("./controllers/Flat");
const resident_controll = require("./controllers/resident");
const user_auth = require("./controllers/auth_controllers");
const apiRate = require("./controllers/apiRate");
app.use("/user", user_auth);
app.use("/flat", flat_controll);
app.use("/resident", resident_controll);
app.use("/home", apiRate);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Server is running on ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
