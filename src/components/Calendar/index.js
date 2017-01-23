/**
 * Created by ASUS on 2017/1/21.
 */

import style from './style.less'
import template from './template.html'
import d3 from 'd3'
import 'jquery'

export default {
  template,
  props: [ 'chartOption' ],
  data () {
    return {
      style,
      elId: `Calendar-${(+new Date())}-${Math.random() * 100 * 1000 * 1000}`
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
        console.log('calendar: no chartOption')
        return
      }
      // let calendarFont = this.chartOption.calendarFont
      let calendarData = {}
      let shiftKey = false

      console.log('hello', this.chartOption.data['2016-11-25'])
      for (let calendarDateData in this.chartOption.data) {
        // calendarData.push([calendarDateData, this.chartOption.data[calendarDateData]])
        calendarData[calendarDateData] = this.chartOption.data[calendarDateData]
      }

      console.log('calendarData', calendarData)

      function calSvgSize (d3SelectSvg) {
        var strWidth = d3SelectSvg.style('width')
        var svgWidth = strWidth.substring(0, strWidth.length - 2)
        var strHeight = d3SelectSvg.style('height')
        var svgHeight = strHeight.substring(0, strHeight.length - 2)
        return [svgWidth, svgHeight]
      }

      /*
      function drawCalendar (data, svg) {
        let [svgWidth, svgHeight] = calSvgSize(svg)
        svg.selectAll('g')
          .data(['calendar-g'])
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
      */

      let svg = d3.select(document.getElementById(this.elId))
        .on('keydown.brush', keyFlip)
        .on('keyup.brush', keyFlip)
        .each(function () { this.focus() })
        .select('svg')
      let [svgWidth, svgHeight] = calSvgSize(svg)
      let calCellWidth = Math.floor(svgWidth / 20) - 1
      let calCellHeight = Math.floor(svgHeight / 7) - 1
      let calFormat = d3.time.format('%Y-%m-%d')
      let calColor = d3.scale.quantize()
        .domain([0, 600])
        .range(d3.range(6)) // .map(function (d) { return 'q' + d + '-6' }))
      let colorArray = ['#1a9850', '#91cf60', '#d9ef8b', '#fee08b', '#fc8d59', '#d73027']

      let calSvg = svg.selectAll('g')
        .data(d3.range(2016, 2017))
        .enter().append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .attr('class', 'RdYlGn calSvg')
        .append('g')
        .attr('transform', 'translate(' + ((svgWidth - calCellWidth * 20) / 2) + ',' + (svgHeight - calCellHeight * 7 - 1) / 2 + ')')

      console.log(svgHeight)
      console.log(svgWidth)
      // console.log(calCellSize)

      let calRect = calSvg.selectAll('.calDay')
        .data(function (d) {
          // console.log(d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
          return d3.time.days(new Date(d, 8, 1), new Date(d + 1, 0, 1))
        })
        .enter().append('rect')
        .attr('class', 'calDay')
        .attr('id', function (d) {
          // console.log('calRect calculate class:', d)
          let dDate = d.getDate()
          let dYear = d.getYear() + 1900
          let dMonth = d.getMonth() + 1
          if (dDate < 10) {
            dDate = '0' + dDate
          }
          if (dMonth < 10) {
            dMonth = '0' + dMonth
          }
          return 'calDay' + dYear + '-' + dMonth + '-' + dDate
        })
        .attr('width', calCellWidth)
        .attr('height', calCellHeight)
        .attr('x', function (d) { return (d3.time.weekOfYear(d) - 34) * calCellWidth })
        .attr('y', function (d) { return d.getDay() * calCellHeight })
        .attr('selected', 'false') // ?
        .style('fill', '#fff') // 是style
        .style('stroke', '#ccc')
        .on('mousedown', function (d) {
          console.log('d3.select(this)', d3.select(this))
          let tmpP = document.getElementById('calDay' + d).getAttribute('selected')
          if (tmpP === 'false') {
            tmpP = 'true'
          } else {
            tmpP = 'false'
          }

          console.log('shiftKey', shiftKey)
          if (shiftKey) {
            console.log('rectShiftKey')
            d3.select(this).classed('selected', d.selected = !d.selected)
          } else {
            document.getElementById('calDay' + d).setAttribute('selected', tmpP)

            // console.log('in rect mousedown d: ', d)
            // console.log(d)
            /* calRect.classed('selected', function (p) {
              p.selected = d === p
              console.log(p.selected)
              return p.selected
            }) */

            // console.log('calSvg.selectAll')
            calSvg.selectAll('.calDay')
              .filter(function (p) {
                let tmpP = document.getElementById('calDay' + p).getAttribute('selected')
                return tmpP === 'false'
              })
              .style('opacity', '.5')
            calSvg.selectAll('.calDay')
              .filter(function (p) {
                let tmpP = document.getElementById('calDay' + p).getAttribute('selected')
                return tmpP === 'true'
              })
              .style('opacity', '1')

            // 为什么不对，以及这段代码究竟是什么意思
            // 有空先把d3样例跑通
            /* calSvg.selectAll(function () { console.log('hello .calDay' + d); return '.calDay' + d })
              .classed('selected', function (p) {
                console.log(p)
                p.selected = d === p
                console.log(p.selected)
                return p.selected
              }) */
          }
        })
        .datum(calFormat)

      console.log('calRect ready')

      calSvg.selectAll('.calMonth')
         .data(function (d) { return d3.time.months(new Date(d, 8, 1), new Date(d + 1, 0, 1)) })
         .enter().append('path')
         .attr('class', 'calMonth')
         .attr('d', calMonthPath)
         .style('fill', 'none')
         .style('stroke', '#000')
         .style('stroke-width', '1px') // 2px

      console.log(calendarData)
      calRect.filter(function (d) { return d in calendarData })
          .style('fill', function (d) {
          /*
          console.log(calColor(calendarData[d]))
          console.log(calendarData[d])

          return 'calDay ' + calColor(calendarData[d])
          */
          // console.log('color-scale', calColor(calendarData[d]))
            return colorArray[calColor(calendarData[d])]
          })

      function calMonthPath (t0) {
        let t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0)
        let d0 = t0.getDay()
        let w0 = d3.time.weekOfYear(t0) - 34
        let d1 = t1.getDay()
        let w1 = d3.time.weekOfYear(t1)
        return 'M' + (w0 + 1) * calCellWidth + ',' + d0 * calCellHeight +
          'H' + w0 * calCellWidth + 'V' + 7 * calCellHeight +
          'H' + w1 * calCellWidth + 'V' + (d1 + 1) * calCellHeight +
          'H' + (w1 + 1) * calCellWidth + 'V' + 0 +
          'H' + (w0 + 1) * calCellWidth + 'Z'
      }

      function keyFlip () {
        shiftKey = d3.event.shiftKey || d3.event.metaKey
      }
    }
  },
  ready () {
    this.render()
  }
}
