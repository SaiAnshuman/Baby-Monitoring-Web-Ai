status="";
objects = [];
alarm_sound = "";

function preload(){

  alarm_sound = loadSound("1.mp3");

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

    if(objects.length.person = "" ){

         alarm_sound.play();
         document.getElementById("status").innerHTML = "Status : Baby Not Identified";
         document.getElementById("baby_status").innerHTML = "Baby Not Found! " ;

    }

    else {

   for( i=0 ; i < objects.length ; i++){



    alarm_sound.stop();
    
    document.getElementById("status").innerHTML = "Status : Baby Identified";
    document.getElementById("baby_status").innerHTML = "Baby  Found! " ;

    fill(r,g,b);
    percent = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percent + "% " ,objects[i].x + 20 , objects[i].y + 20);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
    

   }
}

}

}
