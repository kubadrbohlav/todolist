const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const taskDao = require("../../dao/task-dao");
const tasklistDao = require("../../dao/tasklist-dao");

const schema = {
  type: "object",
  properties: {
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
    tasklistId: { type: "string" },
  },
  required: ["title"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let task = req.body;

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

    // Invalid tasklist ID
    if (task.tasklistId && !tasklistDao.get(task.tasklistId)) {
      res.status(400).json({
        code: "invalidTasklistId",
        message: "Tasklist with specified ID does not exist.",
        invalidTasklistId: task.tasklistId,
      });
      return;
    }

    task = taskDao.create(task);

    res.send(task);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
