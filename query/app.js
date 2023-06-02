const {randomBytes} = require("crypto")

const express = require('express');
const app = express();

const cors = require('cors');
const axios= require("axios");

app.use(cors());
app.use(express.json());

let posts = {}
app.get('/posts',(req, res, next) => {
    res.status(200).json({posts} || []);
})

const handleEvent = (type,data) => {
    if(type === "PostCreated"){
        const post = {...data,comments: []};
        posts[post.id] = post;
    }else if(type === "commentCreated"){
        const {id,content,postId,status} = data
        const post = posts[postId];
        post.comments.push({id,content,status})
        posts[postId] = post;
        console.log("posts",posts)
    }else if(type === "commentUpdated"){
        console.log("data",data)
        const post = posts[data.postId] ;
        const comment = post.comments.find(c => c.id === data.id)
        comment.status = data.status
        comment.content = data.content;
    }
}
// events
app.post('/events',  (req, res) => {
    const {type, data} = req.body
    console.log("event received" , req.body.type);
    handleEvent(type,data );
    res.status(200).json({});
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(4002,async () => {
    console.log('listening on 4002')
    const response = await axios.get('http://localhost:4005/events');
    for(let event of response.data){
        handleEvent(event.type, event.data);
    }
});

