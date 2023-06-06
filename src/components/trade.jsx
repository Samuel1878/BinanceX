import { useEffect, useState } from "react";
import {socket, socketSpot} from "../API/WebSocket";
function Trade() {
    const [pair, setPair] = useState("BTCUSDT");
    const [stream, setStream] = useState();
    const [snapShot, setSnapShot] = useState(null);
    
    useEffect(()=>{
        socketSpot.connect();
        socketSpot.on("connect", () =>{
            console.log("socketSpot connected");
        });
        socketSpot.emit("Spot_OrderBook_Req", pair,()=>{
            console.log("spotEmitted OrderBook emitted");
        });
        socketSpot.on("Spot_OrderBook_SnapShot", (data)=>{
            console.log(data);
            setSnapShot(data);
        });
       
    },[])
        socketSpot.off("asks_bidsStream").on("asks_bidsStream", (data)=>{
            if (data){
                setStream(data);
                return
            }else  {
                setStream("");
            }
        });
    useEffect(()=>{
        if(stream) {
            const {ap, av , bp, bv} =  stream
            if(ap && av)  {
                const askStream = [ap, av];
                const bidStream = [bp, bv];
                snapShot?.asks.unshift(askStream);
                snapShot?.asks.pop();
                snapShot?.bids.unshift(bidStream);
                snapShot?.bids.pop();
                console.log(snapShot.asks.length);
            }if (ap === "undefined" || "null") {
                console.log(ap + ":" + av)
            } else {
                
            }
            
        }
        
    },[stream])
      
  
   

    return <div id="spotTrade">
    <header>
        <div className="pair">
            <i className="fa-solid fa-bars"></i>
            <h3> {pair} </h3>
        </div>
        <div className="_24hTicker">
                <div className="tickerBox">
                    <h4>
                        Current Price
                    </h4>
                </div>
                <div className="tickerBox">
                    <h4>
                        24h Change
                    </h4>

                </div>
                <div className="tickerBox">
                    <h4>
                        24h High
                    </h4>
                </div>
                <div className="tickerBox">
                    <h4>
                        24h Low
                    </h4>

                </div>
                <div className="tickerBox">
                    <h4>
                        24h Volume
                    </h4>
                </div>
                <div className="tickerBox">
                    <h4>
                        24h Volume(USDT)
                    </h4>
                </div>
        </div>
    </header>
    <main>
        <article id="orderBook">
            <table>
                <tr>
                    <th>
                        Price(USDT)
                    </th>
                    <th>
                        Amount(`${pair}`)
                    </th>
                    <th>
                        Total(USDT)
                    </th>
                </tr>
            {snapShot?.asks.map((ask)=>(
            <tr id="sellOrder">
                <td>{parseFloat(ask[0]).toFixed(1)}</td>
                <td>{ask[1].slice(0,7)}</td>
                <td>{parseFloat(ask[0]*ask[1]).toFixed(3)}</td>
                <div id="sellDepth" style={{width:`${(ask[1]/10)*100}%`}}></div>
            </tr>)
            )}
                <div>Current Price Change</div>
            {snapShot?.bids.map((bid)=>(
                <tr id="buyOrder">
                    <td>{parseFloat(bid[0]).toFixed(1)}</td>
                    <td>{(bid[1]).slice(0,7)}</td>
                    <td>{parseFloat(bid[0] * bid[1]).toFixed(3) }</td>
                    <div id="buyDepth" style={{width:`${(bid[1]/10)*100}%`}}></div>
                </tr>
            ))}
            </table>
        </article>
        <section>

        </section>
        <aside id="tradeBook">

        </aside>

    </main>
    </div>
}
export default Trade