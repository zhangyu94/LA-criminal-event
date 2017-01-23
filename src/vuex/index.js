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
  markedContainerList: []
}

const mutations = {
  [types.URL_CHANGE] (state, ctx, router) {
    state.ctx = ctx
    state.activeRouter = router
    utils.setStatus(state, 'url', types.URL_CHANGE)
  },
  [types.MARK_CONTAINER] (state, markedContainer) {
    state.markedContainerList.push(markedContainer)
    console.log(state)
  },
  [types.FILTER_DATE] (state, filteredDate) {
    state.filteredDate = filteredDate
    console.log(state)
  },
  [types.FILTER_DAY_OF_WEEK] (state, filteredDayOfWeek) {
    state.filteredDayOfWeek = filteredDayOfWeek
    console.log(state)
  },
  [types.FILTER_TIME] (state, filteredTime) {
    state.filteredTime = filteredTime
    console.log(state)
  },
  [types.FILTER_CATEGORY] (state, filteredCategory) {
    state.filteredCategory = filteredCategory
    console.log(state)
  },
  [types.FILTER_RESOLUTION] (state, filteredResolution) {
    state.filteredResolution = filteredResolution
    console.log(state)
  }
}

export default new Vuex.Store({
  strict: true,
  state,
  mutations
})
