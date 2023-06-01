import logger from "../lib/logger.js";
import OrderBook from "../lib/orderBook.js";
import SocketClient from "../lib/socketClientReq.js";
import getServerTime from '../lib/services/getServerTime.js';
import { orderBookUpdateFromRESTfulAPI, orderbookUpdateFromWebsocket } from "../lib/orderBookManager.js";
import getOrderBookSnapshot from '../lib/services/getOrderBookSnapshot.js';
import dataLogger from "../lib/__dataTransfer.js";


const SYMBOL = "BTCUSDT"; 
 
export default async function createApp(e) {
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
    getOrderBookSnapshot(SYMBOL).then(data => dataLogger.set("_data",data)).then(logger.tip("Got==========Snapshot"));
    orderBook.best_price();

    //const socketClient = new SocketClient(`ws/${e.toLowerCase()}@bookTicker`);
   // socketClient.setHandler('depthUpdate', (params) =>      logger.debug((JSON.stringify(params))));

}