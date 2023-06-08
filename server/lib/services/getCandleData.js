import { spotPublicRequest } from "../requestClient.js";
import { candlelogger } from "../__dataTransfer.js";
import logger from "../logger.js";
const getCandleHistory = async(e, interval, limit,socket) => spotPublicRequest()
    .get( `/api/v3/klines?symbol=${e.toUpperCase()}&interval=${interval}&limit=${limit}`)
    .then((data)=> socket.emit("kline_book", {data}))
    .catch((err)=> console.log(err.message));

export default getCandleHistory;