const {randomBytes} = require("crypto")

const express = require('express');
const app = express();

const cors = require('cors');
const axios = require("axios");

app.use(cors());
app.use(express.json());

/*
* event bus service takes all events and broadcast them to all subscribers service
* */
const events = [];
app.post('/events', (req, res) => {
    const event= req.body
    events.push(event);

    console.log("body",req.body);
    axios.post("http://localhost:4000/events",event)
    axios.post("http://localhost:4001/events",event)
    axios.post("http://localhost:4002/events",event)
    axios.post("http://localhost:4003/events",event)
    res.status(200).json({status:'success'})
})
app.get('/events',(req, res) => {
    res.status(200).json({events})
})

process.on('unhandledRejection', (reason, promise) => {
    //console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});
app.listen(4005,() => {
    console.log('listening on 4005')
});

