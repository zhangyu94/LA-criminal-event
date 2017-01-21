import style from './style.less'
import template from './template.html'
import d3 from 'd3'
import $ from 'jquery'

export default {
  template,
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
      d3.select(document.getElementById(this.elId))
        .selectAll('.container-btn')
        .on('click', function () {
          let container = $(this).parent()
          console.log(container)
        })
      /*
      if (this.chartOption) {
        let myChart = echarts.init(document.getElementById(this.elId))
        myChart.setOption(this.chartOption)
        myChart.on('click', (params) => {
          this.$dispatch('chart-click', params)
        })
      }
      */
    }
  },
  ready () {
    this.render()
  }
}
