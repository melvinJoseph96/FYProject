function diagnose() {
  toDiagnose = {};
  evidences = [];
  var sex = "";
  const sb = document.getElementById("sex-radio-inline-1").checked;
  if (sb) {
    sex = "male"
  } else {
    sex = "female"
  }
  const age = document.getElementById("input-age").value

  var ul = document.getElementById("obs-IDs");
  var items = ul.getElementsByTagName("li");
  for (var i = 0; i < items.length; ++i) {
             
    const evi = {id:items[i].textContent, choice_id:"present",initial:true}
    evidences.push(evi)
    
  }
  
  var demos = getCheckedBoxes("cba");
  var options = document.getElementsByName("cba")
  all =[]
  for (var i = 0; i < options.length; ++i) {  all.push(options[i].id)   }


            console.log(demos)
            console.log(all)
            for (var i = 0; i < all.length; ++i) {

              if(demos.includes(all[i])){
                const evi = {id:all[i], choice_id:"present"}
                evidences.push(evi)

              }else{
                const evi = {id:all[i], choice_id:"absent"}
              evidences.push(evi)

              }
             
              
              
            }
            console.log(evidences)
            

  toDiagnose = JSON.stringify({
    sex: sex,
    age: age,
    evidence:evidences
    
  })
  sessionStorage.setItem("query", toDiagnose)
  
  console.log(typeof toDiagnose)
  const url = "https://api.infermedica.com/v2/diagnosis"
  load(url)

  function load(url) {
    
    // console.log('Request: '+content)
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var obj = JSON.parse(xhr.response)

        startINterview(obj)
      }
    }
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('App-Key', 'b1391d83c8e0f6951c8690c51d4be6a5');
    xhr.setRequestHeader('App-Id', 'd94d8f95');
    xhr.send(toDiagnose);
  }
}


// function to retrieve the checked boxes in symchecker
function getCheckedBoxes(boxName){
  var checkboxes = document.getElementsByName(boxName);
  console.log(checkboxes)
  var checkboxesChecked = [];

  for (var i=0; i<checkboxes.length; i++) {
    // And stick the checked ones onto an array...
    if (checkboxes[i].checked) {
       checkboxesChecked.push(checkboxes[i].id);
    }
 }
console.log(checkboxesChecked)
 return checkboxesChecked;
 



}

function nlp() {
  const content = document.getElementById("input-feel").value;
  
  fetch('https://api.infermedica.com/v2/parse', {
    method: 'post',
    body: JSON.stringify({
           text: content
         }),
    headers: {
      "Content-Type": "application/json",
      "App-Key": "b1391d83c8e0f6951c8690c51d4be6a5",
      "App-Id":"d94d8f95"
      
  }
  }).then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
        responseToJson(data.mentions)
      });
    }
  )


  // function load(url) {
  //   const content = document.getElementById("input-feel").value;
  //   // console.log('Request: '+content)
  //   var xhr = new XMLHttpRequest();
  //   xhr.onreadystatechange = function () {
  //     if (xhr.readyState === 4) {
  //       var obj = JSON.parse(xhr.response)

  //       responseToJson(obj.mentions)
  //     }
  //   }
  //   xhr.open("POST", url, true);
  //   xhr.setRequestHeader('Content-Type', 'application/json');
  //   xhr.setRequestHeader('App-Key', 'b1391d83c8e0f6951c8690c51d4be6a5');
  //   xhr.setRequestHeader('App-Id', 'd94d8f95');
  //   xhr.send(JSON.stringify({
  //     text: content
  //   }));
  // }
}

this.observations = {};

function responseToJson(response) {  
  this.observations = response
  let t = '';
  let r = '';
  for (let o of observations) {
    t += `
      <li>
        <i class="text-${o.choice_id === 'present' ? 'success' : 'danger'} fa fa-fw fa-${o.choice_id === 'present' ? 'plus' : 'minus'}-circle"></i>
        ${o.name}
      </li>
    `;
    r += `
    <li>${o.id}</li>
  `;
  }
  document.getElementById("observations").innerHTML = t
  document.getElementById("obs-IDs").innerHTML = r

}

function startINterview(response){  

    console.log(response)
    var strin = JSON.stringify(response)
    console.log("stringified: "+ strin)
    sessionStorage.setItem("api_query", strin)
    var queryRes = sessionStorage.getItem("api_query")
  
    console.log("The response if of type: " + typeof response);
    console.log(queryRes);

    var form = document.createElement("form");
    form.setAttribute("method", "get");
      form.setAttribute("action", "/interview");    
      document.body.appendChild(form);
      form.submit();
  
  


}