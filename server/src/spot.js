import logger from "../lib/logger.js";
import OrderBook from "../lib/orderBook.js";
import SocketClient from "../lib/socketClientReq.js";
import getServerTime from '../lib/services/getServerTime.js';
import { orderBookUpdateFromRESTfulAPI, orderbookUpdateFromWebsocket } from "../lib/orderBookManager.js";
import getOrderBookSnapshot from '../lib/services/getOrderBookSnapshot.js';
import dataLogger from "../lib/__dataTransfer.js";


const SYMBOL = "BTCUSDT"; 
 
export default async function createApp(e, socket) {
    logger.info("start orderbook route");
    let SYMBOL = e || "BTCUSDT";
    const socketApi = new SocketClient(`ws/${SYMBOL.toLowerCase()}@depth`);

    const orderBook = new OrderBook(SYMBOL.toUpperCase());

    socketApi.setHandler("depthUpdate", (params)=> orderbookUpdateFromWebsocket(params)(orderBook));

    ///leave a time gap to wait for websoket connection first
    setTimeout(()=>{
        orderBookUpdateFromRESTfulAPI(orderBook)
    }, 3000);

    //orderBook.inspect();
    getServerTime().then(data => console.log(data));

    const response = await getOrderBookSnapshot(SYMBOL);
    socket.emit("Spot_OrderBook_SnapShot" ,response );
 

    const Streaminterval = setInterval(()=>{
        const streamData = orderBook.best_price();
    socket.emit("asks_bidsStream", streamData )
    },1000);

    socket.on("disconnect", (reason)=>{
    logger.tip(reason);
    clearInterval(Streaminterval);
  })

    //const socketClient = new SocketClient(`ws/${e.toLowerCase()}@bookTicker`);
   // socketClient.setHandler('depthUpdate', (params) =>      logger.debug((JSON.stringify(params))));

}