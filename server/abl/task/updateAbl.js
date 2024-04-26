async function UpdateAbl(req, res) {
  try {
    res.send("/task/update endpoint");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
