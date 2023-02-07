<script setup>
import { ref, watch, computed, onBeforeMount } from 'vue'
import Chart from './MainChart.vue'
import store from '../../store'

const props = defineProps(['title', 'limit'])

// Chart data params
const chartDataParams = ref({
  ticker: store.getters.getCurrentTicker,
  interval: '1m',
  candlesLimit: props.limit,
})

// Watch ticker changed
const currentTicker = computed(() => {
  return store.getters.getCurrentTicker
})

watch(
  () => currentTicker.value,
  (newValue) => {
    chartDataParams.value.ticker = newValue
  }
)

// Save to localstorage
watch(chartDataParams.value, (newValue) => {
  localStorage.setItem(props.title, JSON.stringify(newValue.interval))
})

// Get from localstorage
onBeforeMount(() => {
  const savedOption = localStorage.getItem(props.title)
  if (savedOption) {
    chartDataParams.value.interval = JSON.parse(savedOption)
  }
})

// Chart main settings
const chartOptions = ref({
  layout: {
    backgroundColor: '#1a1b21',
    textColor: '#ccc',
    fontFamily: 'Arial',
    fontSize: 12,
  },
  grid: {
    vertLines: {
      color: '#1a1b21',
    },
    horzLines: {
      color: '#1a1b21',
    },
  },
  crosshair: {
    mode: 0,
  },

  rightPriceScale: {
    borderColor: '#21222a',
    entireTextOnly: true,
  },

  timeScale: {
    borderColor: '#21222a',
    rightOffset: 7,
    timeVisible: true,
    secondsVisible: false,
  },
})

// Candles colors
const seriesOptions = ref({
  upColor: '#26A69A',
  borderUpColor: '#26A69A',
  wickUpColor: '#26A69A',
  downColor: '#E75654',
  borderDownColor: '#E75654',
  wickDownColor: '#E75654',
})

// Volume settings
const volumeOptions = ref({
  entireTextOnly: true,
  priceFormat: {
    type: 'volume',
  },
  priceLineVisible: false,
  priceScaleId: '',
  scaleMargins: {
    top: 0.95,
    bottom: 0.01,
  },
})
</script>

<template>
  <div class="chart-container">
    <select
      v-model="chartDataParams.interval"
      name="timeframe"
      id="timeframe-select"
    >
      <option value="1m">1m</option>
      <option value="5m">5m</option>
      <option value="15m">15m</option>
      <option value="1h">1h</option>
      <option value="4h">4h</option>
      <option value="1d">1D</option>
    </select>
    <Chart
      :chartDataParams="chartDataParams"
      :autosize="true"
      :chart-options="chartOptions"
      :series-options="seriesOptions"
      :volume-options="volumeOptions"
    />
  </div>
</template>

<style lang="scss" scoped>
.chart-container {
  position: relative;
  height: calc(100% - 4px);
  width: calc(100% - 4px);

  select {
    position: absolute;
    margin: 5px 0 0 5px;
    z-index: 10;
    color: var(--text-color);
    background: transparent;
    border: none;

    option {
      color: var(--body-bg);

      &:hover {
        background: var(--content-bg);
      }
    }
  }
}
</style>
