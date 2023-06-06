import { spotPublicRequest } from "../requestClient.js";

const getOrderBookSnapshot = (symbol) => spotPublicRequest()
        .get(`/api/v1/depth?limit=20&symbol=${symbol}`)
        .then(({data})=> data);

export default getOrderBookSnapshot;