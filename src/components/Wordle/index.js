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
      elId: `Wordle-${(+new Date())}-${~~(Math.random() * 100 * 1000 * 1000)}`
    }
  },

  watch: {
    chartOption () {
      console.log('watch')
      this.render()
    }
  },

  methods: {
    render () {
      if (!this.chartOption) {
        return
      }
      let wordCloudFont = this.chartOption.wordCloudFont
      let wordSize = this.chartOption.wordSize
      let cloudData = []
      for (let word in this.chartOption.data) {
        cloudData.push(word)
      }

      function calSvgSize (d3SelectSvg) {
        var strWidth = d3SelectSvg.style('width')
        var svgWidth = strWidth.substring(0, strWidth.length - 2)
        var strHeight = d3SelectSvg.style('height')
        var svgHeight = strHeight.substring(0, strHeight.length - 2)
        return [svgWidth, svgHeight]
      }

      function drawCloud (data, svg) {
        let [svgWidth, svgHeight] = calSvgSize(svg)
        svg.selectAll('g')
          .data(['cloud-g'])
          .enter().append('g')
            .attr('transform', 'translate(' + svgWidth / 2 + ',' + svgHeight / 2 + ')')
          .selectAll('text')
          .data(data)
          .enter().append('text')
            .style('font-size', function (d) { return d.size + 'px' })
            .style('font-family', function (d) { return d.font })
            .style('fill', 'black')
            .attr('text-anchor', 'middle')
            .attr('transform', function (d) {
              return 'translate(' + [ d.x, d.y ] + ')rotate(' + d.rotate + ')'
            })
            .text(function (d) { return d.text })
      }
      let svg = d3.select('#' + this.elId)
        .select('svg')
      let [svgWidth, svgHeight] = calSvgSize(svg)
      cloud().size([ svgWidth, svgHeight ])
        .words(cloudData.map(function (d, i) { return { text: d, size: wordSize } }))
        .rotate(function () { return 0 })
        .font(wordCloudFont)
        .fontSize(function (d) { return d.size })
        .on('end', function (d) { drawCloud(d, svg) })
        .start()
    }
  },
  ready () {
    this.render()
  }
}
