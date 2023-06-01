//import crypto from "crypto";
import getRequestInstance from "./helper/getRequestInstance.js";

export const publicRequest = () => getRequestInstance({
    headers:{
        "content-type" : "application/json",
    },
});
export const spotPublicRequest = () => getRequestInstance({
    baseURL: "https://api.binance.com",
    headers: {
        "content-type" : "application/json",
    },
});

const buildQueryString = (q) => (q ? `?${Object.keys(q)
    .map((k)=> `${encodeURIComponent(k)}= ${encodeURIComponent(q[k])}`)
    .join("&")}`: "");




