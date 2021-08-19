const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed"
      }
    ]
  };

  var jsonData = JSON.stringify(data);

var options = {
  url: "https://us6.api.mailchimp.com/3.0/lists/56f4c3c391",
  method: "POST",
  headers: {
    "Authorization": "fatai1 fa6d189af70c0af401e4c5b99d68106e-us6"
  },
  body: jsonData
};

request(options, function(error, response, body){
  if (error) {
    res.sendFile(__dirname + "/failure.html");
  } else {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  }
});

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});
