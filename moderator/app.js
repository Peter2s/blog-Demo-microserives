const express = require('express');
const axios = require("axios");
const app = express();

app.use(express.json());



// @description end point for filter comments and emit event to query service to update comment there
app.post('/events',  async (req, res) => {
    const {type, data} = req.body
    if (type === 'commentCreated') {
        let status = data.content.includes("peter") ? 'rejected' : 'approved';
        const event = {
            type: 'commentModerator',
            data: {
            id: data.id,
            content: data.content,
            postId: data.postId,
            status: status
        }
        }
        await axios.post("http://localhost:4005/events", event)
    }
    console.log("event received", req.body.type);
    res.send({});
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(4003,() => {
    console.log('listening on 4003')
});

