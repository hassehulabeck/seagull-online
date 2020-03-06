const express = require('express')
const app = express()
const pool = require('./pool.js')

// Denna query använder en placeholder (frågetecknet)
let query = "SELECT * FROM members WHERE id=?"
let userID

app.get('/', (req, res) => {
    userID = req.query.id
    pool((err, connection) => {
        // Arrayen som innehåller userID innehåller de värden som kommer att ersätta frågetecknet.
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