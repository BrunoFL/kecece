<template>
  <span v-show="isUserAuth"> 👉 {{ username }} 👈 | </span>
  <router-link v-show="isUserAuth" to="Settings">Config</router-link>
  <span v-show="isUserAuth"> | </span>
  <router-link v-show="!isUserAuth" to="Login">Se connecter</router-link>
  <router-link v-show="isUserAuth && user.isAnonymous" to="Login">
    Changer de compte
  </router-link>
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
};
</script>
