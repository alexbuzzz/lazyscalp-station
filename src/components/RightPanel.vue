<script setup>
import { ref, onMounted } from 'vue'

const selectedTab = ref(localStorage.getItem('selectedTab') || 'tab1')

onMounted(() => {
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('selectedTab', selectedTab.value)
  })
})
</script>

<template>
  <div>
    <div class="tabs">
      <button @click="selectedTab = 'tab1'">Alerts</button>
      <button @click="selectedTab = 'tab2'">Tickers</button>
    </div>
    <div v-if="selectedTab === 'tab1'">Tab 1 Content</div>
    <div v-if="selectedTab === 'tab2'">Tab 2 Content</div>
  </div>
</template>

<style lang="scss">
.tabs {
  display: flex;
  gap: 4px;

  button {
    flex: 1;
    padding: 10px;
    background-color: var(--content-bg);
    color: var(--text-color);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin: 8px 0 8px 4px;

    &:hover {
      background: var(--content-bg-hover);
    }
  }
}
</style>
