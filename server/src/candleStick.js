import SocketClient from "../lib/socketClientReq.js";

const candleStickAPIreq = async(e,interval, socket)=>{
    const socketClient = new SocketClient(`ws/${e.toLowerCase()}@kline_${interval}`, "wss://stream.binance.com:9443/");
    socketClient.setHandler('kline', (params)=> {
        socket.emit("kline" , params);
    })
}
export default candleStickAPIreq;