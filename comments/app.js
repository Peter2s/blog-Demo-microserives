const {randomBytes} = require("crypto")

const express = require('express');
const app = express();
const axios = require('axios')


const cors = require('cors');

app.use(cors());
app.use(express.json());

commentsBtPostId =  {};


app.get('/posts/:postId/comments', (req, res) => {
    const {postId} = req.params;
    res.status(200).json({ comments : commentsBtPostId[postId] || [] });
})

app.post('/posts/:postId/comments', async (req, res) => {
    const {postId} = req.params;
    const {content} = req.body;
    const id = randomBytes(4).toString("hex");
    const comments = commentsBtPostId[postId] || [];
    const comment = {id, content,status:'pending'}
    comments.push(comment);
    commentsBtPostId[postId] = comments;
    const event = {
        type: 'commentCreated',
        data: {
            id, content, postId,status:'pending'
        }
    }
    await axios.post("http://localhost:4005/events", event);


    res.status(201).json({data: commentsBtPostId[postId]});
})

// events
app.post('/events',  async (req, res) => {
    const {type, data} = req.body;
    console.log("event received", req.body.type);
    if (type === 'commentModerator') {
        const comments = commentsBtPostId[data.postId];
        const comment = comments.find(c => c.id === data.id)
        comment.status = data.status;
        console.log(data)
        const event = {
            type:'commentUpdated',
            data: {
                id: comment.id,
                content: comment.content,
                postId: data.postId,
                status:comment.status
            }
        }
        await axios.post("http://localhost:4005/events",event).catch((error) => {console.log("error: " + error)})
    }

    res.send({})
})

process.on('unhandledRejection', (err,) => {
    console.log('Unhandled Rejection at:', err );
});

app.listen(4000,() => {
    console.log('listening on 4000')
});

