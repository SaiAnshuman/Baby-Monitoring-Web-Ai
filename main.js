status="";
objects = [];
alarm_sound = "";

function preload(){

  alarm_sound = loadSound("alarm.mp3");

}

function setup(){

 canvas = createCanvas(380,380);
 canvas.center();
 video = createCapture(VIDEO);
 video.size(380,380);
 video.hide();
 detection = ml5.objectDetector('cocossd', modelLoaded);
 document.getElementById("status").innerHTML = "Status : Identifiying Baby.. ";

}


function modelLoaded(){
 
    console.log("Model Has Been Loaded!");
    status = true;
    


}

function gotResults(error,results){
  
    if (error){

         console.log(error);

    }

    else{
      
        console.log(results);
        objects = results;

    }


}

function draw(){

image(video,0,0,380,380);
 
if ( status != ""){

    detection.detect(video,gotResults);  
    
    r = random(255);
    g = random(255);
    b = random(255);

   for( i=0 ; i < objects.length ; i++){

    document.getElementById("status").innerHTML = "Status : Baby Identified";
    
    fill(r,g,b);
    percent = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percent + "% " ,objects[i].x + 20 , objects[i].y + 20);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

    if(objects[i].label == "person"){

        document.getElementById("baby-status").innerHTML = "Baby  Found!" ;
        alarm_sound.stop();

    }

    else{

        document.getElementById("baby-status").innerHTML = "Baby Not Found!" ;
        alarm_sound.play();

    }
    

   }
  
   if(objects.length == 0){

    document.getElementById("baby-status").innerHTML = "Baby Not Found!" ;
    alarm_sound.play();


   }

}

}


