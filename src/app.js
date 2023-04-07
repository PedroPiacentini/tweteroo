import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const users = []
const tweets = [];
const lastTweets = [];
let avatar = "";

let isLogged = false;

function tweetsManage(tweet) {
    tweets.push(tweet);
    if (tweets.length < 10) {
        lastTweets = [...tweets];
    } else {
        lastTweets = tweets.slice(-10);
    }
}

app.post("/sing-up", (req, res) => {
    const user = req.body;
    avatar = user.avatar;
    users.push(user);
    isLogged = true;
    res.send("ok");
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
    if (isLogged) {
        const postTweet = { username, tweet, avatar };
        tweetsManage(tweet);
        res.send("ok");
    } else {
        res.send("UNAUTHORIZED")
    }
})

app.get("/tweets", (req, res) => {
    res.send(lastTweets);
})



app.listen(5000, () => console.log("Rodando servidor na porta 5000"));