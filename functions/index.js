const functions = require('firebase-functions');
const http = require('requestify');
const cors = require('cors')({ origin: true });

exports.franklyProxy = functions.https.onRequest((req, res) => {
    console.log(1, 'franklyProxy ')
    cors (req, res, () => {
        playlist = 'https://s3.amazonaws.com/frankly-news-web/test/playlist.js'

        return http.get(playlist).then( response => {
            function callback(obj) { return obj }
            var parsed = eval( response.getBody() );

            console.log(2, 'playlistbody2 ', parsed);
            //return res.status(200).send(JSON.stringify(parsed));
            return res.status(200).send(parsed);
        })
        .catch(err => {
            console.log(3,'frankly err',err)
            return res.status(400).send(err) 
        }) 
    })
});