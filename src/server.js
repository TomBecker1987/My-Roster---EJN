const express = require('express')
const path = require('path')
const app = express()
const request = require('request');
let teamIDs = require('../teamIDs');



app.use(express.static(path.join(__dirname,'..', 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))


app.get('/teams/:teamName',function(req,res){
    let teamName = req.params.teamName;
    let teamId = teamIDs[teamName]
    request('http://data.nba.net/10s/prod/v1/2016/players.json', function(err, response){
        let data = JSON.parse(response.body).league.standard
        let filteredData = data.filter( o => o.teamId.split(' ')[0] == teamId )
        let newData = []
        for ( let player of filteredData ) {
            let p = {};
            p.firstName = player.firstName;
            p.lastName = player.lastName;
            p.jersey = player.jersey;
            p.pos = player.pos;
            newData.push(p)
        }
        res.send(newData)
    })
})

app.get('/playerStats/:player', function(req,res){
    let player = req.params.player;
    let playerNames = player.split(' ')
    let firstName = playerNames[1]
    let lastName = playerNames[0]
    request(`https://nba-players.herokuapp.com/players-stats/${lastName}/${firstName}`,function(err,response){
        res.send(response.body)
    })
})


const port = 3000
app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})
