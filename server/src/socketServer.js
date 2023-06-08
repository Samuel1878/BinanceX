import { Server } from "socket.io";
import logger from "../lib/logger.js";
import createApp from "./spot.js";
import miniTicker from "./miniTicker.js";
import tradeMonitor from "./monitor-trade.js"
import candleStickAPIreq from "./candleStick.js";
import getCandleHistory from "../lib/services/getCandleData.js";
import { candlelogger } from "../lib/__dataTransfer.js";
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
        socket.on("ticker_trade_req", (e) => {
            miniTicker(e, socket);
            tradeMonitor(e, socket)
        });
        socket.on("kline_req", async(e,interval,limit)=>{
            candleStickAPIreq(e, interval, socket);
           // getCandleHistory(e, interval, limit, socket).then(data=>console.log(data));

        })
    });  
    
    



}