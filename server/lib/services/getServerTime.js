
import { spotPublicRequest } from "../requestClient.js";

const getServerTime = () => spotPublicRequest()
    .get("/api/v3/time")
    .then(({data})=> data)
    .catch((err)=> console.log(err.message));

export default getServerTime;