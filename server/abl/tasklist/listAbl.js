const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const tasklistDao = require("../../dao/tasklist-dao");

const schema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 1 },
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

    const tasklists = tasklistDao.list(filters.title);
    res.send({
      tasklists,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
