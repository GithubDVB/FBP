
var settings;
var clickcount = 0;
var question = 0;
var questionduration = 1;
var start; //time start
var duration; 
var userID = 10; 
var type = "Fatigue"
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
        answer = "Optie 1"
        answerSaved();
    }
    
    if(option1Clicked){
        document.getElementById('Pick1Box').style.fill = 'rgb(' + [81,211,176,1].join(',') + ')';
        document.getElementById('Pick1Text').style.color = 'white';
    } else{
        document.getElementById('Pick1Box').style.fill = 'white';
        document.getElementById('Pick1Text').style.color = 'rgb(' + [112,112,112,1].join(',') + ')';
    }
}
function clickHandler2(){ 
    clearColors();
  option2Clicked = !option2Clicked;
    
     if(option2Clicked){
        answerPicked = true; 
         answer = "Optie 2"
         answerSaved();
    }
    
    
    if(option2Clicked){
        document.getElementById('Pick2Box').style.fill = 'rgb(' + [81,211,176,1].join(',') + ')';
        document.getElementById('Pick2Text').style.color = 'white';
    } else{
        document.getElementById('Pick2Box').style.fill = 'white';
        document.getElementById('Pick2Text').style.color = 'rgb(' + [112,112,112,1].join(',') + ')';
    }
}
function clickHandler3(){ 
  option3Clicked = !option3Clicked;
    clearColors();
     if(option3Clicked){
        answerPicked = true;
         answer = "Optie 3"
         answerSaved();
        
    }
    
    if(option3Clicked){
        document.getElementById('Pick3Box').style.fill = 'rgb(' + [81,211,176,1].join(',') + ')';
        document.getElementById('Pick3Text').style.color = 'white';
    } else{
        document.getElementById('Pick3Box').style.fill = 'white';
        document.getElementById('Pick3Text').style.color = 'rgb(' + [112,112,112,1].join(',') + ')';
    }
}
function clickHandler4(){ 
  option4Clicked = !option4Clicked;
    clearColors();
     if(option4Clicked){
        answerPicked = true;
         answer = "Optie 4"
         answerSaved();
    }
    
    if(option4Clicked){
        document.getElementById('Pick4Box').style.fill = 'rgb(' + [81,211,176,1].join(',') + ')';
        document.getElementById('Pick4Text').style.color = 'white';
    } else{
        document.getElementById('Pick4Box').style.fill = 'white';
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

function getData(chart){
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
          if (data[i].id == chart){
              document.getElementById('steps').innerHTML =data[i].steps; 
              document.getElementById('active').innerHTML =data[i].active; 
              document.getElementById('resting').innerHTML =data[i].resting; 
              document.getElementById('distance').innerHTML =data[i].distance + 'km'; 
              document.getElementById('stepsDifference').innerHTML ='+' + data[i].stepsDifference; 
              document.getElementById('activeDifference').innerHTML ='+' + data[i].activeDifference; 
              document.getElementById('restDifference').innerHTML ='+'+ data[i].restingDifference; 
              document.getElementById('distanceDifference').innerHTML ='+' + data[i].distanceDifference + 'km';
              document.getElementById('timeAnnotation').innerHTML =data[i].time ;
          }
        }
    });

    
}

$(document).ready(function(){
    //getGraph(1);
    chartQuestion = question + 1
    getData(chartQuestion);
    start = Date.now();
    document.getElementById('lRoDq3D').src="loading.png"
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
    document.getElementById('Commentaar_toevoegen').onclick = function() {
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
    
    document.getElementById('Pick1Box').addEventListener('click', clickHandler1);
    document.getElementById('Pick2Box').addEventListener('click', clickHandler2);
    document.getElementById('Pick3Box').addEventListener('click', clickHandler3);
    document.getElementById('Pick4Box').addEventListener('click', clickHandler4);
    document.getElementById('nextButton').addEventListener('click', clickHandlerNext);
    document.getElementById('backButton').addEventListener('click', clickHandlerBack);

    
    document.getElementById('Pick2Box').style.fill = 'rgb(' + [81,211,176,1].join(',') + ')';
    document.getElementById('Pick2Text').style.color = 'white';
    
    loadQuestion(question)
    
});
    
    
});
function getGraph(chart) {
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
          if (images[i].id == chart){
              console.log(images[i].image);
              document.getElementById('lRoDq3D').src=images[i].image; 
          }
        }
    });
    console.log("graphloading")
    
    //setTimeout( getGraph(chart), 5000 );
}

function loadQuestion(init) {
        document.getElementById('lRoDq3D').src="loading.png"; 
        chartQuestion = init + 1
        getData(chartQuestion);
        start = Date.now();
        clearColors()
        switch (init) {
            case 0:
                $("#progressBar").animate({
                    width: '50'
                }, 1500); 
                //document.getElementById('progressBar').style.width = '5px';
                
                document.getElementById('vraagAnnotation').innerHTML = 'Hoe moe was je denk je om ';
                document.getElementById('Pick1Text').innerHTML = 'Niet moe';
                document.getElementById('Pick2Text').innerHTML = 'Een beetje moe';
                document.getElementById('Pick3Text').innerHTML = 'Moe';
                document.getElementById('Pick4Text').innerHTML = 'Heel erg moe';
                getGraph(1);
                break;
            case 1:
                $("#progressBar").animate({
                    width: '120'
                }, 1500); 
                //document.getElementById('progressBar').style.width = '90px';
                document.getElementById('vraagAnnotation').innerHTML = 'Vergeleken met je vorige antwoord, hoe moe was je om  ';
                document.getElementById('Pick1Text').innerHTML = 'Minder moe';
                document.getElementById('Pick2Text').innerHTML = 'Ongeveer zelfde';
                document.getElementById('Pick3Text').innerHTML = 'Meer moe';
                document.getElementById('Pick4Text').innerHTML = 'Weet ik niet';
                getGraph(2);
                break;
            case 2:
                $("#progressBar").animate({
                    width: '180'
                }, 1500); 
                document.getElementById('vraagAnnotation').innerHTML = 'Vergeleken met je vorige antwoord, hoe moe was je om  ';
                document.getElementById('Pick1Text').innerHTML = 'Minder moe';
                document.getElementById('Pick2Text').innerHTML = 'Ongeveer zelfde';
                document.getElementById('Pick3Text').innerHTML = 'Meer moe';
                document.getElementById('Pick4Text').innerHTML = 'Weet ik niet';
                getGraph(3);
                break;
            case 3:
                $("#progressBar").animate({
                    width: '240'
                }, 1500); 
                document.getElementById('vraagAnnotation').innerHTML = 'Vergeleken met je vorige antwoord, hoe moe was je om  ';
                document.getElementById('Pick1Text').innerHTML = 'Minder moe';
                document.getElementById('Pick2Text').innerHTML = 'Ongeveer zelfde';
                document.getElementById('Pick3Text').innerHTML = 'Meer moe';
                document.getElementById('Pick4Text').innerHTML = 'Weet ik niet';
                getGraph(4);
                break;
            case 4:
                $("#progressBar").animate({
                    width: '300'
                }, 1500); 
                document.getElementById('vraagAnnotation').innerHTML = 'Vergeleken met je vorige antwoord, hoe moe was je om  ';
                document.getElementById('Pick1Text').innerHTML = 'Minder moe';
                document.getElementById('Pick2Text').innerHTML = 'Ongeveer zelfde';
                document.getElementById('Pick3Text').innerHTML = 'Meer moe';
                document.getElementById('Pick4Text').innerHTML = 'Weet ik niet';
                getGraph(5);
                break;
            case 5:
                $("#progressBar").animate({
                    width: '314'
                }, 1500); 
                window.location.href = "welldoneScreen.html";
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
    document.getElementById('Pick1Box').style.fill = 'white';
    document.getElementById('Pick1Text').style.color = 'rgb(' + [112,112,112,1].join(',') + ')';
    document.getElementById('Pick2Box').style.fill = 'white';
    document.getElementById('Pick2Text').style.color = 'rgb(' + [112,112,112,1].join(',') + ')';
    document.getElementById('Pick3Box').style.fill = 'white';
    document.getElementById('Pick3Text').style.color = 'rgb(' + [112,112,112,1].join(',') + ')';
    document.getElementById('Pick4Box').style.fill = 'white';
    document.getElementById('Pick4Text').style.color = 'rgb(' + [112,112,112,1].join(',') + ')';
}
                  