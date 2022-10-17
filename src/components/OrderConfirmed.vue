<template>
    <n-card class="restaurantList" title="Order Confirmed" closable @close="handleClose">
        <template #cover>
            <img :src="ImgUrl()" width="100px" height="auto">
        </template>
        <template #header-extra>
            <n-icon color="green" size="40">
                <check-circle-round></check-circle-round>
            </n-icon>
        </template>
        {{Restaurant}}
        <n-table>
            <tbody>
                <tr v-for="item in Items" :key="item.name">
                    <td>{{item.name}}</td>
                    <td>${{item.price}}</td>
                </tr>
            </tbody>
        </n-table>

        <template #footer>
            Total: ${{Total}}
        </template>

        <template #action>
            <n-button type="primary" @click="NavigateToDestination()">
                Navigate to Destination
            </n-button>
        </template>
    </n-card>
</template>
  
  <script>
  import { NButton, NCard, useNotification, NIcon, NTable } from 'naive-ui'
import router from '../router'
import { useStore } from "../store"
  import { CheckCircleRound } from '@vicons/material';
  export default {
    components: {
        NButton,
        NCard,
        CheckCircleRound,
        NIcon,
        NTable
    },
    name: 'OrderConfirmed',
    data() {
        return {
            notification: useNotification(), 
        }
    },
    computed: {
        Items() {
            let cart = useStore();

            return cart.Items;
        },
        Restaurant() {
            let cart = useStore();

            return cart.Restaurants[0];
        },
        Menu() {
            let routeParam = this.$route.params.restaurant;
            console.log(routeParam);
            let menu = this.menus[parseInt(routeParam)];
            return menu.items;
        },
        Total() {
            let result = 0;
            for(let item of this.Items) {
                result += item.price;
            }
            return result
        }
    }, 
    methods: {
        ImgUrl() {
            // var images = require.context('../assets/', false, /\.png$/)
            // let result = images('./' + image)
            // console.log(result);
            // return result;
            return require('../assets/RestaurantsMapView.png')
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
        },
        NavigateToDestination() {
            router.push("/")
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
  