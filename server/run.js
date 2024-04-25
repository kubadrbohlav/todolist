const express = require("express");
const app = express();
const port = 8123;

app.get("/", (req, res) => {
  res.send("Todolist server");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
