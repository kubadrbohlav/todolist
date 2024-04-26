async function DeleteAbl(req, res) {
  try {
    res.send("/task/delete endpoint");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;
