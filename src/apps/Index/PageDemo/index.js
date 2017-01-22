/**
 * Created by huangxinxin on 2017/1/16.
 */
import style from './style.less'
import template from './template.html'
import Wordle from '../../../components/Wordle'
import BarChart from '../../../components/BarChart'
import $ from 'jquery'

export default {
  template,
  data () {
    return {
      style,
      wordleOption: null,
      barChartOptionCat: null,
      barChartOptionRes: null
    }
  },
  components: {
    BarChart,
    Wordle
  },
  methods: {
    calCloudData (data, topN, filter) {
      let dict = {}
      for (let i = 0; i < data.length; ++i) {
        let curDescript = data[i].Descript
        if (typeof (curDescript) === 'undefined') { continue }
        if (i === 0) {
          console.log(curDescript)
        }
        let curList = curDescript.replace(/\(|\)|,/g, '').split(' ')
        for (let j = 0; j < curList.length; ++j) {
          let curWord = curList[j]
          if (curWord in dict) {
            dict[curWord]++
          } else {
            let meaninglessWordDict = {'A': 1, 'OF': 1, 'OR': 1, 'FROM': 1}
            if (!(curWord in meaninglessWordDict)) {
              dict[curWord] = 1
            }
          }
        }
      }
      let countList = []
      for (let word in dict) {
        countList.push(+dict[word])
      }
      let sortList = countList.sort(function (a, b) { return b - a })
      sortList = sortList.slice(0, topN - 1)
      let cloudData = {}
      for (let word in dict) {
        let curCount = dict[word]
        for (let i = 0; i < sortList.length; ++i) {
          if (curCount === sortList[i]) {
            cloudData[word] = curCount
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
        let curCategory = data[i].Category
        if (curCategory in dictCategory) {
          dictCategory[curCategory]++
        } else {
          dictCategory[curCategory] = 1
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
        CategoryCount[i] = dictCategory[Category[i]]
      }

      let CategoryData = []
      for (let i = 0; i < Category.length; i++) {
        CategoryData.push({ data: CategoryCount[i], keyword: Category[i] })
      }
      // console.log(CategoryData)
      return [CategoryData, CategoryCount]
    },
    CrimeResolutionData (data) {
      let Resolution = []
      let ResolutionCount = []
      let dictResolution = {}
      for (let i = 0; i < data.length; i++) {
        let curResolution = data[i].Resolution
        if (curResolution in dictResolution) {
          dictResolution[curResolution]++
        } else {
          dictResolution[curResolution] = 1
        }
      }

      for (let resolution in dictResolution) {
        Resolution.push(resolution)
      }
      for (let i = 0; i < Resolution.length; i++) {
        ResolutionCount[i] = dictResolution[Resolution[i]]
      }

      let ResolutionData = []
      for (let i = 0; i < Resolution.length; i++) {
        ResolutionData.push({ data: ResolutionCount[i], keyword: Resolution[i] })
      }
      // console.log(ResolutionData)
      return [ResolutionData, ResolutionCount]
    },

    getIncidentData () {
      $.getJSON('/api/get_incident_san_francisco', (data) => {
        console.log('incident=>', data)
        let cloudData = this.calCloudData(data, 10, [])
        this.wordleOption = {
          data: cloudData,
          wordCloudFont: 'Algerian',
          wordSize: '40'
        }
      })
    },

    getBarChartData () {
      $.getJSON('/api/get_incident_san_francisco', (data) => {
        // console.log('incident=>', data)
        let [categoryData, catCount] = this.CrimeCategoryData(data)
        let [resolutionData, resCount] = this.CrimeResolutionData(data)
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
      })
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
    this.getBarChartData()
    // this.getLineChartViewData()
  }
}
