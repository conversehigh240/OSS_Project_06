module.exports = function(app){
    const SpotifyWebApi = require('spotify-web-api-node');
    const spotifyApi = new SpotifyWebApi({
        clientId: '819112b2849b42e3b308a5a40d1200ae',
        clientSecret: '577548c8e3044004b94d6c2cf8615127'
      });
    const fs = require('fs');
    const jsonFile = fs.readFileSync('./artist.json', 'utf8');
    const jsonData = JSON.parse(jsonFile);

    const mysql = require('mysql');
    var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'artist_info'
    });
    connection.connect();

    app.get('/', function(req,res){
        res.render('main', {title: 'Search Singer'});
    });

    app.get('/db', (req, res) => {
        const sql = "SELECT artist_id FROM artists WHERE artist_name = 'iu'";
        //const sql = "select * from artists"
        connection.query(sql, function(err, results, fields) {
            if(err) 
            throw err;
    
            res.send(results)
        });
    });

    app.get('/search/:singer',function(req, res, next){
        var singername = req.params.singer;
        
        /*
        for (var i = 0;i<jsonData.length;i++)
        {
            if (singername == jsonData[i]['artist_name'].toLowerCase())
            {
                connection.query("SELECT artist_id FROM artists WHERE artist_name = ?;",[singername],function(error, result, fields){
                    if (error)
                        throw error;
                    
                    singerId = result[0]['artist_id'];
                    
                    console.log(singerId);
                    
                })
                break;
            }
        }*/
        
        connection.query("SELECT artist_id FROM artists WHERE artist_name = ?;",[singername],function(error, result, fields){
            if (error){
                //res.render('no',{title: 'no singer' });
                throw error;
            }
            if(result.length == 1)
            {
                SingerId = result[0]['artist_id'];
                console.log(SingerId);
            }
            else {
                res.render('no',{title: 'no singer' });
            }
            
                
            
            //SingerId = result[0]['artist_id'];
            //console.log(SingerId);
            
        })
        


        var tracknameList = [];

        var danceabilityList = [];
        var energyList = [];      
        var loudnessList = [];        
        var acousticnessList = [];                
        var livenessList = [];
        var tempoList = [];

        var mostrelatedartistname = "";
        var mran ="";
        var art = "";

        var realrelatedtracknameList = [];
    
        var relatedtracknameList = [];
                
        var relatedpopularityList = [];
        var relatedidList = [];
        var relateddanceabilityList = [];
        var relatedenergyList = [];
        var relatedkeyList = [];
        var relatedloudnessList = [];
        var relatedmodeList = [];
        var relatedacousticnessList = [];
        var relateddurationmsList = [];
        var relatedinstrumentalnessList = [];
        var relatedlivenessList = [];
        var relatedtempoList = [];
        var relatedvalenceList = [];    
    

    
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

        })
        });
        spotifyApi.getArtist(SingerId)
        .then(function(data) {
            console.log(data.body.name);
            art = data.body.name;
        })
        spotifyApi.getArtistRelatedArtists(SingerId)
    .then(function(data){
        console.log("===========================================================================")
        if(data.body.artists.length==0) console.log("there is no related artist..")
        console.log("----------related artist list-----------")
            
    for(let i=0;i<data.body.artists.length;i++)
    {
            console.log(i+1+". "+data.body.artists[i].name);
            mran = data.body.artists[0].name;
            mostrelatedartistname = data.body.artists[0].id;
    }
    spotifyApi
    .clientCredentialsGrant()
    .then(function(data) {
    // Set the access token on the API object so that it's used in all future requests
    spotifyApi.setAccessToken(data.body['access_token']);
    // Get the most popular tracks by David Bowie in Great Britain
    return spotifyApi.getArtistTopTracks(mostrelatedartistname, 'kr');
    })
    .then(function(data) {
    let trackl = data.body.tracks.length;
    data.body.tracks.forEach(function(track, index) {
        

        spotifyApi.getAudioFeaturesForTrack(track.id)
        .then(function(data){

            relatedtracknameList.push(track.name);

            relateddanceabilityList.push(data.body.danceability);
            relatedenergyList.push(data.body.energy);          
            relatedloudnessList.push(data.body.loudness);           
            relatedacousticnessList.push(data.body.acousticness);
            relatedlivenessList.push(data.body.liveness);
            relatedtempoList.push(data.body.tempo);

            if(relatedtracknameList.length == trackl){
                var featureData = [0,0,0,0,0,0];
                var relatefeatureData = [0,0,0,0,0,0];
                for(var i=0; i < tracknameList.length; i++){
                    featureData[0] += danceabilityList[i]/tracknameList.length;
                    featureData[1] += energyList[i]/tracknameList.length;
                    featureData[2] -= loudnessList[i]/(tracknameList.length*4); //음수라 빼는게 더하는거
                    featureData[3] += acousticnessList[i]/tracknameList.length;
                    featureData[4] += livenessList[i]/tracknameList.length;
                    featureData[5] += tempoList[i]/(tracknameList.length * 100); //tempo는 값이 너무 커서 비율 맞추려고 줄임
                }
                for (var i = 0; i < relatedtracknameList.length; i++){
                    relatefeatureData[0] += relateddanceabilityList[i]/relatedtracknameList.length;
                    relatefeatureData[1] += relatedenergyList[i]/relatedtracknameList.length;
                    relatefeatureData[2] -= relatedloudnessList[i]/(relatedtracknameList.length*4);
                    relatefeatureData[3] += relatedacousticnessList[i]/relatedtracknameList.length;
                    relatefeatureData[4] += relatedlivenessList[i]/relatedtracknameList.length;
                    relatefeatureData[5] += relatedtempoList[i]/(relatedtracknameList.length*100);
                }

                res.render('list', {title: "singer information", 
                     
                    tracklist : tracknameList,
                    ll : tracknameList.length,
                    l : relatedtracknameList.length,
                    relatedArtist : mran,
                    artistname : art,
                    relatetracklist : relatedtracknameList,
                    data0:featureData[0], 
                    data1:featureData[1], 
                    data2:featureData[2],
                    data3:featureData[3],
                    data4:featureData[4],
                    data5:featureData[5],
                    d0:relatefeatureData[0],
                    d1:relatefeatureData[1],
                    d2:relatefeatureData[2],
                    d3:relatefeatureData[3],
                    d4:relatefeatureData[4],
                    d5:relatefeatureData[5]
                })

            }            
            
        })
      })
    })
   })

    })
    .catch(function(err) {
        console.log('Unfortunately, something has gone wrong.', err.message);
    });
    


})
}