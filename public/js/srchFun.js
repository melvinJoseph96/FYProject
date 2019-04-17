var request = require("request")

function nlp(){
  console.log('po');

  const content = document.getElementById("input-feel").value;


var options = { method: 'POST',
  url: 'https://api.infermedica.com/v2/parse',
  headers: 
   { 'Postman-Token': '770241ba-792d-46fd-b24b-36d0f7da65f5',
     'cache-control': 'no-cache',
     'Content-Type': 'application/json',
     'App-Key': 'b1391d83c8e0f6951c8690c51d4be6a5',
     'App-Id': 'd94d8f95' },
  body: { text: content },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);



  console.log(body);
});


}



