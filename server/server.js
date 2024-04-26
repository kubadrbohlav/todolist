const express = require("express");
const cors = require("cors");
const app = express();
const port = 8123;

// controllers
const taskController = require("./controller/task");
const tasklistController = require("./controller/tasklist");

// CORS Headers
app.use(cors());

// additional support
app.use(express.json()); // support for application/json
app.use(express.urlencoded({ extended: true })); // support for application/x-www-form-urlencoded

// root
app.get("/", (req, res) => {
  res.send("Todolist server is running!");
});

// endpoints
app.use("/task", taskController);
app.use("/tasklist", tasklistController);

// run server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
