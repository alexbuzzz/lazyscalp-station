<script setup>
import { ref, onMounted } from 'vue'
import RightPanelTickers from './RightPanelTickers.vue'

const selectedTab = ref(localStorage.getItem('selectedTab') || 'tab1')

onMounted(() => {
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('selectedTab', selectedTab.value)
  })
})
</script>

<template>
  <div class="right-panel-wrapper">
    <div class="tabs">
      <button @click="selectedTab = 'tab1'">Alerts</button>
      <button @click="selectedTab = 'tab2'">Tickers</button>
    </div>
    <div class="tab-content" v-if="selectedTab === 'tab1'">Tab 1 Content</div>
    <div class="tab-content" v-if="selectedTab === 'tab2'">
      <RightPanelTickers />
    </div>
  </div>
</template>

<style lang="scss">
.right-panel-wrapper {
  height: calc(100vh - 40px);
  overflow: scroll;
  .tabs {
    display: flex;
    gap: 5px;
    padding: 5px;

    button {
      flex: 1;
      padding: 10px;
      background-color: var(--content-bg);
      color: var(--text-color);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      margin: 5px 0;

      &:hover {
        background: var(--content-bg-hover);
      }
    }
  }

  .tab-content {
    padding: 0 5px;
  }
}
</style>
