import style from './style.less'
import template from './template.html'
import Reveal from 'reveal.js'
import 'reveal.js/css/reveal.css'
import 'reveal.js/css/theme/white.css'
import d3 from 'd3'
import $ from 'jquery'

export default {
  template,
  data () {
    return {
      style
    }
  },
  components: {},
  methods: {
    renderTest () {
      var data = [ 44, 28, 15, 16, 23, 5 ]
      var width = 420
      var barHeight = 20

      var x = d3.scale.linear()
        .domain([ 0, d3.max(data) ])
        .range([ 0, width ])

      var chart = d3.select('.chart')
        .attr('width', width)
        .attr('height', barHeight * data.length)

      var bar = chart.selectAll('g')
        .data(data)
        .enter().append('g')
        .attr('transform', function (d, i) { return 'translate(0,' + i * barHeight + ')' })

      bar.append('rect')
        .attr('width', x)
        .attr('height', barHeight - 1)
        .on('click', function (d, i) {
          console.log(d, 'click')
          console.log(d3.select(this))
          d3.select(this)
            .style('fill', 'red')
        })

      bar.append('text')
        .attr('x', function (d) { return x(d) - 3 })
        .attr('y', barHeight / 2)
        .attr('dy', '.35em')
        .text(function (d) { return d })
    }
  },
  created () {

  },
  ready () {
    Reveal.initialize()
    console.log('jquery', $('main'))
    // this.renderTest()
  }
}
