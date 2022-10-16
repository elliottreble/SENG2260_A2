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
            ]
        }
    },
    watch: {
        'CurrentStep': function() {
            console.log("Current step updated");
            document.body.style.backgroundImage = this.CSSProps.backgroundImage;
        }
    },
    computed: {
        CurrentStep() {
            let cart = useStore();
            let step = cart.Step
            console.log("hololens on step " + step);
            return step;
        },
        CSSProps() {
            let result = this.cssProps[this.CurrentStep]
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
    margin-top: 60px;
  }
  .background {
    width: 1800px;
    height: 1000px;
    background-size: 100%;
    background-image: v-bind('CSSProps.backgroundImage');
  }
  </style>
  