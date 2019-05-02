  var socket = io();

  var video = document.getElementById('video');
  var email = document.getElementById("connect_button").value


  document.getElementById("connect_button").onclick = function(){

    fetch("/users/getSocketID", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        text: email
      }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow'
    }).then(function (response) {
      console.log(response)
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
  
      response.json().then(function (data) {
        console.log(data)
        var socket_id = data.socket_id
        const peerConnection = new RTCPeerConnection();
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          // Not adding `{ audio: true }` since we only want video now
          navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          }).then(function (stream) {
            //video.src = window.URL.createObjectURL(stream);
  
            video.srcObject = stream;
            video.play();
            mediaStreamTracks = []
            mediaStreamTracks = stream.getVideoTracks();
            console.log(typeof stream.getVideoTracks()[0])
            console.log(1)
            peerConnection.addTrack(stream.getVideoTracks()[0]);
            peerConnection.createOffer()
              .then(sdp => peerConnection.setLocalDescription(sdp))
            console.log(2)
              .then(function () {
                console.log(3)
  
                socket.broadcast.to(socket_id).emit('offer', peerConnection.localDescription);
                console.log(4)
  
  
              })
  
            //       setInterval(function(){
  
            // //   canvas.width = video.videoWidth;
            // //  canvas.height = video.videoHeight;
  
            // //  ctx.drawImage(video,0,0,canvas.width, canvas.height);
  
            //  //const image_data = canvas.toDataURL("image/jpeg", 0.4);
            //  //canvas.srcObject = image_data
  
            //  socket.broadcast.emit('sendImage', {
  
            //   image:image_data
            //  })
  
  
  
            //  },100);
          });
          socket.on('answer', function (message) {
            peerConnection.setRemoteDescription(message)
  
  
          })
  
  
        }
  
  
      })
  
  
    })



  }
  
 