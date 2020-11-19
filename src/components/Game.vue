<template>
  <div id="game">
    <div v-show="!inGame">
      <button v-on:click="createGame">Créer une partie</button>
      <input v-model="codeGame" type="text" />
      <button v-on:click="tryJoinGame">Rejoindre une partie</button>
    </div>

    <div v-show="inGame">
      <h1>{{ game.code }}</h1>
      <div v-for="player in game.players" :key="player.userData">
        <span v-show="player.name">{{ player.name }}</span>
        <span v-show="!player.name">{{ player.uid }}</span>
      </div>
      <button v-show="userData.uid == game.master">Lancer</button>
      <button>Quitter</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { dbGames, firebase } from "../firebase";

export default {
  name: "Drawing",
  data() {
    return {
      unsubscribe: null,
      idGame: null,
    };
  },
  computed: {
    ...mapState(["game", "userData"]),
    ...mapGetters(["inGame", "gameStarted"]),
  },
  methods: {
    ...mapMutations(["UPDATE_GAME"]),
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
          console.log(doc);
          game.id = doc.id;

          this.listen(game);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    tryJoinGame() {
      this.getGameByCode(this.codeGame);
    },
    listen(game) {
      this.idGame = game.id;
      console.log("listen", this.idGame, dbGames);
      this.unsubscribe = dbGames.doc(this.idGame).onSnapshot((doc) => {
        const isLocal = doc.metadata.hasPendingWrites;
        console.log(isLocal, doc);
        const game = doc.data();
        game.id = this.idGame;
        this.UPDATE_GAME(game);
      });
    },
    createCode() {
      let code = "";
      for (let i = 0; i < 4; i++) {
        const nb = Math.floor(Math.random() * 26);
        code += String.fromCharCode(65 + nb);
      }
      console.log(code);
      return code;
    },
    getGameByCode(code) {
      console.log("search game ", code, dbGames);
      dbGames
        .where("code", "==", code.toUpperCase())
        .where("finished", "==", false)
        .where("started", "==", false)
        .limit(1)
        .get()
        .then((result) => {
          console.log(result);
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
        .catch((error) => {
          console.error("Error getting documents: ", error);
        });
    },
    joinGame() {
      dbGames.doc(this.idGame).update({
        players: firebase.firestore.FieldValue.arrayUnion({
          uid: this.userData.uid,
          name: this.userData.name,
        }),
      });
    },
  },
};
</script>
<style></style>
