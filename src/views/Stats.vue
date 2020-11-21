<template>
  <div class="stats">
    <h1>This is Stats page</h1>
    <ul v-show="stats">
      <li>Partie créées : {{ stats.createdGames }}</li>
      <li>Partie finies : {{ stats.finishedGames }}</li>
    </ul>
    <button v-on:click="gatherStats">Mettre à jour</button>
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
  },
  mounted() {
    console.log("mounted");
    this.gatherStats();
  },
};
</script>
