import {
  createStore
} from 'vuex';

// 具名导出
// export const store = createStore({
//   state: {
//     counter: 0
//   },
//   mutations: {
//     add(state) {
//       state.counter++;
//     }
//   },
//   getters: {},
//   actions: {}
// })

export default createStore({
  state: {
    counter: 0
  },
  mutations: {
    add(state) {
      state.counter++;
    }
  },
  getters: {},
  actions: {}
})
