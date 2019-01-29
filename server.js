const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const config = require("./config/db");
mongoose.connect(
  config.connectionString,
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

const schema = require("./graphql/schema");
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.use("", (req, res) => {
  res.send("Hello");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
