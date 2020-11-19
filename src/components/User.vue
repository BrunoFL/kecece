<template>
  <span v-show="isUserAuth"> 👉 {{ username }} 👈 | </span>
  <router-link v-show="isUserAuth" to="Settings">Config</router-link>
  <span v-show="isUserAuth"> | </span>
  <router-link v-show="!isUserAuth" to="Login">Se connecter</router-link>
  <router-link v-show="isUserAuth && user.isAnonymous" to="Login"
    >Changer de compte</router-link
  >
  <span v-show="!isUserAuth || (isUserAuth && user.isAnonymous)"> | </span>
  <button v-on:click="signOutAction" v-show="isUserAuth">Deconnexion</button>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "User",
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["username", "isUserAuth"]),
  },
  methods: {
    ...mapActions(["signOutAction"]),
  },
  updated() {
    console.log("updated", this.username);
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
