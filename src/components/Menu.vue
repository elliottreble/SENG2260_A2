<template>
    <n-card class="restaurantList" :title="RestaurantName" closable @close="handleClose">

        <n-list>
            <n-list-item v-for="item in Menu" :key="item.name">
                <n-button-group size="large">
                    <n-button><n-avatar :src="ImgUrl(item.img)" /></n-button>
                    <n-button @click="ViewItemClicked(item)">{{item.name}}</n-button>
                    <n-button disabled>${{item.price}}</n-button>
                </n-button-group>
            </n-list-item>
        </n-list>
        <template #action>
            <n-button-group size="large">
                <n-button type="primary" @click="ViewCartClicked()">View Cart</n-button>
                <n-button type="info" @click="ViewMapClicked()">View Map</n-button>
            </n-button-group>
        </template>
        <n-modal v-model:show="showModal" style="width: 600px; position: fixed; left: 100px; top: 100px">
            <n-card
            style="width: 350px"
            :title="SelectedItem.name"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
            >
            <template #cover>
                <img :src="ImgUrl(SelectedItem.img)" />
            </template>
            ${{SelectedItem.price}}
            <template #action>
                <n-button-group size="large">
                    <n-button type="primary" @click="MakeMealAndAddToCart()">Make it a Meal (+$6.00)</n-button>
                    <n-button type="info" @click="AddItemOnly()">Item Only</n-button>
                </n-button-group>
            </template>
            </n-card>
        </n-modal>
    </n-card>
</template>
  
  <script>
  import { NButton, NCard, NButtonGroup, NList, NListItem, NAvatar, NModal  } from 'naive-ui'
import router from '../router'
import { useStore } from "../store"
  
  export default {
    components: {
        NButton,
        NCard,
        NButtonGroup,
        NList,
        NListItem,
        NAvatar,
        NModal
    },
    name: 'RestaurantMap',
    data() {
        return {
            showModal: false,
            SelectedItem: {},
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
            ],
            menus: [
                { 
                    name: "Next Stop Kebabs",
                    items: [
                        {
                            name: "Chicken Kebab",
                            img: "Chicken Kebab.png",
                            price: 11.50
                        },
                        {
                            name: "Doner Kebab",
                            img: "Doner Kebab.png",
                            price: 12.50
                        },
                        {
                            name: "Falafel Kebab",
                            img: "Falafel Kebab.png",
                            price: 9.50
                        },
                        {
                            name: "Mixed Kebab",
                            img: "Mixed Kebab.png",
                            price: 12.50
                        },
                    ]
                }, 
                {
                    name: "Pizza Time",
                    items: [
                        {
                            name: "Meatlovers Pizza",
                            img: "Meatlovers Pizza.jpg",
                            price: 15
                        },
                        {
                            name: "Hawaiian Pizza",
                            img: "Hawaiian Pizza.jpg",
                            price: 12.50
                        },
                        {
                            name: "Pepperoni Pizza",
                            img: "Pepperoni Pizza.jpg",
                            price: 10
                        }
                    ]
                },
                {
                    name: "Fortnite Burger",
                    items: [
                        {
                            name: "Beef Burger",
                            img: "Beef Burger.png",
                            price: 13.50
                        },
                        {
                            name: "Chicken Burger",
                            img: "Chicken Burger.png",
                            price: 11.50
                        },
                        {
                            name: "Fish Burger",
                            img: "Fish Burger.png",
                            price: 12.50
                        },
                    ]
                },
                {
                    name: "Taco Flavoured Kisses",
                    items: [
                        {
                            name: "Mixed Taco",
                            img: "Mixed Taco.png",
                            price: 5.50
                        },
                        {
                            name: "Chicken Taco",
                            img: "Chicken Taco.png",
                            price: 4.50
                        },
                        {
                            name: "Beef Taco",
                            img: "Beef Taco.png",
                            price: 3.50
                        }
                    ]
                }
            ]
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
            return menu.items;
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

            cart.addMeal(this.SelectedItem);
            this.showModal = false;
        },
        AddItemOnly() {
            let cart = useStore();

            cart.addItem(this.SelectedItem);
            this.showModal = false;
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
  </style>
  