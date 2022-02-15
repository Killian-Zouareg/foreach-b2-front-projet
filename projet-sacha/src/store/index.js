import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";


import { INCREMENT_MAXSCORE , INCREMENT_ACTUALSCORE , RESET_SCORE} from "./mutation"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      maxScore:0,
      actualScore:0,
    },
  mutations: {
    [INCREMENT_MAXSCORE](state){
      state.maxScore++;
    },
    [INCREMENT_ACTUALSCORE](state){
      state.actualScore++
    },
    [RESET_SCORE](state){
      state.actualScore = 0,
      state.maxScore = 0
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    paths: ['maxScore','actualScore']
  })]
})
