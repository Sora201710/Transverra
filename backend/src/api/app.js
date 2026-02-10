const express = require("express");
const app = express();
const HOST = "http://localhost";
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Hello World!",
  });
});

// TODO: For form data, use express.urlencoded() middleware

app.listen(PORT, () => {
  console.log(`Transvera API hosted on: ${HOST}:${PORT}`);
});
