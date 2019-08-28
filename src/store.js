import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    task_list: [
      { done: true, text: 'Learn Javascript' },
      { done: false, text: 'Learn ES6' },
      { done: false, text: 'Learn Vue' },
      { done: false, text: 'Build something awesome!' }
    ]
  },
  getters: {

  },
  mutations: {
    'add-task': (state, new_task) => { state.task_list.push({ done: false, text: new_task }); },
    'remove-task': (state, index) => { state.task_list.splice(index, 1); },
    'change-task': (state, payload) => { state.task_list[payload.index] = payload.task; }
  },
  actions: {

  }
})