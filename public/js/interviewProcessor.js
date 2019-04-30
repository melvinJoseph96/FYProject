function sendRequest(request){
    
    console.log(typeof request)
    console.log(JSON.parse(request))

    fetch('https://api.infermedica.com/v2/diagnosis', {
    method: 'post',
    body: request,
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
        load(JSON.stringify(data))
      });
    }
  )
  // load(url)

  // function load(url) {    
    
  //   var xhr = new XMLHttpRequest();
  //   xhr.onreadystatechange = function () {
  //     if (xhr.readyState === 4) {
  //       var obj = JSON.parse(xhr.response)
        
  //       console.log(obj)
  //       load(JSON.stringify(obj))
  //     }
  //   }
  //   xhr.open("POST", url, true);
  //   xhr.setRequestHeader('Content-Type', 'application/json');
  //   xhr.setRequestHeader('App-Key', 'b1391d83c8e0f6951c8690c51d4be6a5');
  //   xhr.setRequestHeader('App-Id', 'd94d8f95');
  //   xhr.send(request);
  // }



}

function initLoad(){
    var queryRes = sessionStorage.getItem("api_query")
    load(queryRes);
    


}

function load(queryResponse) {
      
    
    
    var jsonResponse = JSON.parse(queryResponse)
    var query = sessionStorage.getItem("query")
    console.log(query)
    
    
    console.log(jsonResponse)
    //console.log(jsonRequest)
    if(jsonResponse.should_stop){

      let summary = ''
      summary = `  <h5 class="card-title">Summary</h5>
      <div class="card-text">
        <p>Based on the interview, you could suffer from:</p>
        ${jsonResponse.conditions.map(condition => `
          <div class="summary-item row">
            <div class="col-8">
              ${condition.name}
              ${condition.probability >= 0.2
                ? `<i class="fa fa-fw fa-eye"></i><a href data-id="${condition.id}" class="explain">explain</a>` : ``}
            </div>
            <div class="col-4">
              <div class="progress">
                <div class="progress-bar bg-info" role="progressbar" style="width: ${Math.floor(condition.probability * 100)}%">${Math.floor(condition.probability * 100)}%</div>
              </div>
            </div>
            <div class="explanation col-12"></div>
          </div>          
        `)}
        <div class="alert alert-warning" role="alert">
          <i class="fa fa-info-circle"></i> Please note that the list below may not be complete and is provided solely for informational purposes
           and is not a qualified medical opinion. If you would like to talk to a medical professional please return to dashboard .
        </div>
      </div>`


      document.getElementById("question").innerHTML = "Here are the results"
      document.getElementById('step-container').innerHTML = summary;
      
      
     
     
      //document.getElementById('next-step').onclick = window.location.href ="/dashboard"




    }else{

      document.getElementById("question").innerHTML = jsonResponse.question.text
    
    if(jsonResponse.question.type == 'group_single'){
      document.getElementById('next-step').disabled = false

        var items = jsonResponse.question.items
        let answersGroupSingle =''
        for (let o of items) {
            answersGroupSingle += 
           `                                             
                      <div class="custom-control custom-radio">
                        <input type="radio" id="${o.id}" name="radio" class="custom-control-input">
                        <label class="custom-control-label" for="${o.id}">${o.name}</label>
                      </div>
                    `
                  }
                
           

          document.getElementById('step-container').innerHTML = answersGroupSingle;



    }
    if(jsonResponse.question.type == 'group_multiple'){

      document.getElementById('next-step').disabled = false  
      var items = jsonResponse.question.items
        let answersGroupMultiple =''
        for (let o of items) {

        answersGroupMultiple += ` <div class="custom-control custom-checkbox">
        <input id="${o.id}" type="checkbox" name="checkbox" class="custom-control-input">
        <label for="${o.id}" class="custom-control-label custom-checkbox mb-2 mr-sm-2 mb-sm-0">${o.name}</label>
      </div>    `
        }

        document.getElementById('step-container').innerHTML = answersGroupMultiple; 


        
    }

    if(jsonResponse.question.type == 'single'){
      console.log(jsonResponse)
      console.log(jsonResponse.question.items[0].id)
        document.getElementById('next-step').disabled = true


        answerSingle =   
        `
        <div>
        <button type="button" id ="yes" value="${jsonResponse.question.items[0].id}" data-value="true" onclick ="singleNext(this.id)" class="next-question btn btn-success">Yes</button>
        <button type="button" id ="no" value="${jsonResponse.question.items[0].id}" data-value="false" onclick ="singleNext(this.id)" class="next-question btn btn-danger">No</button>
        <button type="button" id ="skip" value="${jsonResponse.question.items[0].id}" data-value="unknown" onclick ="singleNext(this.id)" class="next-question btn btn-info">Skip question</button>
      </div> 
      `
      document.getElementById('step-container').innerHTML = answerSingle;
      


      
      


        
    }

    }

    
    

    






}
function getCheckedBoxes(boxName){
    var checkboxes = document.getElementsByName(boxName);
    
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

function next(){
    var query = sessionStorage.getItem('query')
    var jsonRequest = JSON.parse(query)
    console.log(jsonRequest)
    

    evidences = []
    var options = document.getElementsByName("radio")
    if(options.length==0){

      var t = getCheckedBoxes('checkbox');
      options = document.getElementsByName('checkbox')
    }else{

      var t = getCheckedBoxes('radio');


    }

    
    
    all =[]
  for (var i = 0; i < options.length; ++i) {  all.push(options[i].id)   }
    console.log(all)
    for (var i = 0; i < all.length; ++i) {

        if(t.includes(all[i])){
          const evi = {id:all[i], choice_id:"present"}
          jsonRequest['evidence'].push(evi)

        }else{
          const evi = {id:all[i], choice_id:"absent"}
        jsonRequest['evidence'].push(evi)

        }
    }
    sessionStorage.removeItem('query')
    sessionStorage.setItem('query',JSON.stringify(jsonRequest) )
    console.log(jsonRequest)
    sendRequest(JSON.stringify(jsonRequest))


}

function singleNext(id){
  console.log(id)
  var query = sessionStorage.getItem('query')
    var jsonRequest = JSON.parse(query)
    var up= "";

  if(id=="yes"){

    var evi =document.getElementById('yes').value
    up = {id:evi, choice_id:"present"}

  }
  if(id=="no"){
    var evi =document.getElementById('no').value
     up = {id:evi, choice_id:"absent"}


  }
  if(id=="skip"){
    var evi =document.getElementById('skip').value
    up = {id:evi, choice_id:"unknown"}


  }

  jsonRequest['evidence'].push(up)
  sessionStorage.removeItem('query')
    sessionStorage.setItem('query',JSON.stringify(jsonRequest) )
    console.log(jsonRequest)
    sendRequest(JSON.stringify(jsonRequest))







}
    
    

















