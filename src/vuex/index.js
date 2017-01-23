/**
 * Created by huangxinxin on 16/8/24.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import utils from './utils'
import * as types from './mutations'

Vue.use(Vuex)
Vue.prototype.VuexUtils = utils
Vue.prototype.VuexMutations = types

const state = {
  ctx: null,
  activeRouter: null,
  status: {
    url: null
  },
  markedContainer: null
}

const mutations = {
  [types.URL_CHANGE] (state, ctx, router) {
    state.ctx = ctx
    state.activeRouter = router
    utils.setStatus(state, 'url', types.URL_CHANGE)
  },
  [types.MARK_CONTAINER] (state, markedContainer) {
    state.markedContainer = markedContainer
    console.log(state)
  }
}

export default new Vuex.Store({
  strict: true,
  state,
  mutations
})
