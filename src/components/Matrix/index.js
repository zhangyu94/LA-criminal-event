import style from './style.less'
import template from './template.html'
import d3 from 'd3'
import $ from 'jquery'

export default {
  template,
  props: [ 'chartOption' ],
  data () {
    return {
      style,
      elId: `Matrix-${(+new Date())}-${Math.random() * 100 * 1000 * 1000}`
    }
  },

  watch: {
    chartOption () {
      this.render()
    }
  },

  methods: {
    render () {
      if (!this.chartOption) {
        return
      }
      let matrixData = this.chartOption
      console.log('new-->', matrixData.data)
      // let margin = {top: 20, right: 20, bottom: 20, left: 20},
      let width = this.$el.clientWidth
      let height = this.$el.clientHeight
      let gridWidth = width / matrixData.TimeList.length
      let gridHeight = height / matrixData.DayOfWeekList.length
        // legendElementWidth = gridSize*2,
        // buckets = 9,
      let colors = ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58']// alternatively colorbrewer.YlGnBu[9]

// 	let matrix_tip = d3.tip()
//       .attr('class', 'd3-tip')
//       .offset([-3, 0]) .html(function(d) {
//         return '<strong>SubjectRanking:</strong> <span style='color:orange'>' + d.SubjectRanking + '</span></br>' +
//             '<strong> SubjectScore:</strong> <span style='color:orange'>'+ d.SubjectScores+'</span>';
//       });
      let svg = d3.select(this.$el).select('svg')
        // .append('g')
        // .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

//       let svg = d3.select(this.$el).append('svg')
//         .attr('width', width + margin.left + margin.right)
//         .attr('height', height + margin.top + margin.bottom)
//         .append('g')
//         .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//       svg.call(matrix_tip);

      // let DayOfWeek_name = svg.selectAll('.DayOfWeekName')
      //   .data(matrixData.DayOfWeekList)
      //   .enter().append('text')
      //   .text(function (d) { return d.substr(0,3) })
      //   .style('dominant-baseline', 'text-before-edge')
      //   .style('text-anchor', 'end')
      //   .attr('transform', function(d, i){ return 'translate(-6,' + i * gridHeight + ')';})
      //   .attr('class', 'DayOfWeekName');
      //
      // let Time_name = svg.selectAll('.TimeName')
      //   .data(matrixData.TimeList)
      //   .enter().append('text')
      //   .text(function(d) { return d; })
      //   .style('text-anchor', 'start')
      //   .style('dominant-baseline', 'text-before-edge')
      //   .attr('transform', function(d, i){ return 'translate(' + i * gridWidth + ',-10)';})
      //   .attr('class', 'TimeName');
      let myData = matrixData.data

      let colorScale = d3.scale.quantile()
        .domain(d3.extent(matrixData.data, function (d) { return d.number }))
        .range(colors)

      let cards = svg.selectAll('.NumberRect')
        .data(myData)

      cards.enter().append('rect')
        .attr('y', function (d) {
          return $.inArray(d.DayOfWeek, matrixData.DayOfWeekList) * gridHeight
        })
        .attr('x', function (d) {
          return $.inArray(d.Time, matrixData.TimeList) * gridWidth
        })
        .attr('rx', 3)
        .attr('ry', 3)
        .attr('class', 'NumberRect bordered')
        .attr('width', gridWidth - 1)
        .attr('height', gridHeight - 1)
        .style('fill', function (d) { return colorScale(d.number) })
        .style('cursor', 'pointer')

      cards.append('svg:title')
        .text(function (d, i) { return d.number })
      // .on('mouseover', matrix_tip.show)
      // .on('mouseout', matrix_tip.hide);

      // cards.transition().duration(1000)
      //   .style('fill', function(d) { return colorScale(d.number); });

      cards.exit().remove()

      // let legend = svg.selectAll('.legend')
      //   .data([0].concat(colorScale.quantiles()), function(d) { return d; });
      //
      // legend.enter().append('g')
      //   .attr('class', 'legend');
      //
      // legend.append('rect')
      //   .attr('x', function(d, i) { return legendElementWidth * i; })
      //   .attr('y', height)
      //   .attr('width', legendElementWidth)
      //   .attr('height', gridSize / 2)
      //   .style('fill', function(d, i) { return colors[i]; });
      //
      // legend.append('text')
      //   .attr('class', 'legendtext')
      //   .text(function(d) { return '≥ ' + Math.round(d); })
      //   .attr('x', function(d, i) { return legendElementWidth * i; })
      //   .attr('y', height + gridSize);
    }
  },
  ready () {
    this.render()
  }
}
