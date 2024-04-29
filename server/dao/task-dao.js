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

module.exports = {
  get,
};
