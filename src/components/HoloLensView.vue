<template>
    <div>
        <div id="background div" class="background"  :key="selectedBackgroundIndex" >
            <router-view></router-view>
        </div>
    </div>
</template>
  
  <script>
    import {useStore} from "../store";
  export default {
    components: {
    },
    name: 'HoloLensView',
    data() {
        return {
            renderComponent: true,
            backgroundImages: [
                "HallwayBlank",
                "Hallway 2",
                "Hallway 3",
                "Food Court",
            ],
            selectedBackgroundIndex: 0,
            cssProps: [
                {
                backgroundImage: `url(${require('@/assets/HallwayBlank.png')})`
                },
                {
                backgroundImage: `url(${require('@/assets/Hallway 2.png')})`
                },
                {
                backgroundImage: `url(${require('@/assets/Hallway 3.png')})`
                },
                {
                backgroundImage: `url(${require('@/assets/Food Court.png')})`
                },
            ],
            image: `url(${require('@/assets/HallwayBlank.png')})`
        }
    },
    watch: {
        'CurrentStep': function() {
            console.log("Current step updated");
            document.body.style.backgroundImage = this.CSSProps.backgroundImage;
        },
        'RouteName': function() {
            console.log(this.CSSProps.backgroundImage);
            document.body.style.backgroundImage = this.CSSProps.backgroundImage;
            console.log(this.CSSProps.backgroundImage)
            this.image = this.CSSProps.backgroundImage;
            this.$forceUpdate()
        }
    },
    computed: {
        RouteName() {
            const route = this.$route.name;
            console.log(this.$route.name);
            console.log(route)
            return route;
        },
        CurrentStep() {
            let cart = useStore();
            let step = cart.Step
            console.log("hololens on step " + step);
            return step;
        },
        CSSProps() {
            let result = this.cssProps[this.CurrentStep];
            console.log(result);
            return result;
        },
        ImgUrl() {
            let cart = useStore();
            let step = cart.Step
            console.log("hololens on step " + step);
            var images = require.context('../assets/', false, /\.png$/)
            let image = this.backgroundImages[step] + ".png";
            let imgURL= images('./' + image)
            console.log("background image result " + imgURL);
            let result = { backgroundImage: 'url(' + imgURL + ')' }
            console.log("background image result " + result);
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
  }
  .background {
    width: device-width;
    height: auto;
    background-size: 60%;
    background-image: v-bind('image');
    position: fixed;
  }
  </style>
  