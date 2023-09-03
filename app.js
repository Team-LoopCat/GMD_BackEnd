const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const router = require("./router/index");

const port = process.env.PORT || 8080;

app.use(bodyparser.json({}));
app.use(bodyparser.urlencoded({ extended : true }));

app.use("/", router);

app.listen(port, () => {
  console.log(`port is litening in port ${port}!`);
});
