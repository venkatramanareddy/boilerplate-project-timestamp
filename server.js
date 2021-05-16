// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


function formDateResp(date){
  resp = {
    unix: date.getTime(),
    utc: date.toUTCString()
  }
  return resp;
}

function getDateObject(input){
  // check if input is unix/utc/Invalid
  try{
    let date = new Date(input);
    if(date.toString() === "Invalid Date"){
      // may be utc
      console.log("Parsing as unix")
      const parsed = parseFloat(input);
      if(!Number.isNaN(parsed) && Number.isFinite(parsed) && /^\d+\.?\d+$/.test(input)){
        date = new Date(parsed);
        return date;
      }
    }
    else{
      // definitely a date
      return date;
    }
  }
  catch(e){
    console.log(`Exception : ${e}`)
    return null;
  }
  return null;
}

// gets current date/time
app.get("/api", function(req, res){
  let today = new Date()
  res.send(formDateResp(today))
})

app.get("/api/:date", function(req, res){
  console.log(req.params.date);

  let date = getDateObject(req.params.date);
  let resp =  { error : "Invalid Date" };
  if(date != null){
    console.log("date is not null!")
    resp = formDateResp(date);
  }
  console.log(`response ${JSON.stringify(resp)}`)
  res.send(resp);
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
