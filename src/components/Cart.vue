<template>
    <n-card class="restaurantList" title="Order Details" closable @close="handleClose">
        <h3>
            {{Restaurant}}
        </h3>

        <n-table v-if="!loading">
            <tbody>
                <tr v-for="item in Items" :key="item.name">
                    <td>{{item.name}}</td>
                    <td>${{item.price}}</td>
                </tr>
            </tbody>
        </n-table>
        <n-skeleton v-else text></n-skeleton>

        <template #footer>
            Total: ${{Total}}
        </template>

        <template #action>
                <n-button type="info" @click="PlaceOrderClicked()">Place Order</n-button>
        </template>
       
    </n-card>
</template>
  
  <script>
  import { NButton, NCard, NTable, useNotification, NSkeleton} from 'naive-ui'
import router from '../router'
import { useStore } from "../store"

  
  export default {
    components: {
        NButton,
        NCard,
        NTable,
        NSkeleton
    },
    name: 'Cart',
    data() {
        return {
            loading: false,
            notification: useNotification()
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

            cart.addMeal(this.SelectedItem);
            this.showModal = false;
        },
        AddItemOnly() {

        },
        PlaceOrderClicked() {
            this.loading = true;
            this.notification.create({
                title: "HoloAugmented Ordering",
                description: "Order Placed",
                content:
                "Total: $" + this.Total,
                meta: new Date().toLocaleString(),
                duration: 5000,
            });
            let cart = useStore();
            cart.placeOrder();
            router.push({path: "/order_confirmed"})
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
  