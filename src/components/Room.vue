<template>
  <div id="room">
    <div v-show="inGame">
      <h1>{{ game.code }}</h1>
      <div v-for="player in game.players" :key="player.userData">
        <span v-show="player.name">{{ player.name }}</span>
        <span v-show="!player.name">{{ player.uid }}</span>
      </div>
      <button
        v-on:click="startGame"
        v-show="userData.uid == game.master && game.players.length >= 4"
      >
        Lancer
      </button>
      <button v-on:click="leaveGame">Quitter</button>
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
