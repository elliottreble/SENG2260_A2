<template>
  <div>
  <n-notification-provider>
    <HoloLensView />
  </n-notification-provider>
</div>
</template>

<script>
import HoloLensView from './components/HoloLensView.vue';
import {NNotificationProvider} from "naive-ui";
export default {
  name: 'App',
  components: {
    HoloLensView,
    NNotificationProvider
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
