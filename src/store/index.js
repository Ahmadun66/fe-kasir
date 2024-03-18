import { createStore } from 'vuex'

export default createStore({
  state: {
    id: null
  },
  mutations: {
    SET_ID(state, newId) {
      state.id = newId;
    },
  },
  actions: {
    setId({ commit }, newId) {
      commit('SET_ID', newId);
    },
  },
  modules: {
  }
})
