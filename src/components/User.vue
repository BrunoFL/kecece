<template>
<div>
    <pre>{{ user }}</pre>
    <h2>{{ username }}</h2>
    <router-link v-show="!user || user.isAnonymous" to="Login">Se connecter</router-link>
</div>

<button v-on:click="signout" v-show="user">Deconnexion</button>
</template>

<script>
import {
    auth
} from "../firebase";
import {
    mapState,
    mapGetters
} from "vuex";

export default {
    name: "User",
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
