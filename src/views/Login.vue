<template>
  <h1>Se connecter</h1>
  <div
    v-show="!isUserAuth || user.isAnonymous"
    id="firebaseui-auth-container"
  ></div>
</template>

<script>
import { ui } from "../firebase";
import firebase from "firebase/app";
import "firebaseui/dist/firebaseui.css";
import { mapState, mapGetters } from "vuex";

export default {
  mounted() {
    const signInOptions = [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ];
    if (!this.isUserAuth) {
      signInOptions.push("anonymous");
    }
    const uiConfig = {
      signInSuccessUrl: "/home",
      signInOptions: signInOptions,
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["username", "isUserAuth"]),
  },
};
</script>
