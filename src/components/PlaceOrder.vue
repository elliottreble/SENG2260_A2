<template>
    <div>
        <n-button type="info" @click="ViewCartClicked()" class="button">Place Order</n-button>
    </div>
</template>
  
  <script>
  import { NButton,  useNotification, } from 'naive-ui'
  import router from '../router'
  import { useStore } from "../store"
  
  export default {
    components: {
        NButton,
    },
    name: 'PlaceOrder',
    data() {
        return {
            notification: useNotification(), 
        }
    },
    computed: {
        RestaurantName() {
            let routeParam = this.$route.params.restaurant;
            console.log(routeParam);
            console.log(this.$route.params);
            let restaurant = this.restaurants[parseInt(routeParam)];
            return restaurant.name;
        },
        Menu() {
            let routeParam = this.$route.params.restaurant;
            console.log(routeParam);
            let menu = this.menus[parseInt(routeParam)];
            let diet = this.dietaryRequirements;
            let filteredItems = menu.items.filter((item) => {
                let meetsReq = true;
                for(let requirement of diet) {
                    if (!item.dietSafe.includes(requirement)) {
                        meetsReq = false;
                    }
                }
                return meetsReq;
            })
            console.log(filteredItems);
            return filteredItems;
        },
    }, 
    methods: {
        ImgUrl(image) {
            // var images = require.context('../assets/', false, /\.png$/)
            // let result = images('./' + image)
            // console.log(result);
            // return result;
            return require('../assets/'+image)
        },
        ViewListClicked() {
            router.push('restaurant_list');
        },
        ViewMapClicked() {
            router.push({ path: '/restaurant_map', replace: true })
        },
        ViewItemClicked(item) {
            this.SelectedItem = item;
            this.showModal = true;
        },
        MakeMealAndAddToCart() {
            let cart = useStore();

            cart.addMeal({...this.SelectedItem});
            this.showModal = false;
            this.notification.create({
                title: "HoloAugmented Ordering",
                description: "Cart Updated",
                content:
                this.SelectedItem.name + " Meal added to Cart",
                meta: new Date().toLocaleString(),
                duration: 5000,
            });
        },
        AddItemOnly() {
            let cart = useStore();

            cart.addItem(this.SelectedItem);
            this.showModal = false;
            this.notification.create({
                title: "HoloAugmented Ordering",
                description: "Cart Updated",
                content:
                this.SelectedItem.name + " added to Cart",
                meta: new Date().toLocaleString(),
                duration: 5000,
            });
        },
        ViewCartClicked() {
            router.push({ path: '/cart', replace: true });
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
  .button {
    width: 396px;
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  </style>
  