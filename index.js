const express = require('express')
const app = express()
const memberRoutes = require('./member.js')
const adminRoutes = require('./admin.js')


app.get('/', (req, res) => {
    res.send("/members för medlemmar som har någon aktivitet, /members?activity=2 för alla medlemmar som håller på med skidor.")
})

app.use('/members', memberRoutes)

app.use('/admin', adminRoutes)

app.listen(3000, () => {
    console.log("Lyssnar")
})