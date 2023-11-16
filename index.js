require("dotenv").config();
const express = require("express");
const router = require("./app/router");
const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(process.env.APP_PORT, () => {
  console.log(`server is running on ${process.env.APP_PORT}`);
});
