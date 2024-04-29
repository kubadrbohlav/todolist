const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const TASK_FOLDER_PATH = path.join(__dirname, "storage", "task");

// Gets task by ID
function get(id) {
  try {
    const filePath = path.join(TASK_FOLDER_PATH, `${id}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw { code: "failedToReadTask", message: error.message };
  }
}

// Gets all tasks that meet specified filters
function list(done, tasklistId, deadlineUntil) {
  try {
    const files = fs.readdirSync(TASK_FOLDER_PATH);
    let tasks = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(TASKLIST_FOLDER_PATH, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });

    // Filter done state
    if (typeof done === "boolean") {
      tasks = tasks.filter((a) => a.done === done);
    }

    // Filter tasklist ID
    if (tasklistId !== undefined) {
      tasks = tasks.filter((a) => a.tasklistId === tasklistId);
    }

    // Filter deadline
    if (deadlineUntil) {
      const maxDate = new Date(deadlineUntil);
      tasks = tasks.filter((a) => {
        new Date(a.deadline) <= maxDate;
      });
    }

    // Sort by date ascending
    tasks.sort((a, b) => {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      return dateA - dateB;
    });

    return tasks;
  } catch (error) {
    throw { code: "failedToListTasks", message: error.message };
  }
}

// Creates new task
function create(task) {
  try {
    task.id = crypto.randomBytes(16).toString("hex");
    task.done = false;
    task.completedDate = null;
    task.priority = task.priority || "none";
    task.description = task.description || "";
    task.tasklistId = task.tasklistId || null;

    if (!task.deadline) {
      const now = new Date();
      const year = now.getFullYear();
      let month = now.getMonth() + 1;
      month = month < 10 ? "0" + month : month.toString();
      let day = now.getDate();
      day = day < 10 ? "0" + day : day.toString();

      task.deadline = `${year}-${month}-${day}`;
    }

    const filePath = path.join(TASK_FOLDER_PATH, `${task.id}.json`);
    const fileData = JSON.stringify(task);
    fs.writeFileSync(filePath, fileData, "utf8");

    return task;
  } catch (error) {
    throw { code: "failedToCreateTask", message: error.message };
  }
}

module.exports = {
  get,
  list,
  create,
};
