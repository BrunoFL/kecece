<template>
  <div id="nav">
    <router-link to="/">Jouer</router-link>
    |
    <User />
    |
    <router-link to="/Stats">Stats</router-link>
    |
    <router-link to="/about">A propos</router-link>
  </div>
  <router-view />

  <pre>{{ info }}</pre>
</template>

<script>
import User from "@/components/User.vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    User,
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

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

pre {
  border: 1px solid black;
  background-color: rgba(200, 200, 200, 0.2);
  font-size: 10px;
  text-align: justify;
}
</style>
