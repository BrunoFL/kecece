<template>
  <div id="starting">
    <div v-show="!inGame">
      <button v-on:click="createGame">Créer une partie</button>
      <input v-model="codeGame" type="text" />
      <button v-on:click="tryJoinGame">Rejoindre une partie</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { dbGames, firebase } from "../firebase";

export default {
  name: "StartingGame",
  computed: {
    ...mapState(["game", "userData"]),
    ...mapGetters(["inGame", "gameStarted"]),
  },
  data() {
    return {
      idGame: null,
    };
  },
  methods: {
    ...mapMutations(["UPDATE_GAME", "LEAVE_GAME", "SUBSCRIBE"]),
    ...mapActions(["destroyGame", "addStatsCreatedGame"]),
    createGame() {
      const code = this.createCode();
      const game = {
        finished: false,
        started: false,
        code: code,
        players: [{ uid: this.userData.uid, name: this.userData.name }],
        rounds: [],
        master: this.userData.uid,
      };
      dbGames
        .add(game)
        .then((doc) => {
          this.$toast("Partie créée");
          game.id = doc.id;
          this.listen(game);
          this.addStatsCreatedGame();
        })
        .catch((error) => {
          console.error(error);
          this.$toast("Erreur création de la partie");
        });
    },
    tryJoinGame() {
      this.getGameByCode(this.codeGame);
    },
    listen(game) {
      this.idGame = game.id;
      const unsubscribe = dbGames.doc(this.idGame).onSnapshot((doc) => {
        if (doc.exists) {
          //   const isLocal = doc.metadata.hasPendingWrites;
          const game = doc.data();
          game.id = this.idGame;
          this.UPDATE_GAME(game);
        } else {
          this.LEAVE_GAME();
        }
      });
      this.SUBSCRIBE(unsubscribe);
    },
    createCode() {
      let code = "";
      for (let i = 0; i < 4; i++) {
        const nb = Math.floor(Math.random() * 26);
        code += String.fromCharCode(65 + nb);
      }
      return code;
    },
    getGameByCode(code) {
      dbGames
        .where("code", "==", code.toUpperCase())
        .where("finished", "==", false)
        .where("started", "==", false)
        .limit(1)
        .get()
        .then((result) => {
          if (result.empty) {
            this.$toast("Aucune partie trouvée");
          } else {
            this.$toast("Partie trouvée");
            const game = result.docs[0].data();
            game.id = result.docs[0].id;
            this.listen(game);
            this.joinGame();
          }
        })
        .catch(() => {
          this.$toast("Erreur find game");
        });
    },
    joinGame() {
      dbGames.doc(this.idGame).update({
        players: firebase.firestore.FieldValue.arrayUnion({
          uid: this.userData.uid,
          name: this.userData.name,
        }),
      });
      this.$toast("Partie rejoint");
    },
  },
};
</script>
<style></style>
