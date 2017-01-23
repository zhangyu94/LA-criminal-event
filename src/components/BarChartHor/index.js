/**
 * Created by manan on 17/1/23.
 */
import style from './style.less'
import template from './template.html'
import d3 from 'd3'
// import $ from 'jquery'

export default {
  template,
  props: [ 'chartOption' ],
  data () {
    return {
      style,
      elId: `BarChartHor -${(+new Date())}-${Math.random() * 100 * 1000 * 1000}`
    }
  },
  watch: {
    chartOption () {
      this.DrawBarChartHor()
    }
  },
  methods: {
    DrawBarChartHor () {
      if (!this.chartOption) {
        return
      }
      let svg = d3.select(document.getElementById(this.elId))
        .select('svg')
      let margin = { top: 0, right: 10, bottom: 0, left: 0 }
      let width = this.$el.clientWidth - margin.left - margin.right
      let height = this.$el.clientHeight - margin.top - margin.bottom
      // console.log(width)
      // console.log(height)

      let dataset = this.chartOption.in

      let xScale = d3.scale.linear()
        .domain([ 4000, d3.max(this.chartOption.count) ])
        .range([ 0, width ])

      let yScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .rangeBands([ 0, height ])

      let rectPadding = 2

      let trans = []
      let flag = 0

      svg.selectAll('.bar')
        .data(dataset)
        .enter().append('rect')
        .attr('class', style['bar'])
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .attr('x', 2)
        .attr('width', function (d) {
          // console.log(xScale(d.data))
          return xScale(d.data)
        })
        .attr('y', function (d, i) {
          return yScale(i) + rectPadding / 2
        })
        .attr('height', yScale.rangeBand() - rectPadding)
        .attr('fill', 'steelblue')
        .on('click', function (d) {
          for (let i = 0; i < trans.length; i++) {
            if (trans[i] === d.keyword) {
              flag = 1
              for (let j = i; j < trans.length - 1; j++) {
                trans[j] = trans[j + 1]
              }
              trans.length = trans.length - 1
              break
            }
          }
          if (flag === 0) {
            trans.push(d.keyword)
            d3.select(this)
              .attr('fill', 'orange')
          } else {
            d3.select(this)
              .attr('fill', 'steelblue')
          }
          flag = 0
          // console.log(trans)
        })
        .append('svg:title')
        .text(function (d) { return d.keyword + ': ' + d.data })
    }
  },
  ready () {
    this.DrawBarChartHor()
  }
}
