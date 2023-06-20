import { Component } from "react";
import {socket, socketSpot} from "../API/WebSocket"
import spotPublicRequest from "../Services/candleBook";
import CanvasJSReact from '@canvasjs/react-stockcharts';
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
class CandleStickChart extends Component {
    constructor(props){
        super(props);
        this.symbol = props.symbol;
        this.interval = props.interval;
        this.limit = props.limit;
        this.state = {
            series:[],
            brushSeries:[],
            naviSeries:[],
            isLoaded:false,
            errorMsg: "",
        }
    }   

    componentDidMount(){
        spotPublicRequest()
        .get(`/api/v3/klines?symbol=${this.symbol}&interval=${this.interval}&limit=${this.limit}`)
        .then((res) => {
            console.log(this.symbol, this.interval, this.limit)
            let coinData = res.data;
            this.setState({
                errorMsg:''
            });
            if (coinData[0]==undefined){
                this.setState({
                    errorMsg: 'No data available for the time being'
                });return
            };
            //Format data 
            coinData.forEach((d)=>{
                d[1] = Math.round(d[1] * 10000)/10000;
                d[2] = Math.round(d[2] * 10000)/10000;
                d[3] = Math.round(d[3] * 10000)/10000;
                d[4] = Math.round(d[4] * 10000)/10000;
                d[5] = Math.round(d[5] * 10000)/10000;
            });
            let candleStickFormat = coinData.map((d)=>({
                x: new Date(d[0]),
                y:[d[1], d[2],d[3],d[4]],
                color:d[1] < d[4]? "rgb(107,226,71)" : "rgb(180, 51,65)"
            }));
            let candleBarFormat = coinData.map((d)=>({
                x: new Date(d[0]),
                y: d[5],
                color:d[1] < d[4]? "rgb(107,226,71)" : "rgb(180, 51,65)"
            }));
            let naviStickFormat = coinData.map((d)=>({
                x: new Date(d[0]),
                y: d[4]
            }));
            socketSpot.off("kline").on("kline", (data)=>{
                this.latestTime = data.k.t;
                console.log(this.latestTime);
                candleStickFormat.push({
                    x:new Date(data.k.t),
                    y:[
                        Number(data.k.o),
                        Number(data.k.h),
                        Number(data.k.l),
                        Number(data.k.c)

                    ],
                    color:data.k.o < data.k.c?"rgb(107,226,71)":"rgb(180, 51,65)"
                });
                candleBarFormat.push({
                    x:new Date(data.k.t),
                    y:Number(data.k.v),
                    color:data.k.o < data.k.c?"rgb(107,226,71)":"rgb(180, 51,65)"
                });
                naviStickFormat.push({
                    x:new Date(data.k.t),
                    y:Number(data.k.c)
                });
            });
            this.setState({
                isLoaded: true,
                series:candleStickFormat ,
                brushSeries:candleBarFormat,
                naviSeries:naviStickFormat
            });
        })
        .catch((error) => this.setState({
            errorMsg: error.message
        }));


    }
    render() {
        const options = {
            exportEnabled: false,
            backgroundColor: "transparent",
            rangeSelector: {
                enabled:false
            },
            theme: "dark2",
            title:{
              text:""
            },
            charts: [{
              toolTip: {
                enabled:false,
                shared: true,
                updated:(e)=>{
                    console.log(e)
                }

              },
              axisX: {
                lineThickness: 5,
                tickLength: 0,
                labelFormatter: function(e) {
                  return "";
                },
              },
              axisY2: {
                title: this.symbol,
                prefix: "$",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    labelFormatter: function(e) {
                      return ""
                    }
                  }
              },
              /*legend: {
                verticalAlign: "top",
                horizontalAlign: "left"
              },*/
              data: [{
                name: "Price (in USD)",
                yValueFormatString: "$#,###.##",
                axisYType: "secondary",
                type: "candlestick",
                risingColor: "rgb(107,226,71)",
                fallingColor: "rgb(180, 51,65)",
                dataPoints : this.state.series
              }]
            },{
              height: 150,
              toolTip: {
                enabled:false,
                shared: true,
                
              },
              axisX: {
                crosshair: {
                  enabled: false,
                  
                }
              },
              axisY2: {
                prefix: "$",
                title: this.symbol,
                crosshair:{
                    enabled:true,
                    snapToDataPoint: true,
                }
              },
              //legend: {
              //  horizontalAlign: "left"
             // },
              data: [{
                yValueFormatString: "$#,###.##",
                axisYType: "secondary",
                name: this.symbol,
                dataPoints :this.state.brushSeries
              }]
            }],
            navigator: {
              data: [{
                color: "rgb(244,207,80)",
                dataPoints: this.state.naviSeries
              }],
              slider: {
                minimum: new Date(this.latestTime - 3600000),
                maximum: new Date(this.latestTime)
              }
            }
        }
        const containerstyle = {
            width: "100%",
		    height: "500px",
		    margin: "auto",
            background: 'transparent',
            color: 'var(--textLow1)',
            fontSize: '12px',
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            }
        }
        
        return(
            <div>
              {
                this.state.isLoaded &&
                <CanvasJSStockChart containerProps={containerstyle} options={options}/>
              }
            </div>
        )
    }

} 




export default CandleStickChart;

