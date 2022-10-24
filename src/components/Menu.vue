<template>
    <n-card class="restaurantList" :title="RestaurantName" closable @close="handleClose">
        <label for="diet">Dietary Requirements</label>
        <n-select id="diet" :options="dietaryOptions" v-model:value="dietaryRequirements" multiple>Dietary Requirements</n-select>

        <n-list hoverable clickable bordered >
            <n-list-item v-for="item in Menu" :key="item.name" @click="ViewItemClicked(item)">
                <n-grid cols="3">
                    <n-gi>
                        <n-avatar size="large" :src="ImgUrl(item.img)" />
                    </n-gi>
                    <n-gi>
                        {{item.name}}
                    </n-gi>
                    <n-gi>
                        ${{item.price}}
                    </n-gi>
                </n-grid>
            </n-list-item>
        </n-list>

        <action-footer></action-footer>
        <!-- <template #action>
            <action-footer></action-footer>
            <n-button-group size="large">
                <n-button type="primary" @click="ViewCartClicked()">View Cart</n-button>
                <n-button type="info" @click="ViewMapClicked()">View Map</n-button>
            </n-button-group>
            
        </template> -->
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
  import { NButton, NCard, NButtonGroup, NList, NListItem, NAvatar, NModal, NSelect, useNotification, NGrid, NGi } from 'naive-ui'
import router from '../router'
import { useStore } from "../store"
import ActionFooter from "./ActionFooter.vue"
  
  export default {
    components: {
        NButton,
        NCard,
        NButtonGroup,
        NList,
        NListItem,
        NAvatar,
        NModal,
        NSelect,
        NGrid,
        NGi,
        ActionFooter
    },
    name: 'RestaurantMenu',
    data() {
        return {
            notification: useNotification(), 
            dietaryRequirements: [],
            dietaryOptions: [
                {
                    label: "Dairy Free",
                    value: "Dairy Free"
                },
                {
                    label: "Egg Allergy",
                    value: "Egg Allergy"
                },
                {
                    label: "Gluten Free",
                    value: "Gluten Free"
                },
                {
                    label: "Halal",
                    value: "Halal"
                },
                {
                    label: "Kosher",
                    value: "Kosher"
                },
                {
                    label: "Nut Allergy",
                    value: "Nut Allergy"
                },
                {
                    label: "Pescetarian",
                    value: "Pescetarian"
                },
                {
                    label: "Shellfish Allergy",
                    value: "Shellfish Allergy"
                },
                {
                    label: "Soy Allergy",
                    value: "Soy Allergy"
                },
                {
                    label: "Vegan",
                    value: "Vegan"
                },
                {
                    label: "Vegetarian",
                    value: "Vegetarian"
                }
            ],
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
                            price: 11.50,
                            dietSafe: []
                        },
                        {
                            name: "Doner Kebab",
                            img: "Doner Kebab.png",
                            price: 12.50,
                            dietSafe: []
                        },
                        {
                            name: "Falafel Kebab",
                            img: "Falafel Kebab.png",
                            price: 9.50,
                            dietSafe: ["Vegetarian", "Halal"]
                        },
                        {
                            name: "Mixed Kebab",
                            img: "Mixed Kebab.png",
                            price: 12.50,
                            dietSafe: []
                        },
                        {
                            name: "Snack Pack",
                            img: "Snack Pack.jpg",
                            price: 15,
                            dietSafe: "Gluten Free"
                        }
                    ]
                }, 
                {
                    name: "Pizza Time",
                    items: [
                        {
                            name: "Meatlovers Pizza",
                            img: "Meatlovers Pizza.jpg",
                            price: 15,
                            dietSafe: []
                        },
                        {
                            name: "Hawaiian Pizza",
                            img: "Hawaiian Pizza.jpg",
                            price: 12.50,
                            dietSafe: []
                        },
                        {
                            name: "Pepperoni Pizza",
                            img: "Pepperoni Pizza.jpg",
                            price: 10,
                            dietSafe: []
                        }
                    ]
                },
                {
                    name: "Fortnite Burger",
                    items: [
                        {
                            name: "Beef Burger",
                            img: "Beef Burger.png",
                            price: 13.50,
                            dietSafe: []
                        },
                        {
                            name: "Chicken Burger",
                            img: "Chicken Burger.png",
                            price: 11.50,
                            dietSafe: []
                        },
                        {
                            name: "Fish Burger",
                            img: "Fish Burger.png",
                            price: 12.50,
                            dietSafe: ["Pescetarian"]
                        },
                    ]
                },
                {
                    name: "Taco Flavoured Kisses",
                    items: [
                        {
                            name: "Mixed Taco",
                            img: "Mixed Taco.png",
                            price: 5.50,
                            dietSafe: []
                        },
                        {
                            name: "Chicken Taco",
                            img: "Chicken Taco.png",
                            price: 4.50,
                            dietSafe: []
                        },
                        {
                            name: "Beef Taco",
                            img: "Beef Taco.png",
                            price: 3.50,
                            dietSafe: []
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
    height: 550px;
  }
  .menu {
    padding-bottom: 500px;
  }
  </style>
  