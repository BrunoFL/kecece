import { createStore } from "vuex";
import { auth } from '../firebase'

export default createStore({
  state: {
    user: auth.currentUser,
    userData: {
      uid: null,
      name: null
    },
    game: {
      id: null,
      finished: false,
      started: false,
      code: null,
      players: [],
      rounds: []
    }
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
    }
  },
  mutations: {
    SIGN_IN(state, user) {
      state.user = user;
      state.userData = {
        uid: user.uid,
        name: user.displayName
      }
    },
    SIGN_OUT(state) {
      state.user = null;
      state.userData = {};
    },
    SET_NAME(state, name) {
      state.userData = { ...state.userData, name };
    },
    UPDATE_GAME(state, game) {
      console.log(game);
      state.game = game;
    }
  },
  actions: {
    authAction({ commit }) {
      auth.onAuthStateChanged(user => {
        if (user) {
          commit("SIGN_IN", user);
        } else {
          commit("SIGN_OUT");
        }
      });
    },
    signOutAction({ commit }) {
      auth.signOut()
        .then(() => {
          commit("SIGN_OUT");
        })
        .catch(() => {
          commit("SIGN_OUT");
        })
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
    }
  },
  modules: {}
});
