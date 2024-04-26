const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/tasklist/createAbl");
const UpdateAbl = require("../abl/tasklist/updateAbl");
const DeleteAbl = require("../abl/tasklist/deleteAbl");
const GetAbl = require("../abl/tasklist/getAbl");
const ListAbl = require("../abl/tasklist/listAbl");

router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);
router.get("/get", GetAbl);
router.get("/list", ListAbl);

module.exports = router;
