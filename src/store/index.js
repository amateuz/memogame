import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameFinished: false,
    gameStarted: false,
    turnTimeIsUp: false,
  },
  mutations: {
    SET_GAME_FINISHED(state, gameFinished) {
      state.gameFinished = gameFinished;
    },
    SET_GAME_STARTED(state, gameStarted) {
      state.gameStarted = gameStarted;
    },
    SET_TURN_TIME_IS_UP(state, turnTimeIsUp) {
      state.turnTimeIsUp = turnTimeIsUp;
    },
  },
  actions: {
    setGameFinished({ commit }, gameFinished) {
      commit("SET_GAME_FINISHED", gameFinished);
    },
    setGameStarted({ commit }, gameStarted) {
      commit("SET_GAME_STARTED", gameStarted);
    },
    setTurnTimeIsUp({ commit }, turnTimeIsUp) {
      commit("SET_TURN_TIME_IS_UP", turnTimeIsUp);
    },
  },
  getters: {
    getGameFinished(state) {
      return state.gameFinished;
    },
    getGameStarted(state) {
      return state.gameStarted;
    },
    getTurnTimeIsUp(state) {
      return state.turnTimeIsUp;
    },
  },
});
