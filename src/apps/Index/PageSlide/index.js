import style from './style.less'
import template from './template.html'
import Reveal from 'reveal.js'

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
    console.log(Reveal)
    Reveal.initialize()
  }
}
