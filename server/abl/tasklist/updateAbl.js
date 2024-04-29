const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const tasklistDao = require("../../dao/tasklist-dao");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    color: { type: ["string", "null"] },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    const tasklist = req.body;

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

    const currentTasklisk = tasklistDao.get(tasklist.id);
    if (!currentTasklisk) {
      res.status(400).json({
        code: "invalidTasklistId",
        message: "Tasklist ID is invalid.",
        invalidId: tasklist.id,
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
      console.warn("Invalid color hex code, not overwriting color.");
      delete tasklist.color;
    }

    // Check for duplicated title
    if (tasklist.title) {
      const tasklistWithTitle = tasklistDao.list(tasklist.title);

      if (
        tasklistWithTitle.length > 0 &&
        tasklistWithTitle[0].id !== currentTasklisk.id
      ) {
        res.status(400).json({
          code: "titleAlreadyExists",
          message: "Task List with specified title already exists.",
          titleAlreadyExists: tasklist.title,
        });
        return;
      }
    }

    const updatedTasklist = tasklistDao.update(tasklist);

    res.send(updatedTasklist);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
