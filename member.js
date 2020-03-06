const express = require('express')
const app = express()
const pool = require('./pool.js')

app.get('/', (req, res) => {

    // Ternary operator på actString utifrån query i URLen.
    // För att kunna serva både /members och /members?activity=3
    let actString = req.query.activity ? " activity = ?" : " ?"
    let activity = req.query.activity ? [req.query.activity] : [1]

    let query = `SELECT firstName, lastName, teams.name, activities.name 
    FROM members
    JOIN members_teams ON members_teams.memberID = members.id
    JOIN teams ON members_teams.teamID = teams.id
    JOIN activities ON activities.id = teams.activity
    WHERE` + actString

    pool((err, connection) => {
        // Arrayen som innehåller userID innehåller de värden som kommer att ersätta frågetecknet.
        connection.query(query, [activity], (error, result, fields) => {
            connection.release()

            // Kolla om error, behandla resultatet.
            if (err) throw err

            res.json(result)

        })
    })
})

module.exports = app