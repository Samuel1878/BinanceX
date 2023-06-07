import { Server } from "socket.io";
import logger from "../lib/logger.js";
import createApp from "./spot.js";
import dataLogger,{streamlogger} from "../lib/__dataTransfer.js";
import OrderBook from "../lib/orderBook.js";
import miniTicker from "./miniTicker.js";

export const socketServer = (server) => {
    const io = new Server(server);
    io.on("connection",(socket)=>{
        logger.info("socket connection connected by" + socket.id);
        socket.on("disconnect", (reason) => {
            logger.warn("The Main socket closed due to" + reason); // "ping timeout"
          });
    });

    io.of("/").on("connection", (socket) => {
        logger.info("main route of socketio");
    });

    const socketSpot = io.of("/spot");
    socketSpot.on("connection", (socket) => {
        logger.info("a socket is connected to Spot from:" + socket.id);
        socket.on("Spot_OrderBook_Req", (e)=>{
            createApp(e, socket);
        });
        socket.on("ticker_req", (e) => {
            miniTicker(e, socket);
        })
    });  
    
    



}