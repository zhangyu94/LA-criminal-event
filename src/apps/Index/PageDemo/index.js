/**
 * Created by huangxinxin on 2017/1/16.
 */
import style from './style.less'
import template from './template.html'
import Container from '../../../components/Container'
import LineChart from '../../../components/LineChart'
import Matrix from '../../../components/Matrix'
import Wordle from '../../../components/Wordle'
import BarChart from '../../../components/BarChart'
import $ from 'jquery'

export default {
  template,
  data () {
    return {
      style,
      barChartOptionCat: null,
      barChartOptionRes: null,
      lineChartOption: null,
      matrixOption: null,
      wordleOption: null
    }
  },
  components: {
    Container,
    LineChart,
    Matrix,
    BarChart,
    Wordle
  },
  methods: {
    DataFilter (filter, data) {
      let DataAfterFilter = []
      let keyList = Object.keys(filter)
      if (keyList.length === 0) {
        DataAfterFilter = data.concat()
      }
      if (keyList.length > 0) {
        data.forEach(function (d) {
          let t = 0
          keyList.forEach(function (k) {
            if (k === 'Time') {
              if (d[ k ].substr(0, 2) in filter[ k ]) {
                t++
              }
            }
            if (k !== 'Time') {
              if (d[ k ] in filter[ k ]) {
                t++
              }
            }
          })
          if (t === keyList.length) {
            DataAfterFilter.push(d)
          }
        })
      }
      // console.log('DataAfterFilter-->', DataAfterFilter)
      return DataAfterFilter
    },
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
      // let totalSet = []
      data.forEach(function (d, i) {
        itemList.push({ DayOfWeek: d.DayOfWeek, Time: d.Time.substr(0, 2) })
        if (CategoryList.indexOf(d.Category) === -1) {
          CategoryList.push(d.Category)
        }
      })

      // CategoryList.forEach(function (d) {
      //   itemSet[ d ] = []
      // })

      itemList.forEach(function (d) {
        let isIn = false
        itemSet.forEach(function (c) {
          if (c.DayOfWeek === d.DayOfWeek && c.Time === d.Time) {
            c.number++
            isIn = true
          }
        })
        if (isIn === false) {
          itemSet.push({ DayOfWeek: d.DayOfWeek, Time: d.Time, number: 1 })
        }

        // let isInTotal = false
        // totalSet.forEach(function (c) {
        //   if (d.DayOfWeek === c.DayOfWeek && d.Time === c.Time) {
        //     c.number++
        //     isInTotal = true
        //   }
        // })
        // if (isInTotal === false) {
        //   totalSet.push({ DayOfWeek: d.DayOfWeek, Time: d.Time, number: 1 })
        // }
      })
      // itemSet[ 'total' ] = totalSet
      console.log('MatrixDataProcess-->', itemSet)

      return itemSet
    },
    calCloudData (data, topN, filter) {
      let dict = {}
      for (let i = 0; i < data.length; ++i) {
        let curDescript = data[ i ].Descript
        if (typeof (curDescript) === 'undefined') { continue }
        if (i === 0) {
          console.log(curDescript)
        }
        let curList = curDescript.replace(/\(|\)|,/g, '').split(' ')
        for (let j = 0; j < curList.length; ++j) {
          let curWord = curList[ j ]
          if (curWord in dict) {
            dict[ curWord ]++
          } else {
            let meaninglessWordDict = { 'A': 1, 'OF': 1, 'OR': 1, 'FROM': 1 }
            if (!(curWord in meaninglessWordDict)) {
              dict[ curWord ] = 1
            }
          }
        }
      }
      let countList = []
      for (let word in dict) {
        countList.push(dict[word])
      }
      let sortList = countList.sort(function (a, b) { return b - a }) // 直接sort是排序字符串，所以需要写compare函数
      sortList = sortList.slice(0, topN - 1)
      let cloudData = {}
      for (let word in dict) {
        let curCount = dict[ word ]
        for (let i = 0; i < sortList.length; ++i) {
          if (curCount === sortList[ i ]) {
            cloudData[ word ] = curCount
          }
        }
      }
      return cloudData
    },

    CrimeCategoryData (data) {
      let Category = []
      let CategoryCount = []
      let dictCategory = {}
      for (let i = 0; i < data.length; i++) {
        let curCategory = data[ i ].Category
        if (curCategory in dictCategory) {
          dictCategory[ curCategory ]++
        } else {
          dictCategory[ curCategory ] = 1
        }
      }

      for (let category in dictCategory) {
        Category.push(category)
        // let curCount = dictCategory[category]
        // CategoryData[i][0] = category
        // CategoryData[i][1] = dictCategory[category]
        // i++
      }
      for (let i = 0; i < Category.length; i++) {
        CategoryCount[ i ] = dictCategory[ Category[ i ] ]
      }

      let CategoryData = []
      for (let i = 0; i < Category.length; i++) {
        CategoryData.push({ data: CategoryCount[ i ], keyword: Category[ i ] })
      }
      // console.log(CategoryData)
      return [ CategoryData, CategoryCount ]
    },
    CrimeResolutionData (data) {
      let Resolution = []
      let ResolutionCount = []
      let dictResolution = {}
      for (let i = 0; i < data.length; i++) {
        let curResolution = data[ i ].Resolution
        if (curResolution in dictResolution) {
          dictResolution[ curResolution ]++
        } else {
          dictResolution[ curResolution ] = 1
        }
      }

      for (let resolution in dictResolution) {
        Resolution.push(resolution)
      }
      for (let i = 0; i < Resolution.length; i++) {
        ResolutionCount[ i ] = dictResolution[ Resolution[ i ] ]
      }

      let ResolutionData = []
      for (let i = 0; i < Resolution.length; i++) {
        ResolutionData.push({ data: ResolutionCount[ i ], keyword: Resolution[ i ] })
      }
      // console.log(ResolutionData)
      return [ ResolutionData, ResolutionCount ]
    },

    getIncidentData () {
      $.getJSON('/api/get_incident_san_francisco', (data) => {
        console.log('incident=>', data)
        let filter = {
          // 'Date': { '11/25/2016': 1 },
          // 'DayOfWeek': { 'Friday': 1 },
          // 'Time': { '18': 1 },
          // 'Category': { 'NON-CRIMINAL': 1 },
          // 'Resolution': { 'LOCATED': 1 }
        }
        // console.log('filter-->', filter)
        let DataFilter = this.DataFilter(filter, data)
        let MatrixData = this.MatrixDataProcess(DataFilter)
        let TimeList = this.CalTimeList(data)
        let DayOfWeekList = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]
        this.matrixOption = {
          data: MatrixData,
          DayOfWeekList: DayOfWeekList,
          TimeList: TimeList
        }
        // console.log('matrix===>',MatrixData)
        let cloudData = this.calCloudData(data, 10, [])
        this.wordleOption = {
          data: cloudData,
          wordCloudFont: 'Algerian',
          wordSize: '40'
        }
      })
        this.calMatrixOption(data)
        // console.log('matrix===>',MatrixData)
        this.calWordleOption(data)
        this.calBarChartOption(data)
      }
    },
    calMatrixOption (data) {
      let MatrixData = this.MatrixDataProcess(data)
      let TimeList = this.CalTimeList(data)
      let DayOfWeekList = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]
      this.matrixOption = {
        data: MatrixData,
        DayOfWeekList: DayOfWeekList,
        TimeList: TimeList
      }
    },
    calWordleOption (data) {
      let cloudData = this.calCloudData(data, 10, [])
      this.wordleOption = {
        data: cloudData,
        wordCloudFont: 'Algerian',
        wordSize: '40'
      }
    },
    calBarChartOption (data) {
      // console.log('incident=>', data)
      let [ categoryData, catCount ] = this.CrimeCategoryData(data)
      let [ resolutionData, resCount ] = this.CrimeResolutionData(data)
      this.barChartOptionCat = {
        in: categoryData,
        count: catCount,
        jud: true
      }
      this.barChartOptionRes = {
        in: resolutionData,
        count: resCount,
        jud: true
      }
      // console.log(resolutionData)
    },
    getLineChartViewData () {
      $.getJSON('/api/get_aqi_beijing', (data) => {
        // console.log('air=>', data)
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
    // this.getLineChartViewData()
  }
}
