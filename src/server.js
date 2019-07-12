const express = require('express')
const path = require('path')
const app = express()
const request = require('request');
let teamIDs = require('../teamIDs');
const api = require('./routes/api')


app.use(express.static(path.join(__dirname,'..', 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)



const port = 3000
app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})
