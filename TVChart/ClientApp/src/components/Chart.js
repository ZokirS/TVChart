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
                background: {
                  color: 'gray'
                },
                textColor: '#ffffff'
              }
        }
        this.chart = createChart('chartContainer', chartOptions);

        const barSeries = this.chart.addCandlestickSeries();
        let data = [];
        candles.map(candle => {
            data.push({
                time : moment(candle.time).format('YYYY-MM-DD'),
                open : candle.open,
                high: candle.high,
                low: candle.low,
                close: candle.close
            })
        })
        // set the data
        barSeries.setData(data);
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
        const response = await fetch("https://localhost:7120/api/chart", { method: 'GET'});
        const data = await response.json();
        this.setState({candles: data, loading: false})
    }

}