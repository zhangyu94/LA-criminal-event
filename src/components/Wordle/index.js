import style from './style.less'
import template from './template.html'
import d3 from 'd3'
import cloud from 'd3-cloud'

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
      console.log('cloud', cloud)

      var wordCloudFont = 'Algerian'
      var subjectNames = [ 'Agric.', 'Arch', 'Area& Eth.', 'Arts', 'Business', 'Commun, Fam.', 'Communications', 'CS & Math', 'Education', 'Eng. Tech.', 'Engineering', 'Language', 'Health Adm.', 'Health Sci & Tech', 'Philosophy', 'Repair& Prod.', 'Bio & Physical', 'Social & Law' ]

      function drawCloud (data, svg) {
        console.log('clouddata', data)
        svg.selectAll('text')
          .data(data)
          .enter().append('text')
          .style('font-size', function (d) { return d.size + 'px' })
          .style('fill', 'red')
          .attr('text-anchor', 'middle')
          .attr('transform', function (d) {
            return 'translate(' + [ d.x, d.y ] + ')rotate(' + d.rotate + ')'
          })
          .text(function (d) { return d.text })
      }

      var svg = d3.select(document.getElementById(this.elId))
        .append('svg')

      cloud().size([ 1180, 750 ])
        .words(subjectNames.map(function (d, i) { return { text: d, size: 15 + 60 } }))
        .rotate(function () { return 0 })
        .font(wordCloudFont)
        .fontSize(function (d) { return d.size })
        .on('end', function (d) { drawCloud(d, svg) })
        .start()

      if (this.chartOption) {
        console.log(this.chartOption)
        console.log('d3', d3)
      }
    }
  },
  ready () {
    this.render()
  }
}
