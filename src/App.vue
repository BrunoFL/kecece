<template>
  <div id="nav">
    <router-link to="/">Jouer</router-link>
    |
    <User />
    |

    <router-link to="/about">A propos</router-link>
  </div>
  <router-view />

  <pre>{{ user }}</pre>
  <pre>{{ userData }}</pre>
  <pre>{{ game }}</pre>
</template>

<script>
import User from "@/components/User.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    User,
  },
  methods: {
    ...mapActions(["authAction"]),
  },
  computed: {
    ...mapState(["user", "userData", "game"]),
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
</style>
