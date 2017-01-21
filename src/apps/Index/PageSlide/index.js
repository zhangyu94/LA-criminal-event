import style from './style.less'
import template from './template.html'
import Reveal from 'reveal.js'
import 'reveal.js/css/reveal.css'
import 'reveal.js/css/theme/white.css'
// import d3 from 'd3'
import $ from 'jquery'
import {markedContainer} from '../../../vuex/getters'

export default {
  template,
  vuex: {
    getters: {
      markedContainer
    }
  },
  data () {
    return {
      style
    }
  },
  watch: {
    markedContainer () {
      console.log('PageSlide markedContainer', this.markedContainer)
      this.appendSlide(this.markedContainer)
    }
  },
  components: {},
  methods: {
    appendSlide (nodeId) {
      if (nodeId === null) {
        return
      }
      console.log('appendslide')
      var node = document.getElementById(nodeId).cloneNode(true)
      $('#sect2').append(node)
    }
  },
  created () {

  },
  ready () {
    console.log('PageSlide render markedContainer', this.markedContainer)
    this.appendSlide(this.markedContainer)
    Reveal.initialize()
  }
}
