/**
 * Created by huangxinxin on 16/6/16.
 */
import * as types from './mutations'

export const urlChange = function (store, ...args) {
  store.dispatch(types.URL_CHANGE, ...args)
}
