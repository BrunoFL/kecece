<template>
  <nav id="nav" class="flex items-center justify-between flex-wrap bg-gray-200 dark:bg-gray-800 p-2 fixed w-full z-10 top-0">
    <div class="flex items-center flex-no-shrink mr-3">
      <router-link to="/" class="no-underline hover:no-underline text-black dark:text-white">
        <h1 class="text-2xl pl-2">Kécécé</h1>
      </router-link>
      <router-link v-show="isUserAuth" to="/Settings" class="no-underline hover:no-underline ml-3">👉 {{ username }} 👈</router-link>
      <router-link v-show="!isUserAuth" to="Login" class="btn animate-pulse ml-6">Se connecter</router-link>
    </div>

    <div class="block lg:hidden" v-on:click="menu">
      <button id="nav-toggle" class="flex items-center px-3 py-2">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>

    <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0" id="nav-content">
      <ul class="list-reset lg:flex justify-end flex-1 items-center">
        <li class="mr-3">
          <router-link to="/" class="inline-block py-2 px-4 no-underline">Jouer</router-link>
        </li>
        <li v-show="isUserAuth" class="mr-3">
          <router-link to="Settings" class="inline-block py-2 px-4 no-underline">Config</router-link>
        </li>
        <li v-show="isUserAuth && user.isAnonymous" class="mr-3">
          <router-link to="Login" class="inline-block py-2 px-4 no-underline">Changer de compte </router-link>
        </li>
        <li class="mr-3">
          <router-link to="Stats" class="inline-block py-2 px-4 no-underline">Stats</router-link>
        </li>
        <li class="mr-3">
          <router-link to="about" class="inline-block py-2 px-4 no-underline">A propos</router-link>
        </li>
        <li v-show="isUserAuth" v-on:click="signOutAction" class="mr-3">
          <a href="#" class="inline-block py-2 px-4 no-underline">Deconnexion</a>
        </li>
      </ul>
      <div>
        <Toggle label="dark" v-bind:checked="isDark" v-on:toggled="updateDark" />
      </div>
    </div>
  </nav>
  <div id="plok"></div>
</template>

<script>
import Toggle from "@/components/Toggle.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    Toggle,
  },
  methods: {
    ...mapActions(["signOutAction"]),
    ...mapMutations(["SET_DARK"]),
    setDark() {
      if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.querySelector("html").classList.add("dark");
        this.updateDark(true);
      } else {
        document.querySelector("html").classList.remove("dark");
        this.updateDark(false);
      }
    },
    updateDark(payload) {
      if (payload) {
        document.querySelector("html").classList.add("dark");
        localStorage.theme = "dark";
      } else {
        document.querySelector("html").classList.remove("dark");
        localStorage.theme = "light";
      }
      if (this.isDark != payload) {
        this.SET_DARK(payload);
      }
    },
    menu() {
      document.getElementById("nav-content").classList.toggle("hidden");
    },
  },
  computed: {
    ...mapState(["user", "isDark"]),
    ...mapGetters(["username", "isUserAuth"]),
  },
  mounted() {
    this.setDark();
    console.log("dark", this.isDark);
  },
};
</script>
