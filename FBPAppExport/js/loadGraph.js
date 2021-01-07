
var settings;
var clickcount = 0;
var question = 0;
var questionduration = 1;
var start; //time start
var duration; 
var userID = 10; 
var type = "Fatigue"
var answer = "Undefined"; 


var userName; 
var imageLink; 
var participantID;
var userNumber = 1; 
var answerPicked = false; 

var option1Clicked = false;
var option2Clicked = false;
var option3Clicked = false;
var option4Clicked = false;


$(document).ready(function(){
    getGraph();
    getData();
    start = Date.now();
    //document.getElementById('lRoDq3D').src=""
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://fbpapp-d2bd.restdb.io/rest/images",
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "x-apikey": "5fc7ba18e8c44553528c8eb5",
        "cache-control": "no-cache"
        }
        }
    
    

    $.ajax(settings).done(function (images) {
    
    participantID = images[0]._id;
    imageLink = images[0].image;
    console.log(images);
    console.log(imageLink);
    for (i = 0; i < images.length; i++) {
      if (images[i].id == 2){
          console.log(images[i].image);
          //document.getElementById('lRoDq3D').src=images[i].image; 
      }
    }
    

    
});
    
    
});

function getData(){
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://fbpapp-d2bd.restdb.io/rest/datamove",
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "x-apikey": "5fc7ba18e8c44553528c8eb5",
        "cache-control": "no-cache"
      }
    }

    $.ajax(settings).done(function (data) {
      for (i = 0; i < data.length; i++) {
          if (data[i].id == 0){
              document.getElementById('steps').innerHTML =data[i].steps; 
              document.getElementById('active').innerHTML =data[i].active; 
              document.getElementById('resting').innerHTML =data[i].resting; 
              document.getElementById('distance').innerHTML =data[i].distance + 'km'; 
          }
        }
    });

    
}



function getGraph() {
getData();
 var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://fbpapp-d2bd.restdb.io/rest/images",
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "x-apikey": "5fc7ba18e8c44553528c8eb5",
        "cache-control": "no-cache"
      }
    }

    $.ajax(settings).done(function (images) {
        participantID = images[0]._id;
        imageLink = images[0].image;
        console.log(images);
        console.log(imageLink);
        for (i = 0; i < images.length; i++) {
          if (images[i].id == 0){
              console.log(images[i].image);
              document.getElementById('lRoDq3D').src=images[i].image; 
          }
        }
    });
    console.log("graphloading")
    
    setTimeout( getGraph, 5000 );
}







                  