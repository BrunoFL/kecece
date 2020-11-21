<template>
  <div class="bg-white dark:bg-gray-400 font-sans leading-normal tracking-normal">
    <Nav />

    <div class="container shadow-lg mx-auto bg-white mt-24 md:mt-18">
      <router-view />
    </div>

    <pre>{{ info }}</pre>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Nav,
  },
  methods: {
    ...mapActions(["authAction"]),
  },
  computed: {
    info() {
      return this.$store.state;
    },
  },
  mounted() {
    this.authAction();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

pre {
  border: 1px solid black;
  background-color: rgba(200, 200, 200, 0.2);
  font-size: 10px;
  text-align: justify;
}
</style>
