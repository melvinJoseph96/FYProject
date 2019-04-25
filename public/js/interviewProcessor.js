function load() {
    var queryRes = sessionStorage.getItem("api_query")
    var query = sessionStorage.getItem('query')
    
    
    var jsonResponse = JSON.parse(queryRes)
    var jsonRequest = JSON.parse(query)
    console.log(jsonResponse)
    console.log(jsonRequest)

    document.getElementById("question").innerHTML = jsonResponse.question.text
    
    if(jsonResponse.question.type == 'group_single'){

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

        var items = jsonResponse.question.items
        let answersGroupMultiple =''
        for (let o of items) {

        answersGroupMultiple += ` <div class="custom-control custom-checkbox">
        <input id="${i.id}" type="checkbox" class="custom-control-input">
        <label for="${i.id}" class="custom-control-label custom-checkbox mb-2 mr-sm-2 mb-sm-0">${i.name}</label>
      </div>    `
        }

        document.getElementById('step-container').innerHTML = answersGroupMultiple; 


        
    }

    if(jsonResponse.question.type == 'single'){
        document.getElementById('next-step').disabled = true


        answerSingle =   
        `
        <div>
        <button type="button" id ="yes" value="${jsonResponse.question.text}" data-value="true" class="next-question btn btn-success">Yes</button>
        <button type="button" id ="no" value="${jsonResponse.question.text}" data-value="false" class="next-question btn btn-danger">No</button>
        <button type="button" id ="skip" value="${jsonResponse.question.text}" data-value="unknown" class="next-question btn btn-info">Skip question</button>
      </div> 
      `
      document.getElementById('step-container').innerHTML = answerSingle;
      document.getElementById("yes").onclick = function(){




      }


      
      


        
    }






}
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

function next(){



    evidences = []
    var t = getCheckedBoxes('radio');
    var options = document.getElementsByName("radio")
    all =[]
  for (var i = 0; i < options.length; ++i) {  all.push(options[i].id)   }

    for (var i = 0; i < all.options; ++i) {

        if(t.includes(all[i])){
          const evi = {id:all[i], choice_id:"present"}
          evidences.push(evi)

        }else{
          const evi = {id:all[i], choice_id:"absent"}
        evidences.push(evi)

        }
    }
}












