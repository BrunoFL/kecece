<template>
  <div id="room">
    <div v-show="inGame">
      <h1 class="text-4xl mb-2">{{ game.code }}</h1>
      <div v-for="player in game.players" :key="player.userData">
        <span v-show="player.name">{{ player.name }}</span>
        <span v-show="!player.name">{{ player.uid }}</span>
      </div>
      <button v-on:click="startGame" v-show="userData.uid == game.master && game.players.length >= 1" class="no-underline hover:text-green hover:no-underline ml-6 border-2 border-light-blue-500 border-opacity-100 rounded-full p-2 hover:bg-green-800">Lancer</button>
      <button v-on:click="leaveGame" class="no-underline hover:text-green hover:no-underline ml-6 border-2 border-light-blue-500 border-opacity-100 rounded-full p-2 hover:bg-red-800 m-4">Quitter</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { dbGames, firebase } from "../firebase";

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
    startGame() {},
  },
};
</script>
