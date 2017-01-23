/**
 * Created by huangxinxin on 2017/1/16.
 */
import style from './style.less'
import template from './template.html'
import page from 'page'
import routers from '../routers'
import {urlChange} from '../../../vuex/actions'

export default {
  template,
  vuex: {
    actions: {
      urlChange
    }
  },
  props: {
    token: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      style,
      activeMain: ''
    }
  },
  components: routers.components,
  methods: {
    pageGo (ctx) {
      let uri = ctx.path
      let item = routers.route(uri)
      if (item) {
        this.activeMain = item.name
      }
      this.urlChange(ctx, item)
    }
  },
  created () {
    page.base('/page')
    page('/:any', this.pageGo.bind(this))
    page.start()
  }
}
