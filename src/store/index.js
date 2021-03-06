import { createStore } from "vuex";
import { auth, dbGames, dbStats, firebase } from "../firebase";

export default createStore({
  strict: process.env.NODE_ENV !== "production",
  state: {
    user: auth.currentUser,
    userData: {
      uid: null,
      name: null,
    },
    game: {
      id: null,
      finished: false,
      started: false,
      code: null,
      players: [],
      rounds: [],
    },
    unsubscribe: null,
    stats: {},
    isDark: true,
  },
  getters: {
    username: (state, getters) => {
      const userData = state.userData;
      if (getters.isUserAuth) {
        return userData.name == null ? userData.uid : userData.name;
      } else {
        return "Non connecté";
      }
    },
    isUserAuth(state) {
      return !!state.user;
    },
    inGame(state) {
      return state.game && state.game.id;
    },
    gameStarted(state, getters) {
      return getters.inGame && !state.game.finished;
    },
  },
  mutations: {
    SIGN_IN(state, user) {
      state.user = user;
      state.userData = {
        uid: user.uid,
        name: user.displayName,
      };
    },
    SIGN_OUT(state) {
      state.user = null;
      state.userData = {};
    },
    SET_NAME(state, name) {
      state.userData = { ...state.userData, name };
    },
    UPDATE_GAME(state, game) {
      state.game = game;
    },
    SUBSCRIBE(state, unsubscribe) {
      state.unsubscribe = unsubscribe;
    },
    LEAVE_GAME(state) {
      state.game = {
        id: null,
        finished: false,
        started: false,
        code: null,
        players: [],
        rounds: [],
      };
    },
    SET_STATS(state, payload) {
      state.stats = payload;
    },
    SET_DARK(state, dark) {
      state.isDark = dark;
    },
  },
  actions: {
    authAction({ commit }, clb) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          commit("SIGN_IN", user);
          clb(true);
        } else {
          commit("SIGN_OUT");
          clb(false);
        }
      });
    },
    signOutAction({ commit }) {
      auth
        .signOut()
        .then(() => {
          commit("SIGN_OUT");
        })
        .catch(() => {
          commit("SIGN_OUT");
        });
    },
    updateNameAction({ commit, state }, name) {
      console.log("updateNameAction");
      if (name && name.length > 0 && name != state.user.displayName) {
        state.user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            commit("SET_NAME", name);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    deleteUser({ commit }) {
      return new Promise((resolve, reject) => {
        auth.currentUser
          .delete()
          .then(() => {
            commit("SIGN_OUT");
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    destroyGame({ commit, state }) {
      console.log("destroyGame");
      if (state.game && state.game.id && state.game.master == state.user.uid) {
        dbGames.doc(state.game.id).delete();
      }
      commit("LEAVE_GAME");
    },
    gatherStats({ commit }) {
      dbStats
        .get()
        .then((doc) => {
          if (doc.exists) {
            const newStats = doc.data();
            commit("SET_STATS", newStats);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addStatsFinishedGame() {
      dbStats.update({
        finishedGames: firebase.firestore.FieldValue.increment(1),
      });
    },
  },
  modules: {},
});
