<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import store from '../store'

const tickers = ref([])

onMounted(async () => {
  const res = await axios.get(`https://fapi.binance.com/fapi/v1/ticker/24hr`)

  res.data.forEach((element) => {
    if (!element.symbol.includes('_') && !element.symbol.includes('DOM')) {
      tickers.value.push({
        name: element.symbol,
        vol: parseFloat((element.quoteVolume / 1000000).toFixed(2)),
      })
    }
  })
})

const sortBy = ref(localStorage.getItem('sortBy') || 'name')
const sortDirection = ref(localStorage.getItem('sortDirection') || 'asc')

const sortedTickers = computed(() => {
  const sorted = tickers.value.sort((a, b) => {
    if (a[sortBy.value] > b[sortBy.value]) return 1
    if (a[sortBy.value] < b[sortBy.value]) return -1
    return 0
  })
  return sortDirection.value === 'asc' ? sorted : sorted.reverse()
})

function saveToLocalStorage() {
  localStorage.setItem('sortBy', sortBy.value)
  localStorage.setItem('sortDirection', sortDirection.value)
}
</script>

<template>
  <div>
    <div class="select-bar">
      <select v-model="sortBy" @change="saveToLocalStorage">
        <option value="name">Name</option>
        <option value="vol">Volume</option>
      </select>
      <select v-model="sortDirection" @change="saveToLocalStorage">
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>
    <ul>
      <li
        v-for="ticker in sortedTickers"
        :key="ticker.name"
        @click="store.commit('setTicker', ticker.name)"
      >
        <div class="list-item">
          <span class="name">{{ ticker.name }}</span>
          <span class="volume">{{ ticker.vol }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.select-bar {
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;

  select {
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

.list-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  padding: 5px;
  cursor: pointer;

  &:hover {
    background: var(--content-bg-hover);
    border-bottom: 1px solid var(--content-bg-hover);
  }
}
</style>
