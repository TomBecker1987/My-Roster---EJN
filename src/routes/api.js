const express = require( 'express' )
const router = express.Router()
let teamIDs = require('../../teamIDs');
const request = require('request');
const path = require('path')
let dreamTeam = require(`../../dreamTeam`)




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


router.put(`/team`, function(req,res){
    let newTeam = req.body
    teamIDs[newTeam.teamName] = newTeam.teamId;
    res.send(teamIDs)
})

router.get('/dreamTeam',function(req,res){
    request('http://data.nba.net/10s/prod/v1/2016/players.json',function(err,response){
        let data = JSON.parse(response.body).league.standard;
        let fivePlayers = []
        for ( let i =0; i < 5; i++ ){
            let randomNumber = Math.floor(Math.random() * data.length);
            fivePlayers.push(data[randomNumber])
        }
        let dreamTeam = []
        for ( let player of fivePlayers ) {
            let p = {};
            p.firstName = player.firstName;
            p.lastName = player.lastName;
            p.jersey = player.jersey;
            p.pos = player.pos;
            dreamTeam.push(p)
        }
        res.send(dreamTeam)
    })

})

router.post(`/roster`, function(req,res){
    let player = req.body;
    dreamTeam.dreamTeam.push(player);
    res.send(dreamTeam)
})


module.exports = router