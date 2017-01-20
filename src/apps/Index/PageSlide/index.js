import style from './style.less'
import template from './template.html'
import Reveal from 'reveal.js'
import 'reveal.js/css/reveal.css'
import 'reveal.js/css/theme/white.css'

export default {
  template,
  data () {
    return {
      style
    }
  },
  components: {

  },
  methods: {

  },
  created () {

  },
  ready () {
    Reveal.initialize()
  }
}
