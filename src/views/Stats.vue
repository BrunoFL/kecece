<template>
  <div class="table-auto">
    <h1 class="text-2xl">Quelques stats</h1>
    <ul v-show="stats">
      <li>Partie créées : {{ stats.createdGames }}</li>
      <li>Partie finies : {{ stats.finishedGames }}</li>
    </ul>
    <button v-on:click="gatherStats" class="no-underline hover:text-green hover:no-underline m-6 border-2 border-light-blue-500 border-opacity-100 rounded-full p-4 hover:bg-blue-800 bg-gray-200 dark:bg-gray-600 flex-grow text-lg">Mettre à jour</button>
  </div>
  <pre>{{ stats }}</pre>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Stats",
  computed: {
    ...mapState(["stats"]),
  },
  methods: {
    ...mapActions(["gatherStats"]),
    updateStats() {
      this.$toast("Mise à jour");
      this.gatherStats();
    },
  },
  created() {
    this.gatherStats();
  },
  mounted() {
    console.log("mounted");
    this.gatherStats();
  },
};
</script>
