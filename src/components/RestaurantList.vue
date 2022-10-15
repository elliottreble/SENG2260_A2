<template>
    <n-card class="restaurantList">
        <n-list>
            <n-list-item v-for="restaurant in restaurants" :key="restaurant.name">
                <n-button-group size="large">
                    <n-button><n-avatar :src="ImgUrl(restaurant.img)" /></n-button>
                    <n-button>{{restaurant.name}}</n-button>
                    <n-button disabled>{{restaurant.distance}}</n-button>
                </n-button-group>
            </n-list-item>
        </n-list>
    </n-card>
</template>
  
  <script>
  import { NButton, NAvatar, NList, NListItem, NCard, NButtonGroup } from 'naive-ui'
  
  export default {
    components: {
        NList,
        NListItem,
        NAvatar,
        NButton,
        NCard,
        NButtonGroup
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
            var images = require.context('../assets/', false, /\.png$/)
            let result = images('./' + image)
            console.log(result);
            return result;
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
  