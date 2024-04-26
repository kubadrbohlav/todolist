async function UpdateAbl(req, res) {
  try {
    res.send("/tasklist/update endpoint");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
