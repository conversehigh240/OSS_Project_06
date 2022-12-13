const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

app.get('/', (req, res) => 
    res.send('connected!'));

app.listen(port, () =>
    console.log('listening on port 8080'));

const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'artist_info'
});

// con.connect(function(err) {
//     if(err) throw err;
//     console.log('connected');
// });

// con.connect(function(err) {
//     if(err) throw err;
//     console.log('connected');
//     con.query('CREATE DATABASE artist_info', function (err, results) {
//     if(err) throw err;
//         console.log('database created');
//     });
// });
// con.connect(function(err) {
//     if(err) throw err;
//     console.log('Connected');
//     const sql = 'CREATE TABLE artists(artist_id varchar(30) NOT NULL PRIMARY KEY, artist_name varchar(30) NOT NULL)'
//     con.query(sql, function(err, results) {
//         if(err) throw err;
//         console.log('table created');
//     });
// });

// const jsonFile = fs.readFileSync('./artist.json', 'utf8');
// const jsonData = JSON.parse(jsonFile);

// con.connect(function(err) {
//     if (err) 
//         throw err;
//     console.log("Connected!");

//     for (i=0; i<jsonData.length; i++){
//         var sql = "INSERT IGNORE INTO artists (artist_id, artist_name) VALUES (?,?)";
//         var params = [jsonData[i]['artist_id'], jsonData[i]['artist_name']]
//         con.query(sql, params, function (err, results) {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         // console.log("1 record inserted");
//         });
// }});

app.get('/db', (req, res) => {
    
    //const sql = "SELECT artist_id FROM artist_info WHERE artist_name = 'iu'";
    const sql = "select * from artists"
    con.query(sql, function(err, results, fields) {
        if(err) throw err;

        res.send(results)
    });
});