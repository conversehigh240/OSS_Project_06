const SpotifyWebApi = require('spotify-web-api-node');
let express = require('express');
let app = express();

var bodyParser = require('body-parser');	// 모듈 import. Express v4.16.0이상은 생략 가능

app.use(bodyParser.json());	// json 등록
app.use(bodyParser.urlencoded({ extended : false }));



/**
 * This example retrieves the top tracks for an artist.
 * https://developer.spotify.com/documentation/web-api/reference/artists/get-artists-top-tracks/
 */
/**
 * This endpoint doesn't require an access token, but it's beneficial to use one as it
 * gives the application a higher rate limit.
 *
 * Since it's not necessary to get an access token connected to a specific user, this example
 * uses the Client Credentials flow. This flow uses only the client ID and the client secret.
 * https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow
 */
const spotifyApi = new SpotifyWebApi({
  clientId: '819112b2849b42e3b308a5a40d1200ae',
  clientSecret: '577548c8e3044004b94d6c2cf8615127'
});

// 주소 입력하는 사이트 생성
app.get('/', function (req, res) {
    var template = 
    `<!DOCTYPE html>
    <html>
        <body>
            <form action='/login' method='post'>
                ID : <input type='text' name='id'><br>
                <input type='submit' value='login'>
            </form>
        </body>
    </html>`;
    res.writeHead(200, {'ContentType':'text/html'});
    res.write(template);
    res.end();
});

//주소 값 받아서 ID 값 넣는다. 그러면 콘솔에 값 나오는 거 볼 수 있음.
app.post('/login',function (req, res) {
    var body = req.body;
    console.log(body);
    var SingerId =  body.id.substr(32)

    var tracknameList = [];
    var popularityList = [];
    var idList = [];
    var danceabilityList = [];
    var energyList = [];
    var keyList = [];
    var loudnessList = [];
    
    var modeList = [];
    var acousticnessList = [];
    var durationmsList = [];
    var instrumentalnessList = [];
    var livenessList = [];
    var tempoList = [];
    // valence에 대한 설명 : Tracks with high valence sound more positive (happy, cheerful, euphoric), while tracks with low valence sound more negative (sad, depressed, angry).
    var valenceList = [];

    var relatedartists = [];

    var mostrelatedartistname = '';

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

    // Retrieve an access token
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
        console.log('====================================================================================');
        console.log('The most popular tracks for 에스파 is..');
        console.log('Drum roll..');
        console.log('====================================================================================');
        // console.log(data.body.tracks);
        data.body.tracks.forEach(function(track, index) {
        console.log(
            index +
            1 +
            '. ' +
            track.name +
            ' (popularity is ' +
            track.popularity +
            ')'
        );
        spotifyApi.getAudioFeaturesForTrack(track.id)
        .then(function(data){
            
            tracknameList.push(track.name);
            popularityList.push(track.popularity);
            idList.push(data.body.id);
            danceabilityList.push(data.body.danceability);
            energyList.push(data.body.energy);
            keyList.push(data.body.key);
            loudnessList.push(data.body.loudness);
            modeList.push(data.body.mode);
            acousticnessList.push(data.body.acousticness);
            durationmsList.push(data.body.duration_ms);
            instrumentalnessList.push(data.body.instrumentalness);
            livenessList.push(data.body.liveness);
            tempoList.push(data.body.tempo);
            valenceList.push(data.body.valence);
            
            if(tracknameList.length == 10){
            console.log('====================================================================================');
            for(var i=0; i < tracknameList.length; i++){
                console.log("Audio Feature List of " + tracknameList[i] + " : " + popularityList[i] + ", " + idList[i] + ", "+ danceabilityList[i] + ", "+ energyList[i] + ", "+ keyList[i] + ", "+ loudnessList[i] + ", "+ modeList[i] + ", "+ acousticnessList[i] + ", "+ durationmsList[i] + ", "+ instrumentalnessList[i] + ", "+ livenessList[i] + ", "+ tempoList[i] + ", "+ valenceList[i]);
                //res.send("Audio Feature List of " + tracknameList[i] + " : " + popularityList[i] + ", " + idList[i] + ", "+ danceabilityList[i] + ", "+ energyList[i] + ", "+ keyList[i] + ", "+ loudnessList[i] + ", "+ modeList[i] + ", "+ acousticnessList[i] + ", "+ durationmsList[i] + ", "+ instrumentalnessList[i] + ", "+ livenessList[i] + ", "+ tempoList[i] + ", "+ valenceList[i]);
            }
            res.send('clear')
            }
            // 위의 List의 내용들이 data.body와 일치하는지 디버그용 console.log
            // console.log(data.body); 
        })
        });})
        // 관련된 아티스트 목록 출력 및 저장
        spotifyApi.getArtistRelatedArtists(SingerId)
    .then(function(data){
       if (data.body.artists.length) {
        console.log("===========================================================================")
        
        console.log("----------related artist list-----------")
      for(let i=0;i<data.body.artists.length;i++)
       {
         relatedartists.push(data.body.artists[i].name);
         console.log(i+1,". ",data.body.artists[i].name);
         mostrelatedartistname = data.body.artists[0].id;
       }}

       //가장 관련된 아티스트의 베스트 트랙 리스트
       spotifyApi.getArtistTopTracks(mostrelatedartistname,'kr')
       .then(function(data){
        
       console.log("----------the most related artist's best song list--------")
        data.body.tracks.forEach(function(track, index) {
          mostrelatedartisttrack.push(track.name);
          console.log(
            index +
              1 +
              '. ' +
              track.name +
              ' (popularity is ' +
              track.popularity +
              ')'

          );
            spotifyApi.getAudioFeaturesForTrack(track.id)
            .then(function(data){

            relatedpopularityList.push(track.popularity);
            relatedidList.push(data.body.id);
            relateddanceabilityList.push(data.body.danceability);
            relatedenergyList.push(data.body.energy);
            relatedkeyList.push(data.body.key);
            relatedloudnessList.push(data.body.loudness);
            relatedmodeList.push(data.body.mode);
            relatedacousticnessList.push(data.body.acousticness);
            relateddurationmsList.push(data.body.duration_ms);
            relatedinstrumentalnessList.push(data.body.instrumentalness);
            relatedlivenessList.push(data.body.liveness);
            relatedtempoList.push(data.body.tempo);
            relatedvalenceList.push(data.body.valence);
            
            if(tracknameList.length == 10){
            console.log('====================================================================================');
            for(var i=0; i < relatedartists.length; i++){
                console.log("Audio Feature List of " + relatedartists[i] + " : " + relatedpopularityList[i] + ", " + relatedidList[i] + ", "+ relateddanceabilityList[i] + ", "+ relatedenergyList[i] + ", "+ relatedkeyList[i] + ", "+ relatedloudnessList[i] + ", "+ relatedmodeList[i] + ", "+ relatedacousticnessList[i] + ", "+ relateddurationmsList[i] + ", "+ relatedinstrumentalnessList[i] + ", "+ relatedlivenessList[i] + ", "+ relatedtempoList[i] + ", "+ relatedvalenceList[i]);
            }
            }
       })
      },
     function(err) {
     console.log('Something went wrong:', err.message);
      })
    })
    .catch(function(err) {
        console.log('Unfortunately, something has gone wrong.', err.message);
    });
  }) 
})
  let server = app.listen(80);