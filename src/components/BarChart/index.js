/**
 * Created by manan on 17/1/18.
 */
import style from './style.less'
import template from './template.html'
import d3 from 'd3'
import $ from 'jquery'

export default {
  template,
  props: [ 'barOption' ],
  // name: 'vue-bar-chart',
  data () {
    return {
      style,
      elId: 'BarChart'
      // data: [99, 71, 78, 25, 36, 92],
      // bar: '',
    }
  },
  watch: {
    barOption () {
      this.DrawBarChart()
    }
  },
  methods: {
    DrawBarChart () {
      if (!this.barOption) {
        return
      }
      let svg = d3.select(document.getElementById(this.elId))
        .select('svg')
      let margin = { top: 20, right: 20, bottom: 30, left: 50 }
      let width = svg.style('width')
      let height = svg.style('height')
      // let width = $('#BarChartsvg').width() - margin.left - margin.right
      // let height = $('#BarChartsvg').height() - margin.top - margin.bottom

      let dataset = this.barOption

      let xScale = d3.scale.ordinal()
        .domain(d3.range(dataset, length))
        .range([ 0, width ])

      let yScale = d3.scale.linear()
          .domain([0, d3.max(dataset)])
          .range([height, 0])

      // 定义x轴
      let xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')

      // 定义y轴
      let yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left')

      let rectPadding = 4

      svg.selectAll('.bar')
        .data(dataset)
        .enter().append('rect')
        .attr('class', style['bar'])
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .attr('x', function (d, i) {
          return xScale(i) + rectPadding / 2
        })
        .attr('y', function (d) {
          return yScale(d)
        })
        .attr('width', xScale.rangeBand() - rectPadding)
        .attr('height', function (d) {
          return height - margin.top - margin.bottom - yScale(d)
        })

      // 添加x轴
      svg.append('g')
        .attr('class', style['axis'])
        .attr('transform', 'translate(' + margin.left + ',' + (height - margin.bottom) + ')')
        .call(xAxis)

      // 添加y轴
      svg.append('g')
        .attr('class', style['axis'])
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .call(yAxis)

      // const path = d3.line()
      //   .x((d, i) => scale.x(i))
      //   .y(d => scale.y(d));
      // this.line = path(this.data);
    }
  },
  ready () {
    this.DrawBarChart()
  }
}
