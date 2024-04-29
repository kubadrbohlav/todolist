const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const taskDao = require("../../dao/task-dao");

const schema = {
  type: "object",
  properties: {
    done: { type: "boolean" },
    tasklistId: { type: "string" },
    deadlineUntil: {
      type: "string",
      format: "date",
      pattern: "^\\d{4}-\\d{2}-\\d{2}$",
    },
  },
  required: [],
  additionalProperties: false,
};

async function ListAbl(req, res) {
  try {
    const filters = req.body;

    // Validate input
    const valid = ajv.validate(schema, filters);
    if (!valid) {
      res.status(400).json({
        code: "invalidDtoIn",
        message: "DtoIn is not valid.",
        validationError: ajv.errors,
      });
      return;
    }

    const tasks = taskDao.list(
      filters.done,
      filters.tasklistId,
      filters.deadlineUntil
    );

    res.send({ tasks });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
