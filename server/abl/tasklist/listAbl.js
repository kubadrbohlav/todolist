async function ListAbl(req, res) {
  try {
    res.send("/tasklist/list endpoint");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
