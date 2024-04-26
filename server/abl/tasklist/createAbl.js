async function CreateAbl(req, res) {
  try {
    res.send("/tasklist/create endpoint");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
