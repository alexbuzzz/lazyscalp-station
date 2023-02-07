<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/Menu.vue'
import TickersInput from './components/TickersInput.vue'
import IconDark from './components/icons/IconDark.vue'
import IconLight from './components/icons/IconLight.vue'
import { onBeforeMount } from 'vue'
import { ref } from 'vue'

let isDark = ref(false)

onBeforeMount(() => {
  if (localStorage.getItem('is-dark')) {
    if (localStorage.getItem('is-dark') === 'true') {
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }
})

const switchToDark = () => {
  isDark.value
    ? document.documentElement.setAttribute('data-theme', 'light')
    : document.documentElement.setAttribute('data-theme', 'dark')

  isDark.value = !isDark.value
  localStorage.setItem('is-dark', isDark.value.toString())
}
</script>

<template>
  <Menu />
  <header>
    <div class="logo">LAZYSCALP</div>
    <div class="readings">
      <div class="equity">Total: 1000$ | Net fee: 900$</div>
    </div>
    <div class="controls">
      <div class="ticker">
        <TickersInput />
      </div>
      <div class="time">10:00:00</div>
      <button @click="switchToDark" class="darkLight right-side-btn">
        <IconDark v-if="!isDark" />
        <IconLight v-if="isDark" />
      </button>
    </div>
  </header>

  <RouterView />
</template>

<style lang="scss" scoped>
header {
  background: var(--body-bg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;

  .logo {
    font-size: 14px;
    margin-left: 10px;
  }

  .readings {
    display: flex;
    gap: 50px;
  }

  .controls {
    display: flex;
    align-items: center;
    justify-items: flex-start;
    width: 332px;

    .ticker {
      font-size: 14px;
      margin-right: 12px;
    }

    .time {
      font-size: 16px;
      margin-right: 8px;
    }

    button {
      background: none;
      color: var(--text-color);
      border: none;
      padding-top: 4px;
    }
  }
}
</style>
