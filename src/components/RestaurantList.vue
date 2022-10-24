<template>
    <n-card class="restaurantList" closable @close="handleClose" title="Restaurants">
        <n-list hoverable clickable bordered>
            <n-list-item v-for="(restaurant, index) in restaurants" :key="restaurant.name" @click="ViewMenuClicked(index)">
                <n-grid cols="3">
                    <n-gi>
                        <n-avatar size="large" :src="ImgUrl(restaurant.img)" />
                    </n-gi>
                    <n-gi>
                        {{restaurant.name}}
                    </n-gi>
                    <n-gi>
                        {{restaurant.distance}}
                    </n-gi>
                </n-grid>
            </n-list-item>
        </n-list>
        <template #action>
            <action-footer></action-footer>
        </template>
    </n-card>
</template>
  
  <script>
  import { NAvatar, NList, NListItem, NCard, NGi, NGrid } from 'naive-ui'
import router from '../router'
import ActionFooter from "./ActionFooter.vue"
  
  export default {
    components: {
        NList,
        NListItem,
        NAvatar,
        NCard,
        NGi,
        NGrid,
        ActionFooter
    },
    name: 'RestaurantList',
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
        ImgUrl(image) {
            // var images = require.context('../assets/', false, /\.png$/)
            // let result = images('./' + image)
            // console.log(result);
            // return result;
            return require('../assets/'+image)
        },
        ViewMapClicked() {
            router.push("restaurant_map");
        },
        ViewMenuClicked(index) {
          router.push({ name: 'menu', params: { restaurant: index } })
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
    height: 550px;
  }
  </style>
  