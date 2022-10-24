<template>
    <n-card class="restaurantMap">

        <template #cover>
          <!-- <n-popover trigger="hover" :delay="500" :duration="500">
                <template #trigger>
                    <img :src="ImgUrl()" alt="Map View of Restaurants" />
                </template>
                <restaurant-popover></restaurant-popover>
            </n-popover> -->

                <img :src="ImgUrl()" @click="ViewMenuClicked()" alt="Map View of Restaurants" />

        </template>
        <!-- <template #default>
            <img :src="ImgUrl()" @click="ViewMenuClicked()" alt="Map View of Restaurants" height="200px" width="200px" />
        </template> -->
        
        <!-- <img :src="ImgUrl()" @click="ViewMenuClicked()" alt="Map View of Restaurants" width="200px" height="200px" /> -->
        <!-- <v-img :src="ImgUrl()" alt=""
            contain
            height="100px"
            width="150px">
        </v-img> -->
        <template #action>
            <n-button type="info" @click="ViewCartClicked()" class="leftButton">View Cart</n-button>
            <n-button type="primary" @click="ViewListClicked()" class="rightButton">View Restaurants</n-button>
        </template>
    </n-card>
</template>
  
  <script>
  import {  NCard, NButton} from 'naive-ui'
    import router from '../router'
  
  export default {
    components: {
        NCard,
        NButton
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
            let image = "Minimap.png"
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
  .restaurantMap {
    width: 400px;
    height: 350px;
  }
  .leftButton {
    width: 198px;
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .rightButton {
    width: 198px;
    height: 50px;
    position: absolute;
    bottom: 0;
    right: 0
  }
  </style>
  