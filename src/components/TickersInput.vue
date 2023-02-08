<script setup>
import store from '../store'

function onKeyDown(event) {
  if (event.key === 'Enter') {
    const inputValue = event.target.value.toUpperCase()
    store.commit('setTicker', inputValue)
  }
}
</script>

<template>
  <input :value="store.getters.getCurrentTicker" @keydown="onKeyDown" />
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
