import style from './style.less'
import template from './template.html'
import d3 from 'd3'
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
      elId: `Container-${(+new Date())}-${Math.random() * 100 * 1000 * 1000}`
    }
  },
  watch: {
    chartOption () {
      this.render()
    }
  },
  methods: {
    render () {
      console.log('Container Render')
      let containerId = this.elId
      d3.select(document.getElementById(this.elId))
        .selectAll('.container-btn')
        .on('click', () => {
          let container = $(this).parent()
          console.log(container)
          this.markContainer(containerId)
        })
    }
  },
  ready () {
    this.render()
  }
}
