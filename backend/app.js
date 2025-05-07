const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const port = 3000;

const { format } = require('date-fns');


var username;
var password;


var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "playbold",
    database: "gamersville"
});

con.connect(function(err){
    if (err) throw err;
    console.log("connected");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/login',(req, res) =>{
    console.log(req.body);
    username = req.body.username;
    var qry = `SELECT username FROM users WHERE username= '${username}'`;
    con.query(qry, function (err, result){
        if(err) res.send({message:'failed'});
        if(result.length > 0)
            res.send({message:"1"});
        else
            res.send({message:"0"});
    });
})

app.post('/signup',(req, res) => {
    console.log(req.body);
    username = req.body.username;
    var qry1 = `INSERT INTO users(name, username, password) VALUES('${req.body.name}','${req.body.username}','${req.body.password}')`;
    con.query(qry1, function (err, result){
        if(err) res.send({message:'0'});
        console.log(result);
        res.send({message:'1'})
    });
})

app.post('/rps',(req, res) => {

    console.log(req.body);
    var currentDate = new Date();
    var formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
    var gameid = formattedDate;

    var qry2 = `INSERT INTO logtable(gameid, game, username, status) VALUES('${gameid}','rpc','${username}','${req.body.Status}')`;
    con.query(qry2, function(err, result){
        if(err){
            res.send({message:'0'});
            throw err;
        }
        console.log(result);
        res.send({message:'1'})
    })
})

app.post('/ins',(req, res) => {

    console.log(req.body);
    var currentDate = new Date();
    var formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
    var gameid = formattedDate;

    var qry2 = `INSERT INTO logtable(gameid, game, username, status) VALUES('${gameid}','ins','${username}','${req.body.errors}')`;
    con.query(qry2, function(err, result){
        if(err){
            res.send({message:'0'});
            throw err;
        }
        console.log(result);
        res.send({message:'1'})
    })
})

app.post('/loadinf', (req, res) => {
    console.log(req.body);

    var qry4 = `SELECT name, username FROM users WHERE username = ?`;
    con.query(qry4, [username], function(err, result) {
        if (err) {
            res.status(500).send({ un: null });
            throw err;
        }
        console.log(result);
        if (result.length > 0) {
            res.send({ un: result[0].username, n: result[0].name });
        } else {
            res.status(404).send({ un: null });
        }
    });
});

app.post('/loadinfpb', (req, res) => {
    console.log(req.body);

    var qry4 = `SELECT SUM(status) AS STRPS FROM logtable WHERE username = '${username}' AND game = 'rpc'`;
    con.query(qry4, [username], function(err, result) {
        if (err) {
            res.status(500).send({ score: null });
            throw err;
        }
        console.log(result);
        res.send({score: result[0].STRPS})
    });
});

app.post('/loadinfpb1', (req, res) => {
    console.log(req.body);

    var qry4 = `SELECT MIN(status) AS STMTC FROM logtable WHERE game = 'ins' AND username = '${username}'`;
    con.query(qry4, [username], function(err, result) {
        if (err) {
            res.status(500).send({ score: null });
            throw err;
        }
        console.log(result);
        res.send({score: result[0].STMTC})
    });
});


app.listen(port, () => {
    console.log(`Gamersville server app listening on port ${port}`)
})


