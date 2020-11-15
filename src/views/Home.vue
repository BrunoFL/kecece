<template>
  <div class="home">
    <h1>Kécécé</h1>
  </div>
  <Drawing v-bind:img="img" />
</template>

<script>
// @ is an alias to /src
import Drawing from "@/components/Drawing.vue";
export default {
  name: "Home",
  components: {
    Drawing,
  },
  data() {
    return {};
  },
};
</script>
