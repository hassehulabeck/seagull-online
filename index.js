var express = require('express')
var app = express()
var mysql = require('mysql')
var pw = require('./pw.js')

let pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: pw.user,
    password: pw.password,
    database: 'IKFiskmåsen'
})

let query = "SELECT * FROM members WHERE id=?"
let userID

app.get('/', (req, res) => {
    userID = req.query.id
    pool.getConnection((err, connection) => {
        connection.query(query, [userID], (error, result, fields) => {
            connection.release()

            // Kolla om error, behandla resultatet.
            if (error) throw error

            res.json(result)

        })
    })
})

app.listen(3000, () => {
    console.log("Lyssnar")
})