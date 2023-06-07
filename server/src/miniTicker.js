import logger from "../lib/logger.js";
import SocketClient from "../lib/socketClientReq.js"
import dataLogger from "../lib/__dataTransfer.js";
const miniTicker = async(e, socket) => {
    const socketClient = new SocketClient(`ws/${e.toLowerCase()}@ticker`);
    socketClient.setHandler('ticker', (params) => console.log(JSON.stringify(params)));
    const interval = setInterval(async()=>{
        const Response =await dataLogger.get("ticker")
        socket.emit("ticker", Response)
    },1000)
    socket.on("disconnect", ()=>clearInterval(interval))
   
        
}
export default miniTicker;