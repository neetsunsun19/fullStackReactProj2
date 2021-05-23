import express from 'express'
import devBundle from './devBundle' //only for dev env
import path from 'path'
import template from './../template'
import {  MongoClient } from "mongodb";

const app = express()
devBundle.compile(app) //only for dev env

//configure express app to return static files from dist folder when req
//route starts with /dist
const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

//render template.js if server receives request at root URL
app.get('/', (req,res) => {
    res.status(200).send(template())
})

//start express app to listen to a port
let port = process.env.PORT||3000
app.listen(port, function onStart(err){
    if(err){
        console.log(err)
    }
    console.info('Server started on port %s.',port)
})

//mongodb
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup'
MongoClient.connect(url, (err,db) =>{
    console.log("Connected successfully to mongodb server")
    db.close()
})