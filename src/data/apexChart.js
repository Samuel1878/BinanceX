import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-stockcharts';
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
 
class DateTimeAxisStockChart extends Component {
	constructor(props) {
		super(props);
		this.state = { dataPoints1: [], dataPoints2: [], dataPoints3: [], isLoaded: false };
	  }
	 
	  componentDidMount() {
		//Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
		fetch("https://canvasjs.com/data/docs/ltcusd2018.json")
		  .then(res => res.json())
		  .then(
			(data) => {
			  var dps1 = [], dps2 = [], dps3 = [];
			  for (var i = 0; i < data.length; i++) {
				dps1.push({
				  x: new Date(data[i].date),
				  y: [
					Number(data[i].open),
					Number(data[i].high),
					Number(data[i].low),
					Number(data[i].close)
				  ],
                  color: data[i].open < data[i].close ? "green" : "red"
				});
				dps2.push({
                    x: new Date(data[i].date), 
                    y: Number(data[i].volume_usd),
                    color: data[i].open < data[i].close ? "green" : "red"
                });
				dps3.push({x: new Date(data[i].date), y: Number(data[i].close)});
			  }
			  this.setState({
				isLoaded: true,
				dataPoints1: dps1,
				dataPoints2: dps2,
				dataPoints3: dps3
			  });
			}
		  )
	  }
	 
	  render() {
		const options = {
            exportEnabled: false,
            backgroundColor: "transparent",
            theme: "light2",
            title:{
              text:""
            },
            charts: [{
              toolTip: {
                shared: true
              },
              axisX: {
                lineThickness: 5,
                tickLength: 0,
                labelFormatter: function(e) {
                  return "";
                },
                crosshair: {
                  enabled: true,
                  snapToDataPoint: true,
                  labelFormatter: function(e) {
                    return ""
                  }
                }
              },
              axisY2: {
                title: "LTC",
                prefix: "$"
              },
              legend: {
                verticalAlign: "top",
                horizontalAlign: "left"
              },
              data: [{
                name: "Price (in USD)",
                yValueFormatString: "$#,###.##",
                axisYType: "secondary",
                type: "candlestick",
                risingColor: "green",
                fallingColor: "red",
                dataPoints : this.state.dataPoints1
              }]
            },{
              height: 100,
              toolTip: {
                shared: true
              },
              axisX: {
                crosshair: {
                  enabled: true,
                  snapToDataPoint: false,
                }
              },
              axisY2: {
                prefix: "$",
                title: "LTC/EUR"
              },
              legend: {
                horizontalAlign: "left"
              },
              data: [{
                yValueFormatString: "$#,###.##",
                axisYType: "secondary",
                name: "LTC/USDT",
                dataPoints :this.state.dataPoints2
              }]
            }],
            navigator: {
              data: [{
                color: "grey",
                dataPoints: this.state.dataPoints3
              }],
              slider: {
                minimum: new Date("2018-05-01"),
                maximum: new Date("2018-07-01")
              }
            }
          }
		const containerProps = {
		  width: "100%",
		  height: "450px",
		  margin: "auto"
		};
		return (
		  <div> 
			  <h1>LTC</h1>
			  {
				// Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
				this.state.isLoaded && 
				<CanvasJSStockChart containerProps={containerProps} options = {options}
				  /* onRef = {ref => this.chart = ref} */
				/>
			  }
		  </div>
		);
	  }
  }

export default DateTimeAxisStockChart;