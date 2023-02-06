<script setup>
import { ref } from 'vue'
import IconMenu from './icons/IconMenu.vue'
import IconClose from './icons/IconClose.vue'
import { RouterLink } from 'vue-router'
import { onClickOutside } from '@vueuse/core'

const menu = ref(null)

let isMobileMenuOpen = ref(false)

onClickOutside(menu, () => (isMobileMenuOpen.value = false))
</script>

<template>
  <!-- Show menu button -->
  <button
    v-if="!isMobileMenuOpen"
    @click="isMobileMenuOpen = true"
    class="menu-btn"
  >
    <IconMenu />
  </button>
  <!-- Hide menu button -->
  <button
    v-if="isMobileMenuOpen"
    @click="isMobileMenuOpen = false"
    class="menu-btn"
  >
    <IconClose />
  </button>
  <!-- Mobile menu -->
  <div class="menu-bg" :class="{ 'show-bg': isMobileMenuOpen }"></div>
  <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }" ref="menu">
    <span><RouterLink to="/">Large Layout</RouterLink></span>
    <span><RouterLink to="/small">Small Layout</RouterLink></span>
    <span>Watchlist</span>
    <span>Settings</span>
  </div>
</template>

<style lang="scss" scoped>
.menu-btn {
  color: var(--text-color);
  position: absolute;
  right: 0;
  border: none;
  background: none;
  z-index: 10;
  cursor: pointer;
  padding-top: 3px;
}

.menu-bg {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: 0.25s;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background-color: var(--color-popup-overlay);
  display: flex;
  justify-content: center;
}
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  z-index: 9;
  background-color: var(--body-bg);
  padding-top: 6rem;
  opacity: 0;
  transform: translateX(100%);
  transition: 0.25s;

  span {
    display: block;
    padding: 1rem;
    color: var(--text-color);
    text-decoration: none;
    text-align: center;
    font-size: 1.5rem;
    transition: 0.25s;
    cursor: pointer;

    &:hover {
      background-color: var(--button-bg-hover);
      transition: 0.25s;
    }

    a.router-link-exact-active {
      color: var(--accent-color);
    }

    a.router-link-exact-active:hover {
      background-color: transparent;
    }

    a {
      display: inline-block;
      padding: 0 1rem;
      border-left: 1px solid var(--color-border);
    }
  }
}

.is-open {
  opacity: 1;
  transform: translateY(0);
}

.show-bg {
  transition: 0.25s;
  opacity: 1;
  z-index: 8;
}
</style>
