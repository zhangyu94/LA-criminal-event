/**
 * Created by huangxinxin on 2017/1/16.
 */
import style from './style.less'
import template from './template.html'
import BarChart from '../../../components/BarChart'
import $ from 'jquery'

export default {
  template,
  data () {
    return {
      style,
      lineChartOption: null,
      dataSet: [ 10, 20, 30, 40, 33, 24, 12, 5, 100, 35 ]
      // barcharOption: null
    }
  },
  components: {
    // LineChart,
    BarChart
  },
  methods: {
    // getIncidentData () {
    //   $.getJSON('/api/get_incident_san_francisco', (data) => {
    //     console.log('incident=>', data)
    //   })
    // },

    // getBarChartData () {
    //   $.getJSON('/api/get_incident_san_francisco', (data) => {
    //     console.log('incident=>', data)
    //     let category = []
    //     for (var i = 0; i < 20; i++) {
    //       category[i] = 0
    //     }
    //     for (i = 0; i < data.length; i++) {
    //       if (data[i].Category === 'NON-CRIMINAL') {
    //         category[0] = category[0] + 1
    //       } else if (data[i].Category === 'MISSING PERSON') {
    //         category[1] = category[1] + 1
    //       } else if (data[i].Category === 'VEHICLE THEFT') {
    //         category[2] = category[1] + 1
    //       } else if (data[i].Category === 'ROBBERY') {
    //         category[3] = category[1] + 1
    //       } else if (data[i].Category === 'ASSAULT') {
    //         category[4] = category[1] + 1
    //       } else if (data[i].Category === 'OTHER OFFENSES') {
    //         category[5] = category[1] + 1
    //       } else if (data[i].Category === 'WARRANTS') {
    //         category[6] = category[1] + 1
    //       } else if (data[i].Category === 'SUSPICIOUS OCC') {
    //         category[7] = category[1] + 1
    //       } else if (data[i].Category === 'WEAPON LAWS') {
    //         category[8] = category[1] + 1
    //       } else if (data[i].Category === 'FRAUD') {
    //         category[9] = category[1] + 1
    //       } else if (data[i].Category === 'LARCENY/THEFT') {
    //         category[10] = category[1] + 1
    //       } else if (data[i].Category === 'BURGLARY') {
    //         category[11] = category[1] + 1
    //       } else if (data[i].Category === 'DRUG/NARCOTIC') {
    //         category[12] = category[1] + 1
    //       } else if (data[i].Category === 'VANDALISM') {
    //         category[13] = category[1] + 1
    //       } else if (data[i].Category === 'SECONDARY CODES') {
    //         category[14] = category[1] + 1
    //       } else if (data[i].Category === 'DISORDERLY CONDUCT') {
    //         category[15] = category[1] + 1
    //       } else if (data[i].Category === 'TRESPASS') {
    //         category[16] = category[1] + 1
    //       } else if (data[i].Category === 'PROSTITUTION') {
    //         category[17] = category[1] + 1
    //       } else if (data[i].Category === 'SEX OFFENSES, FORCIBLE') {
    //         category[18] = category[1] + 1
    //       } else if (data[i].Category === 'RECOVERED VEHICLE') {
    //         category[19] = category[1] + 1
    //       }
    //     }
    //   })
    // },

    getLineChartViewData () {
      $.getJSON('/api/get_aqi_beijing', (data) => {
        console.log('air=>', data)
        this.lineChartOption = {
          title: {
            text: 'Beijing AQI'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            data: data.map(function (item) {
              return item[ 0 ]
            })
          },
          yAxis: {
            splitLine: {
              show: false
            }
          },
          toolbox: {
            left: 'center',
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          dataZoom: [ {
            startValue: '2014-06-01'
          }, {
            type: 'inside'
          } ],
          visualMap: {
            top: 10,
            right: 10,
            pieces: [ {
              gt: 0,
              lte: 50,
              color: '#096'
            }, {
              gt: 50,
              lte: 100,
              color: '#ffde33'
            }, {
              gt: 100,
              lte: 150,
              color: '#ff9933'
            }, {
              gt: 150,
              lte: 200,
              color: '#cc0033'
            }, {
              gt: 200,
              lte: 300,
              color: '#660099'
            }, {
              gt: 300,
              color: '#7e0023'
            } ],
            outOfRange: {
              color: '#999'
            }
          },
          series: {
            name: 'Beijing AQI',
            type: 'line',
            data: data.map(function (item) {
              return item[ 1 ]
            }),
            markLine: {
              silent: true,
              data: [ {
                yAxis: 50
              }, {
                yAxis: 100
              }, {
                yAxis: 150
              }, {
                yAxis: 200
              }, {
                yAxis: 300
              } ]
            }
          }
        }
      })
    },
    onChartClick (params) {
      console.log('我收到了', params)
    }
  },
  created () {
    // this.getIncidentData()
    this.getLineChartViewData()
  }
}
