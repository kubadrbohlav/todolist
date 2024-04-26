async function DeleteAbl(req, res) {
  try {
    res.send("/tasklist/delete endpoint");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;
