import style from './style.less'
import template from './template.html'
import $ from 'jquery'
import {markContainer} from '../../vuex/actions'

export default {
  template,
  vuex: {
    actions: {
      markContainer
    }
  },
  // props: [ 'chartOption' ],
  data () {
    return {
      style,
      elId: `Container-${(+new Date())}-${~~(Math.random() * 100 * 1000 * 1000)}`
    }
  },
  watch: {
    chartOption () {
      this.render()
    }
  },
  methods: {
    render () {

    },
    onClickMark () {
      let containerId = this.elId
      let container = $('#' + containerId)
      console.log(container)
      this.markContainer({
        content: container.find('div').html()
      })
    }
  },
  ready () {
    this.render()
  }
}
