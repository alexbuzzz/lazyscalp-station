<script setup>
import { ref } from 'vue'

const tickers = ref([
  { id: 1, ticker: 'FOOTBALLUSDT', sot: '250', avg: '34' },
  { id: 2, ticker: 'BTCUSDT', sot: '250', avg: '34' },
  { id: 3, ticker: 'ADAUSDT', sot: '250', avg: '34' },
  { id: 4, ticker: 'ADAUSDT', sot: '250', avg: '34' },
])
</script>

<template>
  <div class="dom-wrapper">
    <div class="dom-btn" v-for="ticker in tickers" :key="ticker.id">
      <div class="ticker">{{ ticker.ticker }}</div>
      <div class="tape-readings">
        <span>sot: {{ ticker.sot }}</span>
        <span>/</span>
        <span>avg:{{ ticker.avg }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dom-wrapper {
  display: flex;
  gap: 8px;
  margin-top: 6px;

  .dom-btn {
    width: calc(25% - 8px);
    height: calc((100vh - 30px) - (93vh - 30px));
    background: var(--content-bg);
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 5px;
    overflow: hidden;

    &:hover {
      background: var(--content-bg-hover);
    }

    .ticker {
      font-size: 16px;
    }

    .tape-readings {
      display: flex;
      justify-content: center;
      gap: 5px;
      color: var(--text-color-muted);
      font-size: 14px;
    }
  }
}
</style>
