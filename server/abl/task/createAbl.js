async function CreateAbl(req, res) {
  try {
    res.send("/task/create endpoint");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
