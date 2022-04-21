//const requestIP = require("request-ip");
const express = require("express");
const router = express.Router();
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 10000000 });

router.get("/", async (req, res) => {
  try {
    //console.log(req.ip);
    // let clientIP = req.ip;
    let newIP = "apirateLimit";
    console.log(req.ip);

    if (myCache.has(newIP)) {
      //if cache exists
      let cache = myCache.get(newIP);
      let clientTime = cache.time;
      let timeDif = Math.floor((Date.now() - clientTime) / 1000); //time difference
      console.log(timeDif);
      if (timeDif > 60) {
        // more than 60 seconds - reset the limit
        console.log(timeDif);
        let obj = { time: Date.now(), variable: 1 };
        myCache.set(newIP, obj);
        let x = 10 - cache.variable;
        return res.status(200).send(`Hello there!! You have 10 free requests`);
      } else if (timeDif < 60 && cache.variable < 10) {
        let x = 10 - cache.variable;
        cache.variable++;

        myCache.set(newIP, cache);
        return res.status(200).send(`Hello there!! You have ${x}free requests`);
      } else if (timeDif < 60 && cache.variable >= 10) {
        return res.status(200).send("Limit Exceeded try after 1Minute");
      }
    } else {
      let obj = { time: Date.now(), variable: 0 };
      myCache.set(newIP, obj);
      res.status(200).send(`hello there!! how are you today?`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
