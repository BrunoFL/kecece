<template>
  <h1 class="text-2xl pl-2">Se connecter</h1>
  <p class="text-xl">Un compte est requis pour jouer</p>
  <div v-show="!isUserAuth || user.isAnonymous" id="firebaseui-auth-container"></div>
</template>

<script>
import { ui } from "../firebase";
import firebase from "firebase/app";
import "firebaseui/dist/firebaseui.css";
import { mapState, mapGetters } from "vuex";

export default {
  mounted() {
    this.makeAuthUi();
  },
  updated() {
    ui.reset();
    this.makeAuthUi();
    console.log("up");
  },
  methods: {
    makeAuthUi() {
      const signInOptions = [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.EmailAuthProvider.PROVIDER_ID];
      if (!this.isUserAuth) {
        signInOptions.push("anonymous");
      }
      const uiConfig = {
        signInFlow: "popup",
        signInSuccessUrl: "/home",
        signInOptions: signInOptions,
      };
      ui.start("#firebaseui-auth-container", uiConfig);
    },
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["username", "isUserAuth"]),
  },
};
</script>
