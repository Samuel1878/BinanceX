import { useEffect, useState } from "react";
import "../Ani.css";
import {Loader} from "./loader";
import tradingData from "../assets/tradingData.png";
import {socket} from "../API/WebSocket";
function Market() {
const [cryptos, setCryptos] = useState({});
    socket.connect();


    return <div className="Markets_Overview">
        <section>
            <header>
                <div>
                    <h2>Markets Overview</h2>
                    <p>All price information is in<span>USD</span></p>
                </div>
                <div id="trading_data">
                     <img src={tradingData} alt="trading_data"/>
                     <h3>Trading Data</h3>
                </div>
            </header>
            <main className="dataBoxContainer">
                <div className="dataBox" id="highLight_Coin">
                    <h5>Highlight Coin</h5>

                </div>
                <div className="dataBox" id="newListings">
                    <h5>New Listing</h5>
                    
                </div>
                <div className="dataBox" id="topGainerCoins">
                    <h5>Top Gainer Coin</h5>
                </div>
                <div className="dataBox" id="topVolumeCoins">
                    <h5>Top Volume Coin</h5>
                    
                </div>

            </main>
            
        </section>
    </div>
}

export default Market;