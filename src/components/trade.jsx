import { useEffect, useState } from "react";
import {socket, socketSpot} from "../API/WebSocket";
function Trade() {
    const [pair, setPair] = useState("BTCUSDT");
    const [stream, setStream] = useState();
    const [snapShot, setSnapShot] = useState();
    
    useEffect(()=>{
        socketSpot.connect();
        socketSpot.on("connect", () =>{
            console.log("socketSpot connected");
        });
        socketSpot.on("Spot_OrderBook_SnapShot", (data)=>{
            console.log(data);
            setSnapShot(data)
        });
     
        
        socketSpot.emit("Spot_OrderBook_Req", pair,()=>{
            console.log("spotEmitted OrderBook emitted");
        });
       
    },[])
        socketSpot.off("asks_bidsStream").on("asks_bidsStream", (data)=>{
            console.log(data);
            if (data){
                setStream(data);
                return
            }else  {
                setStream("");
            }
        });
      
  
   

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
        <article>
            <table>
                <tr>
                    <th>
                        Price(USDT)
                    </th>
                    <th>
                        Amount<span>BTC</span>
                    </th>
                    <th>
                        Total
                    </th>
                </tr>
                <tr id="sellOrder">
                    <td>13123123</td>
                    <td>13123123</td>
                    <td>13123123</td>
                </tr>
                <div>Current Price Change</div>
                <tr id="buyOrder">
                    <td>123123123</td>
                    <td>13123123</td>
                    <td>13123123</td>
                </tr>

            </table>
        </article>
        <section>

        </section>
        <aside>

        </aside>

    </main>
    </div>
}
export default Trade