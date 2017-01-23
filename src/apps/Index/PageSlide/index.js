import style from './style.less'
import template from './template.html'
import Reveal from 'reveal.js'
import 'reveal.js/css/reveal.css'
import 'reveal.js/css/theme/white.css'
// import d3 from 'd3'
// import $ from 'jquery'
import {markedContainerList} from '../../../vuex/getters'

export default {
  template,
  vuex: {
    getters: {
      markedContainerList
    }
  },
  data () {
    return {
      style
    }
  },
  watch: {
    markedContainer () {
      this.LOGS.log('PageSlide markedContainer', this.markedContainerList)
      // Reveal.initialize()
    }
  },
  components: {},
  methods: {

  },
  created () {
    this.LOGS.log('My Name1', 123, 456, 788, { a: 123 })
  },
  ready () {
    this.LOGS.log('PageSlide render markedContainer', this.markedContainerList)
    Reveal.initialize()
  }
}
