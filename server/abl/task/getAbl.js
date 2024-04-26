async function GetAbl(req, res) {
  try {
    res.send("/task/get endpoint");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
