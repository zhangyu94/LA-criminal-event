/**
 * Created by manan on 17/1/18.
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
      elId: `BarChart -${(+new Date())}-${Math.random() * 100 * 1000 * 1000}`
    }
  },
  watch: {
    chartOption () {
      this.DrawBarChart()
    }
  },
  methods: {
    DrawBarChart () {
      if (!this.chartOption) {
        return
      }
      console.log('barchart')

      let svg = d3.select(document.getElementById(this.elId))
        .select('svg')
      let margin = { top: 10, right: 10, bottom: 1, left: 10 }
      let width = this.$el.clientWidth - margin.left - margin.right
      let height = this.$el.clientHeight - margin.top - margin.bottom
      // console.log(width)
      // console.log(height)

      let dataset = this.chartOption.in

      console.log(dataset)

      let xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .rangeBands([ 0, width ])

      // console.log('max')
      // console.log(d3.max(dataset.data))
      let yScale = d3.scale.linear()
          .domain([ -500, d3.max(this.chartOption.count) ])
          .range([ height, 0 ])

      // // 定义x轴
      // let xAxis = d3.svg.axis()
      //   .scale(xScale)
      //   .orient('bottom')
      //
      // // 定义y轴
      // let yAxis = d3.svg.axis()
      //   .scale(yScale)
      //   .orient('left')
      //   .ticks(5)

      let rectPadding = 2

      svg.selectAll('.bar')
        .data(dataset)
        .enter().append('rect')
        .attr('class', style['bar'])
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .attr('x', function (d, i) {
          return xScale(i) + rectPadding / 2
        })
        .attr('y', function (d) {
          console.log(d)
          return yScale(d.data)
        })
        .attr('width', xScale.rangeBand() - rectPadding)
        .attr('height', function (d) {
          let h = height - yScale(d.data)
          // console.log(h)
          return h
        })
        .append('svg:title')
        .text(function (d) { return d.keyword + ': ' + d.data })

      // // 添加x轴
      // svg.append('g')
      //   .attr('class', style['axis'])
      //   .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
      //   .call(xAxis)

      // // 添加y轴
      // if (this.chartOption.jud === true) {
      //   svg.append('g')
      //     .attr('class', style[ 'axis' ])
      //     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      //     .call(yAxis)
      // }
    }
  },
  ready () {
    this.DrawBarChart()
  }
}
