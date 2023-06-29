import { useState } from "react";
import EngineComponent from "../data/tradingEngineComponent";
import "../Ani.css"
const TradeEngine = () => {
    const [toggleRow, setToggleRow] = useState("spot");
    const [innerToggle, setInnerToggle] = useState("limit")


    return (
        <div id="tradingEngine">
            <div className="toggleRow">
                <button onClick={()=>setToggleRow("spot")}>
                    Spot
                </button>
                <button onClick={()=>setToggleRow("cross")}>
                    Cross 3x
                </button>
            </div>
            {
                (toggleRow==="spot")?(
                <article>
                    <div className="toggleRowInner">
                        <button onClick={()=>setInnerToggle("limit")}>
                            Limit
                        </button>
                        <button onClick={()=>setInnerToggle("market")}>
                            Market
                        </button>
                        <button onClick={()=>setInnerToggle("stop-limit")}>
                            Stop-limit
                        </button>
                    </div>
                    <div id="EnginePart">
                        <EngineComponent value={innerToggle}/>
                    </div>

                </article>)
                :
                <section>

                </section>
            }
            
        </div>
    )
}
export default TradeEngine