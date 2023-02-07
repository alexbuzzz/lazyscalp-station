<script setup>
import store from '../store'
</script>

<template>
  <input v-model="store.state.tickers.currentTicker" />
</template>

<style lang="scss" scoped>
input {
  width: 180px;
  background: var(--body-bg);
  outline: none;
  color: var(--text-color);
  text-align: right;
  font-size: 16px;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: hidden;
}
</style>
