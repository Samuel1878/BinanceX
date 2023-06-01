import { Server } from "socket.io";
import logger from "../lib/logger.js";
import createApp from "./spot.js";
import dataLogger,{streamlogger} from "../lib/__dataTransfer.js";
import OrderBook from "../lib/orderBook.js";

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
            createApp(e);
            const snap = dataLogger.get("_data");
            socket.emit("Spot_OrderBook_SnapShot" ,snap );
            });
       
        const Streaminterval = setInterval(()=>{
            const streamData = streamlogger.get("stream")
            socket.emit("asks_bidsStream",streamData )
        },1000);
        socket.on("disconnect", (reason)=>{
            logger.tip(reason);
            clearInterval(Streaminterval);

        })
    });  
    
    



}