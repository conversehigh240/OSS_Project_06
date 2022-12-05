module.exports = function(app){
    const SpotifyWebApi = require('spotify-web-api-node');
    const spotifyApi = new SpotifyWebApi({
        clientId: '819112b2849b42e3b308a5a40d1200ae',
        clientSecret: '577548c8e3044004b94d6c2cf8615127'
      });
    

    app.get('/', function(req,res){
        res.render('main', {title: 'Search Singer'});
    });

    app.get('/search/:singer',function(req, res, next){
        SingerId = req.params.singer;
        //singer을 id로부터 받아와야함
        singer = "에스파";

        var tracknameList = [];

        var danceabilityList = [];
        var energyList = [];      
        var loudnessList = [];        
        var acousticnessList = [];                
        var livenessList = [];
        var tempoList = [];

    

    
    spotifyApi
    .clientCredentialsGrant()
    .then(function(data) {
        // Set the access token on the API object so that it's used in all future requests
        spotifyApi.setAccessToken(data.body['access_token']);
        console.log(data.body['access_token']);
        // Get the most popular tracks by David Bowie in Great Britain
        return spotifyApi.getArtistTopTracks(SingerId, 'kr');
    })
    .then(function(data) {
        data.body.tracks.forEach(function(track, index) {
        spotifyApi.getAudioFeaturesForTrack(track.id)
        .then(function(data){
            
            tracknameList.push(track.name);
            
            danceabilityList.push(data.body.danceability);
            energyList.push(data.body.energy);         
            loudnessList.push(data.body.loudness);           
            acousticnessList.push(data.body.acousticness);           
            livenessList.push(data.body.liveness);
            tempoList.push(data.body.tempo);
            
            if(tracknameList.length == 10){
                var featureData = [0,0,0,0,0,0];
                for(var i=0; i < tracknameList.length; i++){
                    featureData[0] += danceabilityList[i]/10;
                    featureData[1] += energyList[i]/10;
                    featureData[2] -= loudnessList[i]/10; //음수라 빼는게 더하는거
                    featureData[3] += acousticnessList[i]/10;
                    featureData[4] += livenessList[i]/10;
                    featureData[5] += tempoList[i]/1000; //tempo는 값이 너무 커서 비율 맞추려고 줄임
                }

                res.render('list', {title: singer, 
                    singer: singer, 
                    tracklist : tracknameList,
                    data0:featureData[0], 
                    data1:featureData[1], 
                    data2:featureData[2],
                    data3:featureData[3],
                    data4:featureData[4],
                    data5:featureData[5]   
            })

            }

        })
        });
    })
    .catch(function(err) {
        console.log('Unfortunately, something has gone wrong.', err.message);
    });
    


})
}