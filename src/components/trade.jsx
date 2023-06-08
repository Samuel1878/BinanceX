import { useEffect, useState } from "react";
import {socket, socketSpot} from "../API/WebSocket";
import { Loader } from "./loader";

import CandleStickChart from "../data/candleStickChart";

function Trade() {
    const [pair, setPair] = useState("BTCUSDT");
    const [coin, setCoin] = useState("BTC");
    const [interval, setinterval] = useState("1d");
    const [limit, setLimit] = useState(100)
    const [stream, setStream] = useState();
    const [snapShot, setSnapShot] = useState(null);
    const [ticker, setTicker] = useState(null);
    const [trade, setTrade] = useState(null);
    const [tradeBook, setTradeBook] = useState([]);
    const [currentPrice, setCurrent] = useState("");

//candleStick

//socketio connection
    useEffect(()=>{
        socketSpot.connect();
        socketSpot.on("connect", () =>{
            console.log("socketSpot connected");
        });
        socketSpot.emit("Spot_OrderBook_Req", pair,()=>{
            console.log("spotEmitted OrderBook emitted");
        });
        socketSpot.emit("ticker_trade_req", pair,()=>{
            console.log("ticker_req emitted");
        });
        socketSpot.on("Spot_OrderBook_SnapShot", (data)=>{
            setSnapShot(data);
        });
        socketSpot.emit("kline_req", pair, interval, limit, ()=>{
            console.log("kline emiited");
        })
       
    },[pair]);
    //socketio orderbook stream
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
                return;
            }  
        }
    },[stream]);
//socketio Ticker stream
    socketSpot.off("ticker").on("ticker", (data)=>{
        setTicker(data);
    });
    const TickerBook = new Map([]);
    useEffect(()=>{
        if(ticker) {
            setCurrent(ticker.c);
            var last_price = "";
            if (TickerBook.has("last_price")){
                last_price = TickerBook.get("last_price");
                TickerBook.set("current", currentPrice);
                return;
            } else if(TickerBook.has("current")) {
                last_price = TickerBook.get("current");
                TickerBook.set("last_price", last_price);
                TickerBook.set("current", currentPrice);
                return;
            } else {
                TickerBook.set("last_price", currentPrice);
            }
        }
    },[ticker]);
    //socket io trade book
    socketSpot.off('trade').on('trade', (data)=>{
        if(data) {
            setTrade(data);
            return
        }
        setTrade("");
    })
    
    useEffect(()=>{
        if(trade) {
            if(tradeBook.length >= 34) {
                tradeBook.pop();
                tradeBook.unshift(trade);
                return;
            } else if(tradeBook.length >= 0) {
                tradeBook.unshift(trade);
                return;
            } else{
                setTradeBook([trade]);
            }
        }
    },[trade])
      
    if (!snapShot && !ticker) {
        return (<Loader/>)
    }

    return <div id="spotTrade">
    <header>
        <div className="pair">
            <i className="fa-solid fa-bars"></i>
            <h3> {coin} /USDT </h3>
        </div>
        <div className="_24hTicker">
                <div className="tickerBox">
                    <h2>
                        {parseFloat(currentPrice).toFixed(2)}
                    </h2>
                    <h3>${parseFloat(currentPrice).toFixed(2)}</h3>
                </div>
                <div className="tickerBox">
                    <h4>24h Change</h4>
                    <div>
                        <p style={{color:`${(ticker?.p>0)?`var(--bull)`:`var(--bear)` }`}} >{parseFloat(ticker?.p).toFixed(2)}</p>
                        <span style={{color:`${(ticker?.P>0)?`var(--bull)`:`var(--bear)` }`}}>{ticker?.P} %</span>
                    </div>

                </div>
                <div className="tickerBox">
                    <h4>
                        24h High
                    </h4>
                    <p>{parseFloat(ticker?.h).toFixed(2)}</p>
                </div>
                <div className="tickerBox">
                    <h4>
                        24h Low
                    </h4>
                    <p>{parseFloat(ticker?.l).toFixed(2)}</p>

                </div>
                <div className="tickerBox">
                    <h4>
                        24h Volume({coin})
                    </h4>
                    <p>{parseFloat(ticker?.v).toFixed(2)}</p>
                </div>
                <div className="tickerBox">
                    <h4>
                        24h Volume(USDT)
                    </h4>
                    <p>{parseFloat(ticker?.c * ticker?.v).toFixed(2)}</p>
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
                        Amount({coin})
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
                <div>{parseFloat(currentPrice).toFixed(2)}</div>
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
            <div id="candleStickChart">
            <CandleStickChart value={pair}/>


            </div>
        </section>
        <aside id="tradeBook">
            <h4>Market Trades</h4>
            <table>
                <thead>
                <tr>
                    <th>
                        Price(USDT)
                    </th>
                    <th>
                        Amount({coin})
                    </th>
                    <th>
                        Time
                    </th>
                </tr>
                </thead>
                <tbody>
                {(tradeBook.length>25)?
                    tradeBook.map((e)=>(
                        <tr>
                            <td style={{color:`${e.m?"var(--bull)":"var(--bear)"}`}}>{parseFloat(e.p).toFixed(2)}</td>
                            <td>{parseFloat(e.q).toFixed(7)}</td>
                            <td>{new Date(e.T).toLocaleString().slice(10,18)}</td>
                        </tr>)
                    ): <Loader/>
                }

                </tbody>
                
    
            </table>

        </aside>

    </main>
    <footer>

    </footer>
    </div>
}
export default Trade