<template>
  <div id="app" class="bg-white dark:bg-gray-400 font-sans leading-normal tracking-normal text-black dark:text-white overflow-x-hidden h-screen">
    <Nav />

    <div class="container mx-auto mt-24 pt-2">
      <router-view />
    </div>

    <pre class="block w-full bottom-0">{{ info }}</pre>
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
    ...mapActions(["authAction", "destroyGame"]),
    addScript(url) {
      const scriptTag = document.createElement("script");
      scriptTag.src = url;
      document.getElementsByTagName("head")[0].appendChild(scriptTag);
    },
    addStyle(url) {
      const styleTag = document.createElement("link");
      styleTag.rel = "stylesheet";
      styleTag.href = url;
      document.getElementsByTagName("head")[0].appendChild(styleTag);
    },
  },
  computed: {
    info() {
      return this.$store.state;
    },
  },
  mounted() {
    this.authAction((sign) => {
      if (sign) {
        // this.$router.push("/");
      } else {
        this.$router.push("/login");
      }
    });
    this.addStyle("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css");
  },
  unmounted() {
    this.destroyGame();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

pre {
  border: 1px solid black;
  font-size: 10px;
  text-align: justify;
}
</style>
