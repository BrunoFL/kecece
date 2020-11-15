import { createStore } from "vuex";

export default createStore({
  state: {
    user: null
  },
  getters: {
    username: state => {
      if (state && state.user) {
        return state.user.isAnonymous ? state.uid : state.displayName;
      } else {
        return "Joueur Inconnu"
      }
    }
  },
  mutations: {
    SIGN_IN(state, user) {
      state.user = user;
    }
  },
  actions: {},
  modules: {}
});
