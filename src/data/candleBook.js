import spotPublicRequest from "../Services/candleBook";
const getCandleHistory = () => spotPublicRequest()
    .get('/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=10')
    .then((data) => console.log(data))
    .catch((error) => console.log(error.message));
export default getCandleHistory;

