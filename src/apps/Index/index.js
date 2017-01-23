/**
 * Created by huangxinxin on 2017/1/16.
 */
import style from './style.less'
import template from './template.html'
import AppHeader from '../../components/Header'
import AppMain from './Main'
import routers from './routers'
import {activeRouter} from '../../vuex/getters'
import storage from '../../commons/storage'

export default {
  template,
  vuex: {
    getters: {
      activeRouter
    }
  },
  data () {
    return {
      token: '',
      style,
      navsInHeader: routers.table
    }
  },
  computed: {
    activeRouterName () {
      if (this.activeRouter) {
        return this.activeRouter.name
      }
      return routers.table[ 0 ].name
    }
  },
  components: {
    AppHeader, AppMain
  },
  created () {
    this.LOGS.log('Index', 123, 456, 788, { a: 123 })
    this.token = storage.set([ { a: 'Big Data' } ])
  }
}
