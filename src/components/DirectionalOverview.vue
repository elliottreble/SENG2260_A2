<template>
    <div @click="onClick">
        <img :src="ImgUrl(directionArrows[step])" alt="direction" class="direction" />
        <img :src="ImgUrl(minimapStates[step])" alt="minimap" class="minimap" />
    </div> 
</template>
  
  <script>
  import { useStore } from "../store"
  import router from '../router'
  export default {
    components: {


    },
    name: 'DirectionalOverview',
    data() {
        return {
            step: 0,
            minimapStates: [
                "Minimap.png",
                "Minimap 2.png",
                "Minimap 3.png",
                "Minimap 4.png"
            ],
            directionArrows: [
                "Arrow.png",
                "Arrows Right.png",
                "Arrows Left.png",
                "Arrow.png"
            ]

        }

    },
    computed: {

    }, 
    methods: {
        onClick() {
            if(this.step !== 4) {
                this.step ++;
                let cart = useStore();
                cart.stepForward();
                if(this.step == 1) {
                    router.push("Hallway 2")
                }
                else if (this.step == 2) {
                    router.push("Hallway 3")
                }
                else if (this.step == 3) {
                    router.push("Food Court")
                }
            }

        },
        ImgUrl(image) {
            return require('../assets/'+image)
        },
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
  .direction {
    position: fixed;
    top: 0;
    width: 200px;
  }
  .minimap {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
  }
  </style>
  