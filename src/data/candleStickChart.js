
import React, { useEffect, useState } from "react";
import {socket, socketSpot} from "../API/WebSocket"
import { Loader } from "../components/loader";
import CandleStickChart from "./candleBook";


const CandleStickChartRaw = (params) => {

    return(
      
      <CandleStickChart interval={params.value.interval} limit={params.value.limit} symbol={params.value.pair}/>
    )
}
export default CandleStickChartRaw;