const express = require('express')
const app = express()
const pool = require('./pool.js')


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


module.exports = app