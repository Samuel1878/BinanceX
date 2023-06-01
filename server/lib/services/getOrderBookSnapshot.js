import { spotPublicRequest } from "../requestClient.js";

const getOrderBookSnapshot = (symbol) => spotPublicRequest()
        .get(`/api/v1/depth?limit=100&symbol=${symbol}`)
        .then(({data})=> data);

export default getOrderBookSnapshot;