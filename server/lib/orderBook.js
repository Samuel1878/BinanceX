import logger from "./logger.js";
import processOrderBookUpdate from "./helper/processOrderBookUpdate.js";
import processOrderBookSnapshot from "./helper/processOrderBookSnapshot.js";

class OrderBook {
    constructor(symbol) {
        this._data = {
            symbol,
            ask: [],
            bid: [],
            lastUpdateId: "",
        }
    }
    getOrderbook () {
        return this._data;
    }
    getSymbol () {
        return this._data.symbol;
    }
    getBestBid() {
        return this._data.bid[0][0];
    }
    getBestAsk() {
        return this._data.ask[0][0] ;
    }
    getBidVolume () {
        return this._data.bid[0][1];
    }
    getAskVolume () {
        return this._data.ask[0][1];
         
    }
    justInitialized() {
        return this._data.ask.length === 0;
    }
    updateLastUpdateId(id) {
        this._data.lastUpdateId = id;
    }
    updateOrderbook(ask, bid) {
        this._data = processOrderBookUpdate(this._data, bid, ask);
    }
    updateOrderBookWithSnapshot(snapshot) {
        this._data = processOrderBookSnapshot(this._data, snapshot);
    }
    inspect() {
        setInterval(() => {
            logger.info("orderbook:", this._data);
        }, 4000);
    }
    best_price() {
            if (this._data == 0 || this._data.ask.length == 0) {
                logger.debug("waiting for warming up");
                return {}
            }
            logger.tip("BestPrice run onetime")
            let av = this.getAskVolume();
            let ap = this.getBestAsk();
            let bv = this.getBidVolume();
            let bp = this.getBestBid();
    return {"time": new Date().toISOString(), av : av, ap: ap, bv: bv, bp:bp}      
    }
    
}
export default OrderBook;