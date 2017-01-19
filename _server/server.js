/**
 * Created by huangxinxin on 2017/1/18.
 */

var express = require('express')
var server = express()
var aqiBeijingJson = require('./data/aqi-beijing.json')
var incidentSFJson = require('./data/SFPD_Incident.json')

server.get('/api/get_aqi_beijing', function (req, res) {
  res.json(aqiBeijingJson)
})

server.get('/api/get_incident_san_francisco', function (req, res) {
  res.json(incidentSFJson)
})

server.listen(8888, '127.0.0.1', function (err) {
  if (err) {
    console.log(err)
  }
  console.log('Server is running...')
})

