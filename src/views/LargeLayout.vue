<script setup>
import ChartContainer from '../components/ChartContainer.vue'
import DomButtons from '../components/DomButtons.vue'
import RightPanel from '../components/RightPanel.vue'
</script>

<template>
  <div class="wrapper">
    <div class="left">left</div>
    <div class="center">
      <div class="center-1">
        <div class="center-1-left">
          <ChartContainer title="btc-chart" limit="500" />
        </div>
        <div class="center-1-right">
          <ChartContainer title="spot-chart" limit="500" />
        </div>
      </div>
      <div class="center-2">
        <div class="center-2-left">
          <ChartContainer title="day-chart" limit="500" />
        </div>
        <div class="center-2-right">
          <ChartContainer title="5min-chart" limit="500" />
        </div>
      </div>
      <div class="center-3">
        <ChartContainer title="big-chart" limit="1500" />
      </div>
      <div class="center-4">
        <DomButtons />
      </div>
    </div>
    <div class="right">
      <RightPanel />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  min-height: calc(100vh - 30px);
  padding: 0 8px 8px 8px;

  .left {
    width: 45%;
    // border: 1px solid grey;
  }

  .center {
    width: 45%;

    .center-1 {
      display: flex;
      height: 25%;

      .center-1-left {
        // border: 1px solid grey;
        height: 100%;
        width: 50%;
      }

      .center-1-right {
        // border: 1px solid grey;
        height: 100%;
        width: 50%;
      }
    }

    .center-2 {
      display: flex;
      height: 25%;

      .center-2-left {
        // border: 1px solid grey;
        height: 100%;
        width: 50%;
      }

      .center-2-right {
        // border: 1px solid grey;
        height: 100%;
        width: 50%;
      }
    }

    .center-3 {
      // border: 1px solid grey;
      height: 42%;
      position: relative;
    }
  }

  .right {
    // border: 1px solid grey;
    width: 10%;
  }
}
</style>
