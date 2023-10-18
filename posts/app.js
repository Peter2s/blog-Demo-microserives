const { randomBytes } = require("crypto");

const express = require("express");
const app = express();
const axios = require("axios");

const cors = require("cors");

app.use(cors());
app.use(express.json());

let posts = {};
app.get("/posts", (req, res) => {
  console.log(req.ip);
  res.status(200).json({ posts });
});

app.post("/posts/create", async (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString("hex");
  posts[id] = {
    id,
    title,
  };
  const event = {
    type: "PostCreated",
    data: { id, title },
  };
  await axios.post("http://event-bus-srv:4005/events", event);
  res.status(201).json({ data: posts[id] });
});

// events
app.post("/events", (req, res) => {
  console.log("event received", req.body.type);
  res.send({});
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
  // Application specific logging, throwing an error, or other logic here
});

app.listen(4001, () => {
  console.log("V0.0.2");
  console.log("listening on 4001");
});
