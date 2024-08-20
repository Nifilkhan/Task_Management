const express = require("express");
const connectDb = require("./config/DbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

connectDb();
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 9000;
const url = process.env.URL;

app.use("/", require("./router/task.routes"));

app.listen(port, () => {
  console.log(`listening on port: ${url} :${port}`);
});
