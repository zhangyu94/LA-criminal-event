import style from './style.less'
import template from './template.html'
import d3 from 'd3'

export default {
  template,
  props: [ 'chartOption' ],
  data () {
    return {
      style,
      elId: `Wordle-${(+new Date())}-${Math.random() * 100 * 1000 * 1000}`
    }
  },
  watch: {
    chartOption () {
      this.render()
    }
  },
  methods: {
    render () {
      if (this.chartOption) {
        console.log(this.chartOption)
        console.log('d3', d3)
        /*
        let myChart = echarts.init(document.getElementById(this.elId))
        myChart.setOption(this.chartOption)
        myChart.on('click', (params) => {
          this.$dispatch('chart-click', params)
        })
        */
      }
    }
  },
  ready () {
    this.render()
  }
}
