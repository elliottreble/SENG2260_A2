
import { defineStore } from 'pinia'

export const useStore = defineStore('cart', {
  state: () => ({
     items: [],
     restaurants: [],
     orderPlaced: false,
     step: 0
  }),
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    setRestaurant(restaurant) {
        this.restaurants.push(restaurant)
    },
    increment() {
      this.count++
    },
    addItem(item) {

        this.items.push(item);
    },
    addMeal(item) {
        item.price += 6;
        item.name += " Meal";
        this.items.push(item);
    },
    clearCart() {
        this.items = []
    },
    placeOrder() {
      this.orderPlaced = true;
    },
    stepForward() {
      console.log("stepping")
      this.step ++;
    },
    removeItem(index) {
      this.items.splice(index, 1);
    }
  },
  getters: {
    Items: (state) => state.items,
    Restaurants: (state) => state.restaurants,
    OrderPlaced: (state) => state.orderPlaced,
    Step: (state) => state.step,
    // CurrentBackground: (state) => {
    //   let backgroundImages = [
    //     "HallwayBlank",
    //     "Hallway 2",
    //     "Hallway 3",
    //     "Food Court",
    //   ];
    //   let currentImg = backgroundImages[state.step];
    //   let imgUrl = require('./assets/'+image)
    // }
  },
})