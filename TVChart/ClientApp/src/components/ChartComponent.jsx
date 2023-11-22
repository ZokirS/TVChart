import React, { Component } from 'react';
import {
  createChart,
  CrosshairMode,
  LastPriceAnimationMode,
  LineStyle
} from 'lightweight-charts';
import moment from 'moment';
export default class ChartComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedInterval: 4, // Default interval
      chartData: [], // Data fetched from the backend
    };
    this.candleSeries = React.createRef();
    this.rsiSeries = React.createRef();
    this.candleRef = React.createRef();
    this.rsiRef = React.createRef();
  }

  componentDidMount() {
    this.createChart();
    this.fetchData(this.state.selectedInterval);
  }

  createChart() {
    const chartOptions = {
      width: window.width,
      height: 250,
      crosshair: {
          vertLine: {
              width: 8,
              color: '#C3BCDB44',
              style: LineStyle.Solid,
              labelBackgroundColor: '#9B7DFF',
              visible: true,
              labelVisible: true
          },
          mode: CrosshairMode.Magnet,
          // Horizontal crosshair line (showing Price in Label)
          horzLine: {
              color: '#9B7DFF',
              labelBackgroundColor: '#9B7DFF',
              visible: true,
              labelVisible: true
          },
      },
      layout: {
          background: {
              type: 'solid',
              color: 'white'
          },
          textColor: 'black'
      },
      timeScale: {
          timeVisible: true,
          secondsVisible: false,
          minBarSpacing: 0.001,
      }
    }

    this.candleChart = createChart(this.candleRef.current, chartOptions);
    this.rsiChart = createChart(this.rsiRef.current, chartOptions)
    this.candleSeries = this.candleChart.addCandlestickSeries();
    this.rsiSeries = this.rsiChart.addLineSeries({lastPriceAnimation: LastPriceAnimationMode.Continuous})
  }

  fetchData() {
    // Replace this with your backend data fetching logic
    // Example: fetch data from an API
    fetch(`chart`)
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
    var candlesData = []
    var rsiData = []
    
    var chartEl = this.candleRef.current;
    var axisEl = this.rsiRef.current;
    var chartData = this.state.chartData;
    chartData.map(candle => {
        let time = moment(candle.openTime).utcOffset(0, true).valueOf() / 1000;
        candlesData.push({
            time: time,
            open: candle.open,
            high: candle.high,
            low: candle.low,
            close: candle.close
        })
        rsiData.push({
          time: time,
          value: candle.rsi
        })
      })
    this.candleSeries.setData(candlesData);
    this.rsiSeries.setData(rsiData);

    this.rsiSeries.createPriceLine({
      price: 70.0,
      color: 'green',
      lineWidth: 2,
      lineStyle: LineStyle.Dotted,
      axisLabelVisible: false
  })
  this.rsiSeries.createPriceLine({
      price: 30.0,
      color: 'green',
      lineWidth: 2,
      lineStyle: LineStyle.Dotted,
      axisLabelVisible: false
  })
  let isCrossHairMoving = false;
  this.candleChart.subscribeCrosshairMove(param => {
      if (!param.point) return;
      if (!param.time) return;
      if (isCrossHairMoving) return;

      isCrossHairMoving = true;
      this.rsiChart.setCrosshairPosition(param.point, param.time, this.rsiSeries);
     
      isCrossHairMoving = false;
  });

  this.rsiChart.subscribeCrosshairMove(param => {
      if (!param.point) return;
      if (!param.time) return;
      if (isCrossHairMoving) return;

      isCrossHairMoving = true;
      this.candleChart.setCrosshairPosition(param.point, param.time, this.candleSeries);
      isCrossHairMoving = false;
  });

  var isChartActive = false;
  var isAxisActive = false;
  chartEl.addEventListener("mousemove", () => {
      if (isChartActive) return;
      isChartActive = true;
      isAxisActive = false;
      this.candleChart.applyOptions({
          crosshair: {
              horzLine: {
                  visible: true,
                  labelVisible: true
              }
          }
      });
      this.rsiChart.applyOptions({
          crosshair: {
              horzLine: {
                  visible: false,
                  labelVisible: false
              }
          }
      });
  });

  axisEl.addEventListener("mousemove", () => {
      if (isAxisActive) return;
      isAxisActive = true;
      isChartActive = false;
      this.rsiChart.applyOptions({
          crosshair: {
              horzLine: {
                  visible: true,
                  labelVisible: true
              }
          }
      });
      this.candleChart.applyOptions({
          crosshair: {
              horzLine: {
                  visible: false,
                  labelVisible: false
              }
          }
      });
  });

  this.candleChart.timeScale().subscribeVisibleLogicalRangeChange(range => {
      this.rsiChart.timeScale().setVisibleLogicalRange(range)
  })
  this.rsiChart.timeScale().subscribeVisibleLogicalRangeChange(range => {
      this.candleChart.timeScale().setVisibleLogicalRange(range)
  })
  this.candleRef.current = chartEl
  this.rsiRef.current = axisEl
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
        {/* <label>
          Select Time Interval:
          <select value={this.state.selectedInterval} onChange={this.handleIntervalChange}>
            <option value="1">15m</option>
            <option value="2">1h</option>
            <option value="3">4h</option>
            <option value="4">1D</option>
            <option value="5">1W</option>
          </select>
        </label> */}
        <div ref={this.candleRef}></div>
        <div ref={this.rsiRef}></div>
      </div>
    );
  }
}

