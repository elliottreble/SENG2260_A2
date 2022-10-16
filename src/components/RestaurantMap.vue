<template>
    <n-card class="restaurantList" closable @close="handleClose">
        
        <template #cover>
            <n-popover trigger="hover" :delay="500" :duration="500">
                <template #trigger>
                    <img :src="ImgUrl()" alt="Map View of Restaurants" />
                </template>
                <restaurant-popover></restaurant-popover>
            </n-popover>
        </template>
        <template #action>
            <n-button-group size="large">
                <n-button type="primary" @click="ViewCartClicked()">View Cart</n-button>
                <n-button type="info" @click="ViewListClicked()">View List</n-button>
            </n-button-group>
        </template>
    </n-card>
</template>
  
  <script>
  import { NButton, NCard, NButtonGroup, NPopover } from 'naive-ui'
  import RestaurantPopover from "./RestaurantPopover.vue"
import router from '../router'
  
  export default {
    components: {
        NButton,
        NCard,
        NButtonGroup,
        NPopover,
        RestaurantPopover
    },
    name: 'RestaurantMap',
    data() {
        return {
            restaurants: [
                {
                    name: "Next Stop Kebabs",
                    img: "Next Stop Kebabs.png",
                    distance: "20m"
                },
                {
                    name: "Pizza Time",
                    img: "Pizza Time.png",
                    distance: "35m"
                },
                {
                    name: "Fortnite Burger",
                    img: "Fortnite Burger.png",
                    distance: "40m"
                },
                {
                    name: "Taco Flavoured Kisses",
                    img: "Taco Flavoured Kisses.png",
                    distance: ">50m"
                }
            ]
        }
    },
    computed: {

    }, 
    methods: {
        ImgUrl() {
            let image = "RestaurantsMapView.png"
            var images = require.context('../assets/', false, /\.png$/)
            let result = images('./' + image)
            console.log(result);
            return result;
        },
        ViewListClicked() {
            router.push({ path: '/restaurant_list', replace: true })
        },
        ViewCartClicked() {
            router.push("cart");
        },
        handleClose() {
            router.push("/");
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
  