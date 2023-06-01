import {io} from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://localhost:3000';
const opts = {
    transports: ["websocket"],
    autoConnect: false,
  };
export const socket = io(URL, opts);
socket.on("connect", (data)=>{
    console.log("Connected to the server from main route");
})
export const socketSpot = io("http://localhost:3000/spot" , opts);
