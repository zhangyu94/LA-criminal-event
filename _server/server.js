/**
 * Created by huangxinxin on 2017/1/18.
 */
var express = require('express')
var server = express()
var aqiBeijingJson = require('./data/aqi-beijing.json')

server.get('/api/get_aqi_beijing', function (req, res) {
  res.json(aqiBeijingJson)
})

server.listen(8888, '127.0.0.1', function (err) {
  console.log('Server is runngin...')
})
