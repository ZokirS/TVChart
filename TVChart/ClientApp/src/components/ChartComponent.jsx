import React, { Component } from 'react';
import { createChart } from 'lightweight-charts';
import moment from 'moment';
export default class ChartComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedInterval: 4, // Default interval
      chartData: [], // Data fetched from the backend
    };
    this.priceSeries = React.createRef();
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.createChart();
    this.fetchData(this.state.selectedInterval);
  }

  createChart() {
    this.chart = createChart(this.chartRef.current, { width: 800, height: 400 });
    this.priceSeries = this.chart.addCandlestickSeries();

    // You can customize the chart appearance and settings here
    // For example: this.priceSeries.applyOptions({ color: 'blue' });
  }

  fetchData(interval) {
    // Replace this with your backend data fetching logic
    // Example: fetch data from an API
    fetch(`chart?timeframeId=${interval}`)
      .then((response) => response.json())
      .then((data) => {
        this.state.chartData = data ;
        this.updateChart();
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  updateChart() {
    var candles = []
    var chartData = this.state.chartData;
    chartData.map(candle => {
        let time = moment(candle.openTime).utcOffset(0, true).valueOf() / 1000;
        candles.push({
            time: time,
            open: candle.open,
            high: candle.high,
            low: candle.low,
            close: candle.close
        })})
    this.priceSeries.setData(candles);
  }

  handleIntervalChange = (event) => {
    const newInterval = event.target.value;
    this.setState({ selectedInterval: newInterval }, () => {
      this.fetchData(newInterval);
    });
  };

  render() {
    return (
      <div>
        <label>
          Select Time Interval:
          <select value={this.state.selectedInterval} onChange={this.handleIntervalChange}>
            <option value="2">1h</option>
            <option value="4">1D</option>
            <option value="5">1W</option>
          </select>
        </label>
        <div ref={this.chartRef}></div>
      </div>
    );
  }
}

