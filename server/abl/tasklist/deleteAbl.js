const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const tasklistDao = require("../../dao/tasklist-dao");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteAbl(req, res) {
  try {
    // Validate input
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      res.status(400).json({
        code: "invalidDtoIn",
        message: "DtoIn is not valid.",
        validationError: ajv.errors,
      });
      return;
    }

    const result = tasklistDao.remove(req.body.id);

    res.send(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;
