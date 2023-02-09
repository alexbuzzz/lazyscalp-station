<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { createChart } from 'lightweight-charts'
import axios from 'axios'

const props = defineProps({
  chartDataParams: {},
  autosize: {
    default: true,
  },
  chartOptions: {},
  seriesOptions: {},
  volumeOptions: {},
  timeScaleOptions: {},
  priceScaleOptions: {},
})

let series
let volume
let chart
let connection = null
let pongInterval = null

const chartData = ref({
  kline: [],
  vol: [],
})

const chartContainer = ref()

// Auto resizes the chart when the browser window is resized.
const resizeHandler = () => {
  if (!chart || !chartContainer.value) return
  const dimensions = chartContainer.value.getBoundingClientRect()
  chart.resize(dimensions.width, dimensions.height)
}

// CREATE =================================================
const handleChart = async (mode, tic, int, lim) => {
  // STOP

  if (mode === 'close') {
    connection.close()
    connection = null
    clearInterval(pongInterval)
    chartData.value.kline.length = 0
    chartData.value.vol.length = 0

    chart.removeSeries(series)
    chart.removeSeries(volume)

    if (chart) {
      chart.remove()
      chart = null
    }
    if (series) {
      series = null
    }
    if (volume) {
      volume = null
    }
    window.removeEventListener('resize', resizeHandler)
  }

  // CLEAR
  if (mode === 'update') {
    connection.close()
    connection = null
    clearInterval(pongInterval)
    chartData.value.kline.length = 0
    chartData.value.vol.length = 0

    chart.removeSeries(series)
    chart.removeSeries(volume)
  }

  // START
  if (mode === 'start') {
    chart = createChart(chartContainer.value, props.chartOptions)

    if (props.priceScaleOptions) {
      chart.priceScale().applyOptions(props.priceScaleOptions)
    }

    if (props.timeScaleOptions) {
      chart.timeScale().applyOptions(props.timeScaleOptions)
    }

    if (props.autosize) {
      window.addEventListener('resize', resizeHandler)
    }
  }

  // START OR UPDATE
  if (mode === 'start' || mode === 'update') {
    // Get kline from API

    const res = await axios.get(
      `https://fapi.binance.com/fapi/v1/klines?symbol=${tic.toUpperCase()}&interval=${int}&limit=${lim}`
    )

    res.data.forEach((element, index, array) => {
      const date = element[0] / 1000

      // remove last candle to prevent duplicate
      if (index !== array.length - 1) {
        const klineFormatted = {
          time: date,
          open: element[1],
          high: element[2],
          low: element[3],
          close: element[4],
        }

        const volFormatted = {
          time: date,
          value: element[7],
          color: 'rgba(50, 50, 61, 0.5)',
        }

        chartData.value.kline.push(klineFormatted)
        chartData.value.vol.push(volFormatted)
      }
    })

    // Draw fresh candles from websocket
    const connectionLink = `wss://fstream.binance.com/stream?streams=${tic.toLowerCase()}@kline_${int}`

    connection = new WebSocket(connectionLink)

    connection.onopen = () => {
      let lineUp
      let lineDown

      connection.onmessage = (data) => {
        if (data.data === 'ping') {
          connection.send('pong')
        }

        const parsedData = JSON.parse(data.data)

        if (parsedData.data !== undefined) {
          const {
            k: {
              T: startTime,
              o: open,
              c: close,
              h: high,
              l: low,
              q: volInCurrency,
            },
          } = parsedData.data

          series.update({
            open: parseFloat(open),
            close: parseFloat(close),
            high: parseFloat(high),
            low: parseFloat(low),
            time: startTime / 1000,
          })

          volume.update({
            value: parseFloat(volInCurrency),
            color: 'rgba(50, 50, 61, 0.8)',
            time: startTime / 1000,
          })

          // Price line 3% up
          const price3PercUp = (100 * parseFloat(close)) / 97

          let highMeasureLine = {
            price: price3PercUp,
            color: 'rgba(150, 150, 150, 0.2)',
            lineWidth: 2,
            lineStyle: 2,
            axisLabelVisible: false,
          }

          if (!lineUp) {
            lineUp = series.createPriceLine(highMeasureLine)
          } else {
            highMeasureLine.price = price3PercUp
            series.removePriceLine(lineUp)
            lineUp = series.createPriceLine(highMeasureLine)
          }

          // Price line 3% down
          const price3PercDown = (100 * parseFloat(close)) / 103

          let lowMeasureLine = {
            price: price3PercDown,
            color: 'rgba(150, 150, 150, 0.2)',
            lineWidth: 2,
            lineStyle: 2,
            axisLabelVisible: false,
          }

          if (!lineDown) {
            lineDown = series.createPriceLine(lowMeasureLine)
          } else {
            lowMeasureLine.price = price3PercDown
            series.removePriceLine(lineDown)
            lineDown = series.createPriceLine(lowMeasureLine)
          }
        }
      }
    }

    // Apply data to the chart
    series = chart.addCandlestickSeries(props.seriesOptions)
    series.setData(chartData.value.kline)
    volume = chart.addHistogramSeries(props.volumeOptions)
    volume.setData(chartData.value.vol)

    // Draw levels on chart
    let tempLevels1h
    let tempLevels4h
    let tempLevels1d

    const drawLevels = async () => {
      try {
        const response = await fetch('http://127.0.0.1:2204')
        const data = await response.json()

        if (
          props.chartDataParams.interval !== '1d' &&
          props.chartDataParams.interval !== '4h'
        ) {
          // Remove old lines 1h
          if (tempLevels1h != null) {
            tempLevels1h.forEach((element) => {
              series.removePriceLine(element)
            })
          }

          // Create lines 1h
          const lines1h = data.oneHour[props.chartDataParams.ticker]
          if (lines1h !== undefined) {
            tempLevels1h = lines1h

            lines1h.forEach((element) => {
              let levelsLine1h = {
                price: element,
                color: '#333333',
                lineWidth: 1,
                lineStyle: 0,
                axisLabelVisible: false,
                title: '1h',
              }

              series.createPriceLine(levelsLine1h)
            })
          }
        }

        if (props.chartDataParams.interval !== '1d') {
          // Remove old lines 4h
          if (tempLevels4h != null) {
            tempLevels4h.forEach((element) => {
              series.removePriceLine(element)
            })
          }

          // Create lines 4h
          const lines4h = data.fourHours[props.chartDataParams.ticker]
          if (lines4h !== undefined) {
            tempLevels4h = lines4h

            lines4h.forEach((element) => {
              let levelsLine4h = {
                price: element,
                color: 'rgba(240,116,39,0.5)',
                lineWidth: 1,
                lineStyle: 0,
                axisLabelVisible: true,
                title: '4h',
              }

              series.createPriceLine(levelsLine4h)
            })
          }
        }

        // Remove old lines 1d
        if (tempLevels1d != null) {
          tempLevels1d.forEach((element) => {
            series.removePriceLine(element)
          })
        }

        // Create lines 1d
        const lines1d = data.oneDay[props.chartDataParams.ticker]
        if (lines1d !== undefined) {
          tempLevels1d = lines1d

          lines1d.forEach((element) => {
            let levelsLine1d = {
              price: element,
              color: 'rgba(146,39,36,0.5)',
              lineWidth: 1,
              lineStyle: 0,
              axisLabelVisible: true,
              title: '1d',
            }

            series.createPriceLine(levelsLine1d)
          })
        }
      } catch (error) {
        console.error(error)
      }
    }

    drawLevels()
    setInterval(drawLevels, 1000 * 60)
  }
}

onMounted(async () => {
  await handleChart(
    'start',
    props.chartDataParams.ticker,
    props.chartDataParams.interval,
    props.chartDataParams.candlesLimit
  )
})

onUnmounted(() => {
  handleChart('close')
})

// WARCHERS
watch(
  () => props.autosize,
  (enabled) => {
    if (!enabled) {
      window.removeEventListener('resize', resizeHandler)
      return
    }
    window.addEventListener('resize', resizeHandler)
  }
)

watch(
  () => props.chartDataParams.interval,
  async () => {
    await handleChart(
      'update',
      props.chartDataParams.ticker,
      props.chartDataParams.interval,
      props.chartDataParams.candlesLimit
    )
  }
)

watch(
  () => props.chartDataParams.ticker,
  async () => {
    await handleChart(
      'update',
      props.chartDataParams.ticker,
      props.chartDataParams.interval,
      props.chartDataParams.candlesLimit
    )
  }
)

watch(
  () => props.chartOptions,
  (newOptions) => {
    if (!chart) return
    chart.applyOptions(newOptions)
  }
)

watch(
  () => props.seriesOptions,
  (newOptions) => {
    if (!series) return
    series.applyOptions(newOptions)
  }
)

watch(
  () => props.priceScaleOptions,
  (newOptions) => {
    if (!chart) return
    chart.priceScale().applyOptions(newOptions)
  }
)

watch(
  () => props.timeScaleOptions,
  (newOptions) => {
    if (!chart) return
    chart.timeScale().applyOptions(newOptions)
  }
)
</script>

<template>
  <div class="chart" ref="chartContainer"></div>
</template>

<style scoped>
.chart {
  height: 100%;
}
</style>
