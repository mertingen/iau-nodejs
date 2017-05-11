const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();
const server = http.createServer(app);
const MongoClient = require('mongodb').MongoClient

var db;
MongoClient.connect('mongodb://<username>:<password>@<db>', (err, database) => {
  if (err) return console.log(err)
  db = database;
  server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    var addr = server.address();
    console.log("Sunucu dinleniyor ", addr.address + ":" + addr.port);
  });
});

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.get('/', (req, res) => {
  var cursor = db.collection('quotes').find()
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database.');
    res.redirect('/');
  });
});
