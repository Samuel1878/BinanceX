import WebSocket from 'ws';
import logger from "./logger.js";
import dataLogger from './__dataTransfer.js';

class SocketClient{
    constructor(path,baseUrl){
        this.baseUrl = baseUrl || "wss://stream.binance.com/";
        this._path = path;
        this._createSocket();
        this._handlers = new Map();
    }
    _createSocket() {
        logger.info(`${this.baseUrl}${this._path}`);
        this._ws = new WebSocket(`${this.baseUrl}${this._path}`);

        this._ws.onopen = () => {
            logger.info("ws connected!");
        };
        this._ws.on("pong", ()=>{
            logger.debug("receieved pong from server");
        });
        this._ws.on("ping", ()=>{
            logger.debug("===========receieved ping from server");
            this._ws.pong();
        });
        this._ws.onclose = () => {
            logger.warn("ws closed");
        };
        this._ws.onerror = (err) => {
            logger.warn("ws error:where?:", err);
        };
        this._ws.onmessage = (msg) =>{
            try{
                const message = JSON.parse(msg.data);
                if (this.isMultiStream(message)) {
                 this._handlers.get(message.stream).forEach(cb=>cb(message));
                } else if (message.e && this._handlers.has(message.e)) {
                 this._handlers.get(message.e).forEach(cb => {
                    cb(message);
                });
                } else if(message.e == "24hrTicker"){
                 dataLogger.set("ticker", message);
                } else {
                    logger.warn("unknown Method", message)
                }
            } catch (e) {
                logger.warn("Parse message failed:", e);
            }
        };
        this.heartBeat();
    }
    isMultiStream(message) {
        return message.stream && this._handlers.has(message.stream);
      }
    heartBeat() {
            if (this._ws.readyState === WebSocket.OPEN) {
                this._ws.ping();
                logger.debug("ping server")
            }
  
    }
    setHandler(method, callback) {
        if (!this._handlers.has(method)){
            this._handlers.set(method, []);
        }
        this._handlers.get(method).push(callback);
    }
}
export default SocketClient;