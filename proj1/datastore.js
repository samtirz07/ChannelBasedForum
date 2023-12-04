'use strict';
// import multer from 'multer'
// import path from 'path'

// load package
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const multer = require('multer');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

const PORT = 8080;
const HOST = '0.0.0.0';

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'mysql1',
    user: 'root',
    password: 'admin'
});
connection.connect();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    }, 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

app.post('/uploadImage', upload.single('image'), (req, res) => {
    // console.log(req.file);
    // console.log(req.body.postID);
    let postID = req.body.postID;
    console.log(postID);
    const image = req.file.filename;
    var queryIn = `INSERT INTO images (postID, img) VALUES ('${postID}', ?)`;
    connection.query(queryIn, [image], (err, result) => {
        if(err) return res.json({Message: "Error"});
        return res.json({Status: "Success"});
    });
});

app.post('/init', (req, res) => {
    connection.query(`CREATE DATABASE IF NOT EXISTS postdb;`, 
    function(error,result) {
        if (error) console.log(error); 
    });

    connection.query(`USE postdb;`, 
    function(error,result) {
        if (error) console.log(error); 
    });

    connection.query(`CREATE TABLE IF NOT EXISTS users (
        userID varchar(100) NOT NULL,
        userName varchar(200) NOT NULL,
        password varchar(200) NOT NULL,
        PRIMARY KEY (userID)
    );`, 
    function(error,result) {
        if (error) console.log(error);
    });

    connection.query(`CREATE TABLE IF NOT EXISTS channels (
        chName varchar(100) NOT NULL,
        userID varchar(100) NOT NULL,
        PRIMARY KEY (chName)
    );`, 
    // chID int unsigned NOT NULL auto_increment,
    function(error,result) {
        if (error) console.log(error);
    });

    connection.query(`CREATE TABLE IF NOT EXISTS posts (
        postID int unsigned NOT NULL auto_increment, 
        ppostID int unsigned, 
        chName varchar(100) NOT NULL,
        userID varchar(100) NOT NULL,
        topic varchar(100),
        data varchar(500) NOT NULL,
        PRIMARY KEY (postID) 
    );`, 
    function(error,result) {
        if (error) console.log(error); 
    });

    connection.query(`CREATE TABLE IF NOT EXISTS images (
        imgID int unsigned NOT NULL auto_increment,
        img mediumblob NOT NULL,
        postID int unsigned NOT NULL,
        PRIMARY KEY(imgID)
    )`, function(error, result) {
        if(error) console.log(error);
    });
    
    res.send('Connected to database.');
});

app.post('/addChannel', (req, res) => {
    let chName = req.body.chName;
    let userID = req.body.userID;

    var queryIn = `INSERT INTO channels (chName, userID) VALUES ('${chName}', '${userID}');`;
    connection.query(queryIn, 
    function(error,result) {
        if(error) { console.log(error); }
        //let id_d = result.insertId;
        console.log('Channel added to db');
    });
});

app.post('/getChannels', (req, res) => {
    var queryIn = `SELECT * FROM channels;`;
    connection.query(queryIn, 
    function(error,result) {
        if(error) console.log(error);
        res.send(result);
    });
});

app.post('/channelExists', (req, res) => {
    let chName = req.body.chName;

    var queryIn = `SELECT * FROM channels where chName='${chName}';`;
    connection.query(queryIn, 
    function(error,result) {
        if(error) console.log(error);
        res.send(result.length > 0);
        console.log(result);
    });
});


app.post('/addPost', (req, res) => {
    let chName = req.body.chName;
    let topic = req.body.topic;
    let data = req.body.text;
    let userID = req.body.userID;

    var queryIn = `INSERT INTO posts (chName, topic, data, userID) VALUES ('${chName}','${topic}', '${data}', '${userID}');`;
    connection.query(queryIn, 
    function(error,result) {
        if (error) console.log(error);
        let id_d = result.insertId;
        console.log('Post added to db with ID: '+id_d.toString());
        res.send({postID: id_d});
    });
});

app.post('/readPosts', (req, res) => {
    let chName = req.body.chName;

    var queryIn = `SELECT posts.postID, posts.ppostID, posts.chName, users.userName, 
    posts.topic, posts.data FROM posts INNER JOIN users ON posts.userID=users.userID 
    WHERE chName = '${chName}' and topic IS NOT NULL;`;
    connection.query(queryIn, 
    function(error,result) {
        if(error) console.log(error);
        res.send(result);
        console.log(result);
    });
});

app.post('/getPostWithID', (req, res) => {
    let postID = req.body.postID;
    var queryIn = `SELECT posts.postID, posts.ppostID, posts.chName, users.userName, 
    posts.topic, posts.data FROM posts INNER JOIN users ON posts.userID=users.userID 
    WHERE postID = ${postID};`;
    connection.query(queryIn, 
    function(error,result) {
        if(error) console.log(error);
        res.send(result);
        console.log("Get post with ID result: ");
        console.log(result);
    });
})

app.post('/addReply', (req, res) => {
    let ppostID = req.body.ppostID;
    let data = req.body.text;
    let chName = req.body.chName;
    let userID = req.body.userID;

    var queryIn = `INSERT INTO posts (ppostID, chName, data, userID) VALUES ('${ppostID}', '${chName}', '${data}', '${userID}');`;
    connection.query(queryIn, 
    function(error,result) {
        if (error) console.log(error);
        let id_d = result.insertId;
        console.log('Post added to db with ID: '+id_d.toString());
    });
});

app.post('/getReplies', (req, res) => {
    let ppostID = req.body.ppostID;

    var queryIn = `SELECT posts.postID, posts.ppostID, posts.chName, users.userName, 
    posts.topic, posts.data FROM posts INNER JOIN users ON posts.userID=users.userID 
    WHERE ppostID = ${ppostID};`;
    connection.query(queryIn, 
    function(error,result) {
        if(error) console.log(error);
        res.send(result);
        console.log("Get replies result: ");
        console.log(result);
    });
});

app.post('/createUser', (req, res) => {
    let userID = req.body.userID;
    let userName = req.body.userName;
    let password = req.body.password;

    var queryIn = `INSERT INTO users (userID, userName, password) VALUES ('${userID}','${userName}', '${password}');`;
    connection.query(queryIn, 
    function(error,result) {
        if(error) { console.log(error); }
        else {
        console.log("User " + userID + " added to db.");
        }
    });
});

app.post('/getUser', (req, res) => {
    let userID = req.body.userID;
    var queryIn = `SELECT * FROM users WHERE userID = '${userID}';`;
    connection.query(queryIn, 
    function(error, result) {
        if(error) { console.log(error); }
        else {
            console.log(result);
            res.send(result);
        }
    });
});

app.post('/loginUser', (req, res) => {
    let userID = req.body.userID;
    let password = req.body.password;

    var queryIn = `SELECT * FROM users WHERE userID = '${userID}' AND password = '${password}';`;
    connection.query(queryIn, 
    function(error, result) {
        if(error) { console.log(error); }
        else {
            console.log(result);
            res.send(result);
        }
    });
});

app.listen(PORT, HOST);
console.log('up and running');