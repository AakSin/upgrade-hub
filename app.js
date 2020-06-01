const express=require("express")
const bodyParser=require("body-parser")
const fetch = require("node-fetch");
let port = process.env.PORT || 8080;
const app=express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.get("/",(req, res)=>{
    res.render("index.html")
})
app.post('/', (req, res) => {
    console.log(req.body)
    fetch('https://upgradeandchill.xyz/auto/api', {
        method: 'POST',
        headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; ) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4086.0 Safari/537.36',
        'x-api-key': process.env.API_KEY,
        "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
      .then(
          obj => {
              res.send(obj.body.message),
              console.log(obj);
            })
      });

app.listen(port,()=>{
    console.log("The server is up and running")
});