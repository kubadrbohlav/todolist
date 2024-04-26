const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/task/createAbl");
const UpdateAbl = require("../abl/task/updateAbl");
const DeleteAbl = require("../abl/task/deleteAbl");
const GetAbl = require("../abl/task/getAbl");
const ListAbl = require("../abl/task/listAbl");

router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);
router.get("/get", GetAbl);
router.get("/list", ListAbl);

module.exports = router;
