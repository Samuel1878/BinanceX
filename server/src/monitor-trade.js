import SocketClient from "../lib/socketClientReq.js";


const tradeMonitor = (e, socket) => {
    const socketClient = new SocketClient(`ws/${e.toLowerCase()}@trade`, 'wss://stream.binance.com:9443/');
    socketClient.setHandler('trade', (params)=>{
        socket.emit("trade", params);
    })
}

export default tradeMonitor;
