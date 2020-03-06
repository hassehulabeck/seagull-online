const express = require('express')
const app = express()
const pool = require('./pool.js')

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile("index.html")
})



module.exports = app