callback = function(response) { response.on('data', function (chunk) { str += chunk; }); response.on('end', function () { console.log(req.data); console.log(str); // your code here if you want to use the results ! }); } var req = http.request(options, callback).end();


