
var settings;
var clickcount = 0;
var question = 0;
var questionduration = 1;
var start; //time start
var duration; 
var userID = 10; 
var type = "QuickAnnotation"
var answer = "Undefined"; 
var comment = ""

var userName; 
var imageLink; 
var participantID;
var userNumber = 1; 
var answerPicked = false; 

var option1Clicked = false;
var option2Clicked = false;
var option3Clicked = false;
var option4Clicked = false;
function clickHandler1(){ 
  option1Clicked = !option1Clicked;
clearColors();
    if(option1Clicked){
        answerPicked = true; 
        answer = "Pain"
        answerSaved();
    }
    
    if(option1Clicked){
        document.getElementById('pick1').style.fill = 'rgb(' + [81,211,176,1].join(',') + ')';
        document.getElementById('Pick1Text').style.color = 'white';
    } else{
        document.getElementById('pick1').style.fill = 'white';
        document.getElementById('Pick1Text').style.color = 'rgb(' + [112,112,112,1].join(',') + ')';
    }
}
function clickHandler2(){ 
    clearColors();
  option2Clicked = !option2Clicked;
    
     if(option2Clicked){
        answerPicked = true; 
         answer = "Fatigue"
         answerSaved();
    }
    
    
    if(option2Clicked){
        document.getElementById('pick2').style.fill = 'rgb(' + [81,211,176,1].join(',') + ')';
        document.getElementById('Pick2Text').style.color = 'white';
    } else{
        document.getElementById('pick2').style.fill = 'white';
        document.getElementById('Pick2Text').style.color = 'rgb(' + [112,112,112,1].join(',') + ')';
    }
}
function clickHandler3(){ 
  option3Clicked = !option3Clicked;
    clearColors();
     if(option3Clicked){
        answerPicked = true;
         answer = "Stress"
         answerSaved();
        
    }
    
    if(option3Clicked){
        document.getElementById('pick3').style.fill = 'rgb(' + [81,211,176,1].join(',') + ')';
        document.getElementById('Pick3Text').style.color = 'white';
    } else{
        document.getElementById('pick3').style.fill = 'white';
        document.getElementById('Pick3Text').style.color = 'rgb(' + [112,112,112,1].join(',') + ')';
    }
}
function clickHandler4(){ 
  option4Clicked = !option4Clicked;
    clearColors();
     if(option4Clicked){
        answerPicked = true;
         answer = "Other option"
         answerSaved();
    }
    
    if(option4Clicked){
        document.getElementById('pick4').style.fill = 'rgb(' + [81,211,176,1].join(',') + ')';
        document.getElementById('Pick4Text').style.color = 'white';
    } else{
        document.getElementById('pick4').style.fill = 'white';
        document.getElementById('Pick4Text').style.color = 'rgb(' + [112,112,112,1].join(',') + ')';
    }
}

function clickHandlerNext(){ 
  if(answerPicked){
    question++;
    uploadAnnotation();
    loadQuestion(question); 
    answerPicked = false; 
    
  }
}

function clickHandlerBack(){ 
    if (question == 0){
        window.location.href = "index.html";

    }else{ 
     question--;
    loadQuestion(question); 
    answerPicked = false; 
    }
    
    
  
}

function answerSaved(){
    document.getElementById('Icon_awesome-check').style.visibility = 'visible';
    document.getElementById('answerSaved').style.visibility = 'visible';
}
function notAnswerSaved(){
    document.getElementById('Icon_awesome-check').style.visibility = 'hidden';
    document.getElementById('answerSaved').style.visibility = 'hidden';
}


$(document).ready(function(){
    //getGraph(1);
    start = Date.now();
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
    document.getElementById('Add_comment').onclick = function() {
        comment = prompt("Noteer je commentaar hier beneden", "");
    };
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
    
    document.getElementById('pick1').addEventListener('click', clickHandler1);
    document.getElementById('pick2').addEventListener('click', clickHandler2);
    document.getElementById('pick3').addEventListener('click', clickHandler3);
    document.getElementById('pick4').addEventListener('click', clickHandler4);
//    document.getElementById('Pick1Text').addEventListener('click', clickHandler1);
//    document.getElementById('Pick2Text').addEventListener('click', clickHandler2);
//    document.getElementById('Pick3Text').addEventListener('click', clickHandler3);
//    document.getElementById('Pick4Text').addEventListener('click', clickHandler4);
    document.getElementById('nextButton').addEventListener('click', clickHandlerNext);
    document.getElementById('backButton').addEventListener('click', clickHandlerBack);

    
    
    loadQuestion(question)
    
});
    
    
});

function loadQuestion(init) {
        start = Date.now();
        clearColors()
        switch (init) {
            case 0:
            
                //document.getElementById('progressBar').style.width = '5px';
                
                document.getElementById('vraagAnnotation').innerHTML = 'Kies je type annotatie';
                document.getElementById('Pick1Text').innerHTML = 'Pijn';
                document.getElementById('Pick2Text').innerHTML = 'Vermoeiheid';
                document.getElementById('Pick3Text').innerHTML = 'Stress';
                document.getElementById('Pick4Text').innerHTML = 'Iets anders';
                break;
            case 1:
                
                //document.getElementById('progressBar').style.width = '90px';
                document.getElementById('vraagAnnotation').innerHTML = 'Hoeveel minuten was dit geleden?';
                document.getElementById('Pick1Text').innerHTML = 'Nu';
                document.getElementById('Pick2Text').innerHTML = '1 tot 5 ';
                document.getElementById('Pick3Text').innerHTML = '5 tot 10';
                document.getElementById('Pick4Text').innerHTML = 'Meer dan 10';
                break;
            case 2:
                uploadAnnotation()
                window.location.href = "index.html";
                break;
        }   
    
}
function uploadAnnotation(){
    
    duration = Date.now() - start;
    var jsondata = {"userID": userID,"type": type, "questionNumber": question, "answer": answer, "duration": duration, "time": Date.now(), "comment": comment};
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://fbpapp-d2bd.restdb.io/rest/annotations",
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-apikey": "5fc7ba18e8c44553528c8eb5",
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify(jsondata)
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
}


function clearColors(){
    notAnswerSaved(); 
    comment = ""
    document.getElementById('pick1').style.fill = 'white';
    document.getElementById('Pick1Text').style.color = 'rgb(' + [112,112,112,1].join(',') + ')';
    document.getElementById('pick2').style.fill = 'white';
    document.getElementById('Pick2Text').style.color = 'rgb(' + [112,112,112,1].join(',') + ')';
    document.getElementById('pick3').style.fill = 'white';
    document.getElementById('Pick3Text').style.color = 'rgb(' + [112,112,112,1].join(',') + ')';
    document.getElementById('pick4').style.fill = 'white';
    document.getElementById('Pick4Text').style.color = 'rgb(' + [112,112,112,1].join(',') + ')';
}
                  