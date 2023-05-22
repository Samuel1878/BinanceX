const registerationInsert = require("../controllers/register_controller")
const express = require("express");
const router = express.Router();

router.post("/2fa",registerationInsert.email2FA)
router.post("/",registerationInsert.createData)
router.get("/",registerationInsert.userForm)


module.exports = router;