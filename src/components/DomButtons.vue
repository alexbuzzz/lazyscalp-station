<template>
  <div class="dom-wrapper">
    <div class="dom-btn">1</div>
    <div class="dom-btn">2</div>
    <div class="dom-btn">3</div>
    <div class="dom-btn">4</div>
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

    &:hover {
      background: var(--content-bg-hover);
    }
  }
}
</style>
