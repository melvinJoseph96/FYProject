function load() {
    var queryRes = sessionStorage.getItem("api_query")
    var query = sessionStorage.getItem('query')
    console.log(query)
    
    var jsonObject = JSON.parse(queryRes)
    var jsonQuery = JSON.parse(query)
    console.log(jsonObject)
    console.log(jsonQuery)

    document.getElementById("question").innerHTML = jsonObject.question.text
    
    if(jsonObject.question.type == 'group_single'){

        var items = jsonObject.question.items
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
    if(jsonObject.question.type == 'group_multiple'){

        var items = jsonObject.question.items
        let answersGroupMultiple =''
        for (let o of items) {

        answersGroupMultiple += ` <div class="custom-control custom-checkbox">
        <input id="${i.id}" type="checkbox" class="custom-control-input">
        <label for="${i.id}" class="custom-control-label custom-checkbox mb-2 mr-sm-2 mb-sm-0">${i.name}</label>
      </div>    `
        }

        document.getElementById('step-container').innerHTML = answersGroupMultiple; 


        
    }

    if(jsonObject.question.type == 'single'){
        document.getElementById('next-step').disabled = true


        answerSingle =   
        `
        <div>
        <button type="button" data-value="true" class="next-question btn btn-success">Yes</button>
        <button type="button" data-value="false" class="next-question btn btn-danger">No</button>
        <button type="button" data-value="unknown" class="next-question btn btn-info">Skip question</button>
      </div> 
      `
      document.getElementById('step-container').innerHTML = answerSingle;
      
      


        
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












