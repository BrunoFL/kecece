<template>
  <div v-show="inGame && !game.started" id="room" class="flex flex-col">
    <h1 class="flex-grow text-4xl mb-2">👉 {{ game.code }} 👈</h1>
    <div class="flex flex-wrap">
      <span v-for="player in game.players" :key="player.userData">{{ player.name || player.uid }}</span>
    </div>
    <div class="flex flex-row">
      <button v-on:click="startGame" v-show="userData.uid == game.master && game.players.length >= 0" class="m-6 flex-grow">Lancer</button>
      <button v-on:click="leaveGame" class="m-6 flex-grow hover:bg-red-800">Quitter</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { dbGames, firebase, fcts } from "../firebase";

export default {
  name: "Room",
  computed: {
    ...mapState(["game", "userData", "unsubscribe"]),
    ...mapGetters(["inGame", "gameStarted"]),
    ...mapMutations(["UPDATE_GAME", "LEAVE_GAME"]),
  },
  methods: {
    ...mapActions(["destroyGame"]),
    leaveGame() {
      this.unsubscribe();
      if (this.userData.uid == this.game.master) {
        this.destroyGame();
      } else {
        dbGames.doc(this.game.id).update({
          players: firebase.firestore.FieldValue.arrayRemove({
            uid: this.userData.uid,
            name: this.userData.name,
          }),
        });
        this.LEAVE_GAME();
      }
      this.$toast("Partie quittée");
    },
    startGame() {
      const startGame = fcts.httpsCallable("startGame");
      startGame({
        game: this.game,
      });
    },
  },
};
</script>
<style scoped>
span {
  @apply h-8 m-2;
}
</style>
