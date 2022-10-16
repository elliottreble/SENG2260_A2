<template>
    <n-card title="Next Stop Kebabs">
        <template #cover>
            <img :src="ImgUrl()" width="100px" height="auto">
        </template>
        <n-button @click="ViewMenuClicked()">View Menu</n-button>
    </n-card>
</template>
  
  <script>
  import { NCard, NButton } from 'naive-ui'
import router from '../router'
  
  export default {
    components: {
        NCard,
        NButton
    },
    name: 'RestaurantPopover',
    data() {
    },
    computed: {

    }, 
    methods: {
        ImgUrl() {
            let image = "Next Stop Kebabs.png";
            var images = require.context('../assets/', false, /\.png$/);
            let result = images('./' + image);
            console.log(result);
            return result;
        },
        ViewMenuClicked() {
          router.push({ name: 'menu', params: { restaurant: '0' } })
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
  