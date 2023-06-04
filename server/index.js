import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyparser from "body-parser";
import * as dotenv from 'dotenv';
import http from "http";
import logger from "./lib/logger.js";
import routerRegis from "./Routes/Register.js";
import routerLogin from "./Routes/login.js"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {Server} from "socket.io";
const __dirname = dirname(fileURLToPath(import.meta.url));
import { socketServer } from "./src/socketServer.js";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);

//middlewares
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyparser.json())
app.use(express.json());


app.use("/api/login",routerLogin );
app.use("/api/register", routerRegis);
app.use(express.static(path.join(__dirname, "..", "build")));
app.get("*", (req,res) => {
   res.sendFile(path.join(__dirname, "../build/index.html"))});
mongoose
    .connect(process.env.DB, {useNewUrlParser:true})
    .then(logger.info("Successfully connected to mongoDB"))
    .catch((err)=>logger.warn(err));
const db = mongoose.connection; 
db.on("connected",()=> logger.info("DB Connected"));
db.on("disconnected",()=> logger.warn("DB disconnected"));
db.on("error", ()=>logger.warn("error in connecting DB"));
//socket.io
socketServer(httpServer);

httpServer.listen(process.env.PORT, (err)=>{
    if (err) console.log(err);
    logger.info(`A server is runing at ${process.env.PORT}`)

});



//websocket 

