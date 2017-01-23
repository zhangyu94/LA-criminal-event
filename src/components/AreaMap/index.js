import style from './style.less'
import template from './template.html'
import d3 from 'd3'
import '../../../node_modules/leaflet/dist/leaflet.css'
// import D3SvgOverlay from '../../../node_modules/leaflet-d3-svg-overlay/L.D3SvgOverlay'
import 'leaflet'
import 'leaflet-d3-svg-overlay'
import '../../../node_modules/leaflet.heat/dist/leaflet-heat.js'
// import 'L.D3SvgOverlay'
// import D3SvgOverlay from '../../../node_modules/leaflet-d3-svg-overlay/node_modules/leaflet/dist/leaflet.js'
// import '../../../node_modules/leaflet-d3-svg-overlay/node_modules/leaflet/dist/leaflet.css'
// import '../../../node_modules/leaflet-d3-svg-overlay/node_modules/leaflet/dist/leaflet-src.js'

const L = window.L
console.log(window.L)
export default {
  template,
  props: [ 'mapOption' ],
  data () {
    return {
      style,
      elId: `AreaMap-${(+new Date())}-${Math.random() * 100 * 1000 * 1000}`
    }
  },
  watch: {
    mapOption () {
      this.render()
    }
  },
  methods: {
    render () {
      if (this.mapOption) {
        console.log('mapView', this.mapOption)
        console.log('d3', d3)
        let gData = this.mapOption
        let map
        map = L.map(this.elId, { center: [ 37.75, -122.449357 ], zoom: 12 })
        let accessToken = 'pk.eyJ1IjoieWV0YW5nemhpIiwiYSI6ImNpajFrdmJ1aDAwYnF0b2x6cDA2bndybjgifQ.g9phAioL8kT5ik4jGg6kNQ'
        let style = 'emerald' // emerald,light,dark
        let tileLayer = L.tileLayer('https://api.mapbox.com/v4/mapbox.' + style + '/{z}/{x}/{y}.png?access_token=' + accessToken).addTo(map)
        console.log(tileLayer)
        let heatData = []
        for (let i = 0; i < this.mapOption.length; i++) {
          heatData.push([ +this.mapOption[ i ].Y, +this.mapOption[ i ].X ])
        }
        let cities = gData.map(function (d) {
          d.X = +d.X
          d.Y = +d.Y
          d.latLng = [ d.Y, d.X ]
          d.timestamp = Date.parse(new Date(d.Date + ' ' + d.Time))
          return d
        })
        gData = cities
        cities = []
        // console.log(gData)
        let merge = {}
        let quakePoints = []
        let timeStart = Date.parse('11/25/2016 00:00')
        let timeEnd = Date.parse('11/30/2016 00:00')
        for (let i = 0; i < gData.length; i++) {
          if (gData[ i ].timestamp >= timeStart && gData[ i ].timestamp <= timeEnd) {
            gData[ i ].flag = String(gData[ i ].X) + String(gData[ i ].Y)
            quakePoints.push(gData[ i ].latLng)
            cities.push(gData[ i ])
            if (!merge[ gData[ i ].latLng ]) {
              merge[ gData[ i ].latLng ] = []
            }
            merge[ gData[ i ].latLng ].push(gData[ i ])
          }
        }
        let calData = []
        for (let key in merge) {
          let loc = key.split(',')
          loc[ 0 ] = +loc[ 0 ]
          loc[ 1 ] = +loc[ 1 ]
          calData.push({ 'latLng': loc, 'data': merge[ key ] })
        }
        cities = calData
        L.heatLayer(quakePoints, {
          radius: 10,
          blur: 15,
          maxZoom: 17
        }).addTo(map)
        let citiesOverlay = L.d3SvgOverlay((sel, proj) => {
          console.log('in overlay')
          // d3.selectAll('.trajpoint').remove()
          console.log(cities)
          let citiesUpd = sel.selectAll('circle').data(cities)
          citiesUpd.enter()
            .append('circle')
            .attr('class', 'trajpoint')
            .attr('r', function (d) {
              return Math.log2(d.data.length + 4) / proj.scale
            })
            .attr('cx', function (d) { return proj.latLngToLayerPoint(d.latLng).x })
            .attr('cy', function (d) { return proj.latLngToLayerPoint(d.latLng).y })
            .attr('fill', 'blue')
            .on('mouseover', function (d) {
              d3.select(this)
                .style('cursor', 'pointer')
                .style('opacity', 0.6)
                .style('fill', 'blue')
            })
            .append('title')
            .text(function (d) {
              var name = 'Total event number: ' + String(d.data.length) + '\n'
              var allCat = {}
              for (let i = 0; i < d.data.length; i++) {
                if (d.data[ i ].Category in allCat) {
                  allCat[ d.data[ i ].Category ] += 1
                } else {
                  allCat[ d.data[ i ].Category ] = 1
                }
              }
              let i = 1
              for (var index in allCat) {
                name = name + String(i) + '.' + index + ' ' + allCat[ index ] + '\n'
                i += 1
              }
              return name
            })
        })
        citiesOverlay.addTo(map)
      }
    }
  },
  ready () {
    this.render()
  }
}
