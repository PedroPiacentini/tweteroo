import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const users = []
const tweets = [];
let lastTweets = [];
let avatar = "";
let username = "";

let isLogged = false;

function tweetsManage(tweet) {
    tweets.push(tweet);
    if (tweets.length < 10) {
        lastTweets = [...tweets];
    } else {
        lastTweets = tweets.slice(-10);
    }
}

app.post("/sign-up", (req, res) => {
    res.status(200).send("ok");
    const user = req.body;
    avatar = user.avatar;
    username = user.username;
    users.push(user);
    isLogged = true;
    res.status(200).send("ok");
})

app.post("/tweets", (req, res) => {
    const tweet = req.body.tweet;
    if (isLogged) {
        const postTweet = { username, tweet, avatar };
        tweetsManage(postTweet);
        res.status(200).send("ok");
    } else {
        res.status(401).send("UNAUTHORIZED")
    }
})

app.get("/tweets", (req, res) => {
    res.status(200).send(lastTweets);
})



app.listen(5000, () => console.log("Rodando servidor na porta 5000"));