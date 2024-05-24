const express = require("express");
const route = express.Router();
const memberController = require("../controllers/memberController");

route.get("/members", memberController.getMemberData);
route.post("/members", memberController.createMemberData);
route.put("/members/:uuid", memberController.updateMemberData);
route.delete("/members/:uuid", memberController.deleteMemberData);

module.exports = route;
