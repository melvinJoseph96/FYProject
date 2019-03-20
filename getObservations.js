var request = require("request");
var content = document.getElementById("input-feel").value;

var options = { method: 'POST',
  url: 'https://api.infermedica.com/v2/parse',
  headers: 
   { 'Postman-Token': '9cdae961-e5a7-40b8-8818-a5f05f4c2038',
     'cache-control': 'no-cache',
     'Content-Type': 'application/json',
     'App-Key': 'b1391d83c8e0f6951c8690c51d4be6a5',
     'App-Id': 'd94d8f95' },
  body: { text: content },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log('hello'+response);

  console.log(body);
});
