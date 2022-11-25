const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const methodOverride = require('method-override');

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
var db;

MongoClient.connect('mongodb+srv://shawnbest:th1204gm0320@cluster0.2pryuxz.mongodb.net/?retryWrites=true&w=majority', function(err, client){
    if (err) return console.log(err);
    db = client.db('app_todo');


    app.listen(8080, function(){
        console.log('listening on 8080')
    });
})


app.get('/',function(req,res){
    res.sendFile(__dirname + '/list.html');
})

app.get('/list', function(req, res){
    db.collection('post').find().toArray(function(err, result){
        console.log(result);
        res.render('list.ejs', {posts : result});
    })
})

/*
app.get('/search', function(req, res){
    db.collection('post').find({할일: req.query.value}).toArray(function(err, result){
        res.render('search.ejs', {post : result});
    })
})*/

app.get('/search', function(req, res){
    console.log(req.query);
    let condition = [
        {
            $search : {
                index : 'todoSearch',
                text : {
                    query : req.query.value,
                    path : ['singer', 'songs']
                }
            }
        },
        {
            $sort : { _id : 1 }
        },
        {
            $limit : 10
        }
    ];
    db.collection('post').aggregate(condition).toArray(function(err, result){
        res.render('search.ejs', {searchPost : result});
    })
})
/*
app.get('/search',function(req, res){
    db.collection('post').find({$text : {$search : req.query.value}}).toArray(function(err,result){
        res.render('search.ejs', {searchPost : result});
    })
})*/

app.post('/add',function(req,res){
    res.send('전송완료');

    db.collection('counter').findOne({name : '총게시물개수'}, function(err, result){
        var totalPosts = result.totalPosts;

        db.collection('post').insertOne({_id : totalPosts + 1, singer: req.body.content, songs: req.body.date},function(err, result){
            console.log('데이터 저장완료!');

        db.collection('counter').updateOne({name : '총게시물개수'}, {$inc : {totalPosts: 1}}, function(err, result){
            console.log('데이터 업데이트 완료!');
            })
        })
    })
})