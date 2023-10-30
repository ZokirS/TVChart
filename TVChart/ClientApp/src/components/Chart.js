import * as React from 'react';
import {
    createChart,
    CrosshairMode,
    LastPriceAnimationMode,
    LineStyle
} from 'lightweight-charts';
import moment from 'moment';


export class Chart extends React.Component {

    static displayName = Chart.name;

    constructor(props) {
        super(props);
        this.chart = null;
        this.state = {
            candles: [],
            loading: true
        };
    }

    componentDidMount() {
        this.populateChartData();
    }



    static renderCandlesChart(candles) {
        var chartEl = document.getElementById('chart');
        var axisEl = document.getElementById('axis');
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
                secondsVisible: true,
                minBarSpacing: 0.001,
            }
        }
        var chart = createChart(chartEl, chartOptions);
        var axis = createChart(axisEl, chartOptions);

        var barSeries = chart.addCandlestickSeries();
        var lineSeries = axis.addLineSeries({lastPriceAnimation: LastPriceAnimationMode.Continuous});
        
        let candleData = [];
        let rsiData = [];
        candles.map(candle => {
            let time = moment(candle.openTime).utcOffset(0, true).valueOf() / 1000;
            candleData.push({
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


        barSeries.setData(candleData);
        lineSeries.setData(rsiData);
        lineSeries.createPriceLine({
            price: 70.0,
            color: 'green',
            lineWidth: 2,
            lineStyle: LineStyle.Dotted,
            axisLabelVisible: false
        })
        lineSeries.createPriceLine({
            price: 30.0,
            color: 'green',
            lineWidth: 2,
            lineStyle: LineStyle.Dotted,
            axisLabelVisible: false
        })
        let isCrossHairMoving = false;
        chart.subscribeCrosshairMove(param => {
            if (!param.point) return;
            if (!param.time) return;
            if (isCrossHairMoving) return;

            isCrossHairMoving = true;
            axis.setCrosshairPosition(param.point, param.time, lineSeries);
           
            isCrossHairMoving = false;
        });

        axis.subscribeCrosshairMove(param => {
            if (!param.point) return;
            if (!param.time) return;
            if (isCrossHairMoving) return;

            isCrossHairMoving = true;
            chart.setCrosshairPosition(param.point, param.time, barSeries);
            isCrossHairMoving = false;
        });

        var isChartActive = false;
        var isAxisActive = false;
        chartEl.addEventListener("mousemove", () => {
            if (isChartActive) return;
            isChartActive = true;
            isAxisActive = false;
            chart.applyOptions({
                crosshair: {
                    horzLine: {
                        visible: true,
                        labelVisible: true
                    }
                }
            });
            axis.applyOptions({
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
            axis.applyOptions({
                crosshair: {
                    horzLine: {
                        visible: true,
                        labelVisible: true
                    }
                }
            });
            chart.applyOptions({
                crosshair: {
                    horzLine: {
                        visible: false,
                        labelVisible: false
                    }
                }
            });
        });

        chart.timeScale().subscribeVisibleLogicalRangeChange(range => {
            axis.timeScale().setVisibleLogicalRange(range)
        })
        axis.timeScale().subscribeVisibleLogicalRangeChange(range => {
            chart.timeScale().setVisibleLogicalRange(range)
        })
    }

    render() {
        this.state.loading ?
            <p> <em> Loading... </em></p>
            : Chart.renderCandlesChart(this.state.candles);
        return ( <div>
                    <div id = "chart" ></div> 
                    <div id = "axis" > </div>
                </div>
            );
    }
    async populateChartData() {
        const response = await fetch("chart", {
            method: 'GET'
        });
        const data = await response.json();
        this.setState({
            candles: data,
            loading: false
        })
    }

}

function generateLineData(minValue, maxValue, maxDailyGainLoss = 1000) {
    var res = [];
    var time = new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0));
    for (var i = 0; i < 500; ++i) {
        var previous = res.length > 0 ? res[res.length - 1] : {
            value: 0
        };
        var newValue = previous.value + ((Math.random() * maxDailyGainLoss * 2) - maxDailyGainLoss);

        res.push({
            time: time.getTime() / 1000,
            value: Math.max(minValue, Math.min(maxValue, newValue))
        });

        time.setUTCDate(time.getUTCDate() + 1);
    }

    return res;
}