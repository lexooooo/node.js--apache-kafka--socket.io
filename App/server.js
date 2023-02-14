const http = require("http")
const express = require("express");
const app = express();
const server = http.createServer(app)
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require('path');
const fs = require("fs")
const cors = require('cors');
const port = 3001;  
const mongoURL = "mongodb+srv://root:root@cluster0.ns55i.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require("mongoose");
const ROUTER = require('./mongoCtrl/router');
const {Server} = require("socket.io")
const socket = new Server(server)
const run = require('./kafka/kafka')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
//app.use(require('morgan')('dev'));
app.use('/api', ROUTER);
app.set("view engine", 'ejs')


socket.on("disconnect", io => {
    socket.close()
})

app.get('/', (req, res) => {
 res.render('index.ejs')
})

run(socket)






//////////////////////////////////////////////////////   UPDATE INFO FROM DB WITH REQUESTS  /////////////////////////////////

// function updater(interval) {
//     setInterval(() => {
//         axios.post("http://localhost:3001/api");
//     }, interval);
// }
// updater(1000)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////    START SERVER   //////////////////////////////////////////////////////////////
async function serverConnect(){
 try {
    server.listen(port, ()=>{
    console.log("-----server is runing-----");
    }).on("listening", () => {
    mongoose.connect(mongoURL, ()=>{
    console.log("----mongo connected-----")
    })
    })
    } catch (e) {
    console.log(e);
    }
}
serverConnect();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
