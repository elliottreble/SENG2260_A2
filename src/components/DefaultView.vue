<template>
    <find-restaurant-button v-if="!OrderPlaced"></find-restaurant-button>
    <directional-overview v-else></directional-overview>
</template>
  
  <script>
  import FindRestaurantButton from "./FindRestaurantButton.vue"
  import DirectionalOverview from "./DirectionalOverview.vue"
  import { useStore } from "../store";
  export default {
    components: {
        FindRestaurantButton,
        DirectionalOverview
    },
    name: 'DefaultView',
    data() {
    },
    computed: {
        OrderPlaced() {
            let cart = useStore();
            return cart.OrderPlaced;
        }
    }, 
    methods: {

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
  