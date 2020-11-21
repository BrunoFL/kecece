<template>
  <button v-on:click="signOutAction">Deconnexion</button>
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
