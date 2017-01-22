import style from './style.less'
import template from './template.html'
import d3 from 'd3'
import '../../../node_modules/leaflet/dist/leaflet.css'
import 'leaflet'
import '../../../node_modules/leaflet.heat/dist/leaflet-heat.js'
// import 'L.D3SvgOverlay'
// import '../../../node_modules/leaflet-d3-svg-overlay/node_modules/leaflet/dist/leaflet.js'
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
        map = L.map(this.elId, { center: [ 37.75, -122.449357 ], zoom: 11.5 })
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
        for (let i = 0; i < gData.length; i++) {
          // if (gData[ i ].timestamp >= timeStart && gData[ i ].timestamp <= timeEnd) {
          gData[ i ].flag = String(gData[ i ].X) + String(gData[ i ].Y)
          quakePoints.push(gData[ i ].latLng)
          cities.push(gData[ i ])
          if (!merge[ gData[ i ].latLng ]) {
            merge[ gData[ i ].latLng ] = []
          }
          merge[ gData[ i ].latLng ].push(gData[ i ])
          // }
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
        console.log(window.d3SvgOverlay)
        // console.log(window.d3SvgOverlay)
        // let citiesOverlay = L.d3SvgOverlay()
        // citiesOverlay.addTo(self.map)
      }
    }
  },
  ready () {
    this.render()
  }
}
