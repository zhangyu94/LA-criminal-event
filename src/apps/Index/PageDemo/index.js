/**
 * Created by huangxinxin on 2017/1/16.
 */
import style from './style.less'
import template from './template.html'
import LineChart from '../../../components/LineChart'
import Matrix from '../../../components/Matrix'
import $ from 'jquery'

export default {
  template,
  data () {
    return {
      style,
      lineChartOption: null,
      matrixOption: null
    }
  },
  components: {
    LineChart,
    Matrix
  },
  methods: {
    CalTimeList (data) {
      let TimeList = []
      data.forEach(function (d, i) {
        if (TimeList.indexOf(d.Time.substr(0, 2)) === -1) {
          TimeList.push(d.Time.substr(0, 2))
        }
      })
      TimeList.sort()
      return TimeList
    },
    MatrixDataProcess (data) {
      let itemList = []
      let itemSet = []
      let CategoryList = []
      let totalSet = []
      data.forEach(function (d, i) {
        itemList.push({ DayOfWeek: d.DayOfWeek, Time: d.Time.substr(0, 2), Category: d.Category })
        if (CategoryList.indexOf(d.Category) === -1) {
          CategoryList.push(d.Category)
        }
      })

      CategoryList.forEach(function (d) {
        itemSet[ d ] = []
      })

      itemList.forEach(function (d) {
        let isIn = false
        itemSet[ d.Category ].forEach(function (c) {
          if (c.DayOfWeek === d.DayOfWeek && c.Time === d.Time) {
            c.number++
            isIn = true
          }
        })
        if (isIn === false) {
          itemSet[ d.Category ].push({ DayOfWeek: d.DayOfWeek, Time: d.Time, number: 1 })
        }

        let isInTotal = false
        totalSet.forEach(function (c) {
          if (d.DayOfWeek === c.DayOfWeek && d.Time === c.Time) {
            c.number++
            isInTotal = true
          }
        })
        if (isInTotal === false) {
          totalSet.push({ DayOfWeek: d.DayOfWeek, Time: d.Time, number: 1 })
        }
      })
      itemSet[ 'total' ] = totalSet
      console.log('MatrixDataProcess-->', itemSet)

      return itemSet
    },
    getIncidentData () {
      $.getJSON('/api/get_incident_san_francisco', (data) => {
        console.log('incident=>', data )
        let MatrixData = this.MatrixDataProcess(data)
        let TimeList = this.CalTimeList(data)
        let DayOfWeekList = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]
        this.matrixOption = {
          data: MatrixData,
          DayOfWeekList: DayOfWeekList,
          TimeList: TimeList
        }
        // console.log('matrix===>',MatrixData)
      })
    },

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
    this.getIncidentData()
    this.getLineChartViewData()
  }
}
