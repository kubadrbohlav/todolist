const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const TASKLIST_FOLDER_PATH = path.join(__dirname, "storage", "tasklist");

// Gets tasklist by ID
function get(id) {
  try {
    const filePath = path.join(TASKLIST_FOLDER_PATH, `${id}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw { code: "failedToReadTasklist", message: error.message };
  }
}

// Gets all takslists that meet specified filters
function list(title) {
  try {
    const files = fs.readdirSync(TASKLIST_FOLDER_PATH);
    let tasklistList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(TASKLIST_FOLDER_PATH, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });

    // Filter
    if (title) {
      tasklistList = tasklistList.filter((a) => a.title === title);
    }

    // Sort alphatebatically
    tasklistList.sort((a, b) => a.title.localeCompare(b.title));

    return tasklistList;
  } catch (error) {
    throw { code: "failedToListTasklists", message: error.message };
  }
}

// Creates new tasklist
function create(tasklist) {
  try {
    tasklist.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(TASKLIST_FOLDER_PATH, `${tasklist.id}.json`);
    const fileData = JSON.stringify(tasklist);
    fs.writeFileSync(filePath, fileData, "utf8");
    return tasklist;
  } catch (error) {
    throw { code: "failedToCreateTasklist", message: error.message };
  }
}

module.exports = {
  get,
  list,
  create,
};
