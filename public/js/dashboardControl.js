function back2d(){

  //var email = document.getElementById("medUsersOnline").value
  var email =sessionStorage.getItem("email")
  console.log("in front end:"+ sessionStorage.getItem("email"))
  fetch("/users/videochatRev", {
    method: 'POST', // or 'PUT'
    body: JSON.stringify({text: email}), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    },
    redirect:'follow'
  }).then(function(response){
    if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }

            response.json().then(function(data){
              console.log(data)
              window.location.href = '/dashboard'
              


            })


  })









}




function medicReady(){
   // window.location.href = '/videochatMP'
    var email = document.getElementById("medicReady").value
    console.log("in front end:"+ email)
    
    console.log(email)

    fetch("/users/videochat", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({text: email}), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      },
      redirect:'follow'
    }).then(function(response){
      if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status);
                return;
              }

              response.json().then(function(data){
                console.log(data)
                window.location.href = '/videochatMP'
                sessionStorage.setItem('email',email)


              })


    })


    
    
    











  
}

