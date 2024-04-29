const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const tasklistDao = require("../../dao/tasklist-dao");

const schema = {
  type: "object",
  properties: {
    title: { type: "string" },
    color: { type: ["string", "null"] },
  },
  required: ["title", "color"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let tasklist = req.body;

    // Validate input
    const valid = ajv.validate(schema, tasklist);
    if (!valid) {
      res.status(400).json({
        code: "invalidDtoIn",
        message: "DtoIn is not valid.",
        validationError: ajv.errors,
      });
      return;
    }

    // Empty title
    if (tasklist.title === "") {
      res.status(400).json({
        code: "emptyTitle",
        message: "Cannot create task list with empty title.",
      });
      return;
    }

    // Invalid color hex code
    if (tasklist.color && !/[a-f0-9]{6}|[a-f0-9]{3}/.test(tasklist.color)) {
      res.statusMessage = "Invalid color hex code.";
      tasklist.color = null;
    }

    // Title already exists
    if (tasklistDao.list(tasklist.title).length > 0) {
      res.status(400).json({
        code: "titleAlreadyExists",
        message: "Task List with specified title already exists.",
        titleAlreadyExists: tasklist.title,
      });
      return;
    }

    tasklist = tasklistDao.create(tasklist);

    res.send(tasklist);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
