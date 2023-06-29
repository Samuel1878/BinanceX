import React from "react";
import {useState} from "react";
import ToggleListMenu from "../libs/extendEngine";

const EngineComponent = ({value}) => {
    const [avblAssest, setAvblAssest] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);

    if(value==="market") {
        return (
            <div id="marketEngineContainer" className="engines">
                <div className="marketBuyEngine">
                    <form>
                        <div>
                            <span className="avblAssest">
                                Avbl-{()=> avblAssest || "USDT"}
                            </span>
                            <input placeholder="price" disabled></input>
                            <label>BTC</label>
                        </div>
                        <div>
                            <input></input>
                            <ToggleListMenu value={{selectedIndex, setSelectedIndex}}/>
                        </div>
                    </form>
                </div>
                <div className="marketSellEngine">
                    <form>
                        <div>
                            <span className="avblAssest">
                                Avbl-{()=> avblAssest || "USDT"}
                            </span>
                            <input placeholder="price" disabled></input>
                            <label>BTC</label>
                        </div>
                        <div>
                            <input></input>
                            <ToggleListMenu/>
                        </div>
                    </form>

                </div>
            </div>
        )
    } else if(value==="stop-limit"){
        return(
        <div id="stop-limitEngineContainer" className="engines">stop-limit</div>)
    } else {
        return(
            <div id="limitEngineContainer" className="engines">
                limit
            </div>
        )
    }
}
export default EngineComponent;