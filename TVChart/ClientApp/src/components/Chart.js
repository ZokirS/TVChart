import * as React from 'react';
import { createChart, CrosshairMode, LineStyle } from 'lightweight-charts';
import moment from 'moment';


export class Chart extends React.Component {
    
    static displayName = Chart.name;

    constructor(props) {
      super(props);
      this.chart = null;
      this.state = { candles: [], loading: true };
    }

    componentDidMount() {
        this.populateChartData();
    }

   
    
    static renderCandlesChart(candles){
        const chartOptions = {
            width: window.width,
            height: 500,
            crosshair: {
                // Change mode from default 'magnet' to 'normal'.
                // Allows the crosshair to move freely without snapping to datapoints
                mode: CrosshairMode.Normal,
        
                // Vertical crosshair line (showing Date in Label)
                vertLine: {
                    width: 8,
                    color: '#C3BCDB44',
                    style: LineStyle.Solid,
                    labelBackgroundColor: '#9B7DFF',
                },
        
                // Horizontal crosshair line (showing Price in Label)
                horzLine: {
                    color: '#9B7DFF',
                    labelBackgroundColor: '#9B7DFF',
                },
            },
            layout: {
                background: { type: 'solid', color: 'white' } ,
                textColor: 'black'
              },
              timeScale: {
                visible: true,
                timeVisible: true,
                secondsVisible: true,
            }
        }
        this.chart = createChart('chartContainer', chartOptions);

        const barSeries = this.chart.addCandlestickSeries();
        const rsiLine = this.chart.addLineSeries({
            title: 'second',
            priceFormat: {
                minMove: 1,
                precision: 0,
            },
            color: '#ff0000',
            pane: 1
        });
        let candleData = [];
        let rsiData = [];
        candles.map(candle => {
            let time = moment(candle.openTime).utcOffset(0, true).valueOf() / 1000;
            candleData.push({
                time : time,
                open : candle.open,
                high: candle.high,
                low: candle.low,
                close: candle.close
            })
            rsiData.push({
                time: time,
                value: candle.rsi
            })
        })

        // set the data
        barSeries.setData(candleData);
        rsiLine.setData(generateLineData(0, 100, 20));
    }

	render() {
        let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : Chart.renderCandlesChart(this.state.candles);
		return (
           
			<div id='chartContainer'>{contents}</div>
		);
	}
    async populateChartData(){
        const response = await fetch("chart", { method: 'GET'});
        const data = await response.json();
        this.setState({candles: data, loading: false})
    }
     
}
function generateLineData(minValue, maxValue, maxDailyGainLoss = 1000) {
    var res = [];
    var time = new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0));
    for (var i = 0; i < 500; ++i) {
        var previous = res.length > 0 ? res[res.length - 1] : { value: 0 };
        var newValue = previous.value + ((Math.random() * maxDailyGainLoss * 2) - maxDailyGainLoss);

        res.push({
            time: time.getTime() / 1000,
            value: Math.max(minValue, Math.min(maxValue, newValue))
        });

        time.setUTCDate(time.getUTCDate() + 1);
    }

    return res;
}