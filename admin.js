const express = require('express')
const app = express()
const pool = require('./pool.js')
// body-parser för att kunna läsa body från en POST.
const bodyParser = require('body-parser')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())

app.get('/', startpage)

function startpage(req, res) {
    console.log(req.resultat)
    res.sendFile(__dirname + "/public/index.html")
}

app.get('/resetAvgifter', reset, startpage)


function reset(req, res, next) {
    let query = `CALL reset_avgifter()`

    pool((err, connection) => {
        connection.query(query, (error, result, fields) => {
            connection.release()

            // Kolla om error, behandla resultatet.
            if (error) throw error
            req.resultat = result
            return next()
        })
    })

}


app.post('/addMember', addMember, startpage)

function addMember(req, res, next) {
    let query = `INSERT INTO members (firstName, lastName) VALUES (?,?)`
    let data = req.body
    pool((err, connection) => {
        if (err) throw err
        connection.query(query, [data.fName, data.lName], (error, result, fields) => {
            connection.release()

            // Kolla om error, behandla resultatet.
            if (error) throw error
            req.resultat = result
            return next()
        })
    })
}

module.exports = app