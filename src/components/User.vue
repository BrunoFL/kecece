<template>
  <div>
    <pre>{{ user }}</pre>
    <h2>{{ username }}</h2>
    <router-link v-show="!user || user.isAnonymous" to="Login"
      >Se connecter</router-link
    >
  </div>

  <button v-on:click="signout" v-show="user">Deconnexion</button>
</template>

<script>
import { auth } from "../firebase";
import { mapState, mapGetters } from "vuex";

export default {
  name: "user",
  beforeMount() {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      this.$store.commit("SIGN_IN", user);
    });
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["username"]),
  },
  methods: {
    signOut() {
      auth.signOut();
    },
  },
};
</script>

<style>
pre {
  border: 1px solid black;
  background-color: rgba(200, 200, 200, 0.2);
  font-size: 10px;
  text-align: justify;
}
</style>
