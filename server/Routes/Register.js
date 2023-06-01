import registerationInsert from "../controllers/register_controller.js";
import express from "express";
const routerRegis = express.Router();

routerRegis.post("/2fa",registerationInsert.email2FA)
routerRegis.post("/",registerationInsert.createData)
routerRegis.get("/",registerationInsert.userForm)


export default routerRegis;