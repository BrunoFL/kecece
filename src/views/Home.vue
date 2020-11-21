<template>
  <div class="home">
    <h1>Kécécé</h1>
  </div>
  <!-- <Drawing v-bind:img="img"/> -->
  <Game />
</template>

<script>
// @ is an alias to /src
// import Drawing from "@/components/Drawing.vue";
import Game from "@/components/Game.vue";

export default {
  name: "Home",
  components: {
    Game,
    // Drawing,
  },
  data() {
    return {};
  },
};
</script>
