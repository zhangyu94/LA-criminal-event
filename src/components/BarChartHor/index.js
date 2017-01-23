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
      console.log('manan')
      let svg = d3.select(document.getElementById(this.elId))
        .select('svg')
      let margin = { top: 10, right: 10, bottom: 1, left: 10 }
      let width = this.$el.clientWidth - margin.left - margin.right
      let height = this.$el.clientHeight - margin.top - margin.bottom
      // console.log(width)
      // console.log(height)

      let dataset = this.chartOption.in

      let xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .range([ 0, height ])

      // console.log('max')
      // console.log(d3.max(dataset.data))
      let yScale = d3.scale.linear()
        .domain([ -500, d3.max(this.chartOption.count) ])
        .rangeBands([ 0, width ])
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

      let trans = []
      let flag = 0
      // let clicked = 0

      svg.selectAll('.bar')
        .data(dataset)
        .enter().append('rect')
        .attr('class', style['bar'])
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .attr('x', function (d, i) {
          return xScale(i) + rectPadding / 2
        })
        .attr('y', function (d) {
          return yScale(d.data)
        })
        .attr('width', xScale.rangeBand() - rectPadding)
        .attr('height', function (d) {
          return (height - yScale(d.data))
        })
        .attr('fill', 'steelblue')
        .on('click', function (d) {
          // clicked = (clicked + 1) % 2
          // console.log('llllll')
          d3.selectAll('elId')
            .style('opacity', 0.2)
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
              .attr('fill', 'red')
          } else {
            d3.select(this)
              .attr('fill', 'steelblue')
          }
          flag = 0
          console.log(trans)
        })
        .append('svg:title')
        .text(function (d) { return d.keyword + ': ' + d.data })

      // .on('mouseover', function (d, i) {
      //   if (clicked % 2 === 0) {
      //     d3.select(this)
      //       .attr('fill', 'orange')
      //   }
      // })
      // .on('mouseout', function (d, i) {
      //   if (clicked % 2 === 0) {
      //     d3.select(this)
      //       .transition()
      //       .duration(500)
      //       .attr('fill', 'steelblue')
      //   }
      // })

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
