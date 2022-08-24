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
const routes = require("./routes/images");

const app = express();
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);
app.use(compression());
app.use(express.json());
app.use((res, next) => {
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
app.use("/uploads", express.static("./uploads"));

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening on port ${listener.address().port}`);
});
