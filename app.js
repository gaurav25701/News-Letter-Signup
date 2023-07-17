const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){

const firstName=req.body.fName;
const secondName=req.body.sName;
const email=req.body.email;

const data = {
  members:[
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: secondName
      }
    }
  ]
};

const jsonData = JSON.stringify(data);

const url = "https://us9.api.mailchimp.com/3.0/lists/447c3cd1a8";

const options = {
  method: "POST",
  auth: "gaurav1:1b4cf2e77a3f054a6614d9d9291cba40-us9"
}

const request = https.request(url,options,function(response){

if(response.statusCode===200){
//   res.sendFile(__dirname + "/success.html");
// }else{
  res.sendFile(__dirname + "/failure.html");
}

  response.on("data",function(data){
    console.log(JSON.parse(data));
  });
});

request.write(jsonData);
request.end();

})

app.post("/failure" , function(req,res){

res.redirect("/");

});

app.listen(process.env.PORT||3000,function(){
  console.log("Server is running on port 3000");
});


// 1b4cf2e77a3f054a6614d9d9291cba40-us9

// 447c3cd1a8.
