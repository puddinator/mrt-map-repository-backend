require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) return console.log("Error: ", err);
    console.log(
      "MongoDB Connection -- Ready state is:",
      mongoose.connection.readyState
    );
    return true;
  }
);

const express = require("express");
const helmet = require("helmet");
const compression = require("compression");

const routes = require("./api/images");

const app = express();
// app.use(helmet());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
); // security
app.use(compression()); // reduce time taken for client
app.use(express.json()); // parses incoming requests with JSON payloads
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});
app.use("/", routes);
app.use("/uploads", express.static("./uploads")); // makes the uploads folder publicly accessible

const listener = app.listen(process.env.PORT || 3000, () => {
  // port 3000 is default
  console.log(`App is listening on port ${listener.address().port}`);
});
