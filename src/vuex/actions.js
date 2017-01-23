/**
 * Created by huangxinxin on 16/6/16.
 */
import * as types from './mutations'

export const urlChange = function (store, ...args) {
  store.dispatch(types.URL_CHANGE, ...args)
}

export const markContainer = function (store, markedContainer) {
  console.log('action-markContainer')
  store.dispatch(types.MARK_CONTAINER, markedContainer)
}

export const filterDate = function (store, filteredDate) {
  console.log('action-filterDate')
  store.dispatch(types.FILTER_DATE, filteredDate)
}

export const filterDayOfWeek = function (store, filteredDayOfWeek) {
  console.log('action-filterDayOfWeek')
  store.dispatch(types.FILTER_DAY_OF_WEEK, filteredDayOfWeek)
}

export const filterTime = function (store, filteredTime) {
  console.log('action-filterTime')
  store.dispatch(types.FILTER_TIME, filteredTime)
}

export const filterCategory = function (store, filteredCategory) {
  console.log('action-filterCategory')
  store.dispatch(types.FILTER_CATEGORY, filteredCategory)
}

export const filterResolution = function (store, filteredResolution) {
  console.log('action-filterResolution')
  store.dispatch(types.FILTER_RESOLUTION, filteredResolution)
}
