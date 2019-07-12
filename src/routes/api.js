const express = require( 'express' )
const router = express.Router()
let teamIDs = require('../../teamIDs');
const request = require('request');
const path = require('path')




router.get('/teams/:teamName',function(req,res){
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

router.get('/playerStats/:player', function(req,res){
    let player = req.params.player;
    let playerNames = player.split(' ')
    let firstName = playerNames[1]
    let lastName = playerNames[0]
    request(`https://nba-players.herokuapp.com/players-stats/${lastName}/${firstName}`,function(err,response){
        res.send(response.body)
    })
})

module.exports = router