import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isStarted: false,
  },
  mutations: {
    SET_GAME_STARTED(state, gameStarted) {
      state.isStarted = gameStarted;
    },
  },
  actions: {
    setGameStarted({ commit }, gameStarted) {
      commit('SET_GAME_STARTED', gameStarted)
    }
  },
  getters: {
    getGameStarted(state) {
      return state.isStarted;
    },
  },
});
