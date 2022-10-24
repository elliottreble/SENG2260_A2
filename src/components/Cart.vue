<template>
    <n-card class="restaurantList" title="Order Details" closable @close="handleClose">
        <h3>
            {{Restaurant}}
        </h3>
        <div v-if="!loading">
            <!-- <n-table >
                <tbody>
                    <tr v-for="(item, index) in Items" :key="item.name">
                        <td>{{item.name}}</td>
                        <td>${{item.price}}</td>
                        <td><n-button type="danger" @click="removeItem(index)">X</n-button></td>
                    </tr>
                </tbody>
            </n-table> -->
            <br />
            <n-grid cols="2">
                <div v-for="item in Items" :key="item.name">
                    <n-gi>{{item.name}}
                    <p v-if="item.name.includes('Meal')">
                        + Chips
                        + Drink
                    </p>
                    </n-gi>
                    <n-gi>{{item.price}}</n-gi>
                </div>
            </n-grid>
            <n-list>
                <n-list-item v-for="item in Items" :key="item.name">
                    <n-grid cols="4" item-responsive >
                        <n-gi span="2"><b>{{item.name}}</b></n-gi>
                        <n-gi>${{item.price}}</n-gi>
                        <n-gi><n-button type="danger" @click="removeItem(index)">X</n-button></n-gi>
                        <n-gi v-if="item.name.includes('Meal')">+ Chips</n-gi>
                        <n-gi v-if="item.name.includes('Meal')" span="3"></n-gi>
                        <n-gi v-if="item.name.includes('Meal')">+ Drink</n-gi>
                    </n-grid>
                </n-list-item>
                <n-list-item></n-list-item>
            </n-list>
            <n-button type="primary" @click="returnToMenu()">Add More Items</n-button>
        </div>
        <n-skeleton v-else text></n-skeleton>

        <template #footer>
            Total: ${{Total}}
        </template>

        
        <template #action>
            <n-button type="info" @click="PlaceOrderClicked()" class="button">Place Order</n-button>
        </template>
       
    </n-card>
</template>
  
  <script>
  import { NCard,  useNotification, NSkeleton, NButton,NList, NListItem, NGrid, NGi,} from 'naive-ui'
import router from '../router'
import { useStore } from "../store"

  
  export default {
    components: {
        NCard,
        NSkeleton,
        NButton,
        NListItem,
        NList,
        NGrid,
        NGi
    },
    name: 'Cart',
    data() {
        return {
            loading: false,
            notification: useNotification(),
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
        },
        removeItem(index) {
            console.log("removing item")
            let cart = useStore();
            cart.removeItem(index);
        },
        returnToMenu() {
            let restaurantName = this.Restaurant;
            let resIndex = 0;
            this.restaurants.forEach((value, index) => {
                if(value.name == restaurantName) {
                    resIndex = index;
                }
            });
            router.push({ name: 'menu', params: { restaurant: resIndex } });
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
  .button {
    width: 396px;
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  </style>
  