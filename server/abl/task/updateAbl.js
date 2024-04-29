const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const taskDao = require("../../dao/task-dao");
const tasklistDao = require("../../dao/tasklist-dao");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    title: { type: "string", minLength: 1 },
    description: { type: "string" },
    priority: {
      type: "string",
      pattern: "^none|low|medium|high|critical$",
    },
    deadline: {
      type: "string",
      format: "date",
      pattern: "^\\d{4}-\\d{2}-\\d{2}$",
    },
    done: { type: "boolean" },
    tasklistId: {
      anyOf: [
        { type: "string", minLength: 32, maxLength: 32 },
        { type: "null" },
      ],
    },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    const task = req.body;

    // Validate input
    const valid = ajv.validate(schema, task);
    if (!valid) {
      res.status(400).json({
        code: "invalidDtoIn",
        message: "DtoIn is not valid.",
        validationError: ajv.errors,
      });
      return;
    }

    // Invalid Task ID
    if (!taskDao.get(task.id)) {
      res.status(400).json({
        code: "invalidTaskId",
        message: "Task with specified ID does not exist.",
        invalidId: task.id,
      });
      return;
    }

    // Invalid tasklist ID
    if (task.tasklistId && !tasklistDao.get(task.tasklistId)) {
      res.status(400).json({
        code: "invalidTasklistId",
        message: "Tasklist with specified ID does not exist.",
        invalidTasklistId: task.tasklistId,
      });
      return;
    }

    const updatedTask = taskDao.update(task);

    res.send(updatedTask);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
