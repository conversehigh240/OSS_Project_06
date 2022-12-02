module.exports = function(app){

    app.get('/', function(req,res){
        res.render('main', {title: 'Search Singer'});
    });
    app.get('/search/:singer',function(req, res, next){
        singer = req.params.singer;

        res.render('list', {title: req.params.singer, singer: singer})
    })
}