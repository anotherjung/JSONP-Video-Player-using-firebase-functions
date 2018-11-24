var _dataStore = []
var _messageElement;
var untilReached;
var next;

(function onDomLoad() {
    let playlistB = fetch('https://us-central1-franklyinc-d4935.cloudfunctions.net/franklyProxy')
    .then((res) => res.json())
    .then((data) => {
       console.log(1,data.playlist[0].platform_id)
       _dataStore = data.playlist;
       var parent = document.querySelector('#grid');
       console.log(1, _dataStore);
       _dataStore.forEach((item, index) => {
            var div = document.createElement('div');  // <div id="item1" key="0" onclick="switchVideo()">
            var img = document.createElement('img')  // <img src="http://via.placeholder.com/50x50">
            var text = document.createTextNode(item.title); // text
            var txt = document.createElement('p');
            var title = document.createTextNode(item.title);
            div.id = 'item' + index;
            div.setAttribute("onClick","switchVideo(event)");
            img.setAttribute("key", index );
            img.setAttribute("src", item.image_url);
            div.appendChild( img );
            div.appendChild(txt);
            txt.appendChild(title);
            parent.appendChild(div);

          
       });

       _messageElement = document.createTextNode( _dataStore[0].title ) //loads first video from playlist
       console.log(111,_messageElement, untilReached);
       document.getElementById('output')
               .appendChild( _messageElement );
      switchVideo( { target: { getAttribute: function(){ return 0 }}}, true );
      next++; //loads playlist with second video
   });
})()


function switchVideo(event,paused) {

    console.log(22,event.target)
    var key = event.target.getAttribute("key");
    // playlist = [{"platform_id":"14266090","content_url":"http://news12bk.videodownload.worldnow.com/NEWS12BK_1104201817553500000AA.mp4","title":"3 hurt in Bensonhurst fire","image_url":"http://NEWS12BK.images.worldnow.com/images/14266090_vtf.jpg"},{"platform_id":"14260792","content_url":"http://news12bk.videodownload.worldnow.com/NEWS12BK_0904201820093900000AA.mp4","title":"Congress members call on BK residents to fight for political change","image_url":"http://NEWS12BK.images.worldnow.com/images/14260792_vtf.jpg"},{"platform_id":"14267092","content_url":"http://news12bk.videodownload.worldnow.com/NEWS12BK_1104201822323200000AA.mp4","title":"Mother seeks justice after daughter's body found in Canarsie","image_url":"http://NEWS12BK.images.worldnow.com/images/14267092_vtf.jpg"},{"platform_id":"14263236","platform":"custom_rss","content_url":"http://news12bk.videodownload.worldnow.com/NEWS12BK_1004201817470100000AA.mp4","title":"Remains of dismembered woman found in Canarsie Park","image_url":"http://NEWS12BK.images.worldnow.com/images/14263236_vtf.jpg"},{"platform_id":"14263836","content_url":"http://news12bk.videodownload.worldnow.com/NEWS12BK_1004201820064600000AA.mp4","title":"Jury finds St. Hubert guilty of stabbing children","image_url":"http://NEWS12BK.images.worldnow.com/images/14263836_vtf.jpg"}]

    console.log(222, updateVideo, key, untilReached); //playlist[0])
    updateVideo( parseInt(key) );
    
    (!paused) && document.querySelector("#video_player").play();
    untilReached = (key + 5) % 5;
    next = untilReached;

    document.querySelector("#video_player").onended = function () {
        next = (next + 5) % 5; //playlist infinite loops, automatically comment to stop 
        console.log(88,next )
        updateVideo(next++); //queue playlist with next video
        document.querySelector("#video_player").play()  ; 
        if( next == untilReached ) {
            document.querySelector("#video_player").onended = "";
        }
    };
} 

function updateVideo(index) {
    _messageElement.innerHTML =_dataStore[ index ].title;
    console.log(99,index, _dataStore[ index ].title);

   var video =  document.querySelector("#video_player");
   video.setAttribute("src", _dataStore[ index ].content_url);

}