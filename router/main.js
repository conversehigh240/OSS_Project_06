module.exports = function(app){

    app.get('/', function(req,res){
        res.render('main', {title: 'Search Singer'});
    });
    app.get('/search/:singer',function(req, res, next){
        singer = req.params.singer;
        
        var data = [1,2.4,3.6,4,5,7];

        res.render('list', {title: req.params.singer, 
            singer: singer, 
            data0:data[0], 
            data1:data[1], 
            data2:data[2],
            data3:data[3],
            data4:data[4],
            data5:data[5]
        })
    })
}