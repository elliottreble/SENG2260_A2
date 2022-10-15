<template>
    <div id="background div" class="background" :style="{ backgroundImage: 'url(' + ImgUrl + ')' }">
        <restaurant-list></restaurant-list>
    </div>
</template>
  
  <script>
    import RestaurantList from "./RestaurantList.vue"
  export default {
    components: {
        RestaurantList
    },
    name: 'HoloLensView',
    data() {
        return {
            backgroundImages: [
                "HallwayBlank",
                "Hallway 2",
                "Hallway 3",
                "Food Court",
            ],
            selectedBackgroundIndex: 0
        }
    },
    computed: {
        CurrentBackground() {
            console.log(this.backgroundImages)
            let image = this.backgroundImages[this.selectedBackgroundIndex] + ".png";
            console.log(typeof image);
            return image;
        },
        ImgUrl() {
            var images = require.context('../assets/', false, /\.png$/)
            let result = images('./' + this.CurrentBackground)
            console.log(result);
            return result;
        },
        ImageStyle() {
            console.log(this.ImgUrl)
            return { backgroundImage: this.ImgUrl }
        },

    }, 
    methods: {

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
  </style>
  