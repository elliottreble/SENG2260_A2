<template>
    <n-button @click="FindRestaurantClicked()">Find a Restaurant with HoloAugmented Ordering</n-button>
</template>
  
  <script>
  import { NButton } from 'naive-ui'
import router from '../router'
  
  export default {
    components: {

        NButton,

    },
    name: 'FindRestaurantButton',
    data() {
    },
    computed: {

    }, 
    methods: {
        FindRestaurantClicked() {
            router.push('restaurant_list')
        }
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
  .background {
    width: 1800px;
    height: 1000px;
    background-size: 100%;
  }
  .restaurantList {
    width: 400px;
    height: 500px;
  }
  </style>
  