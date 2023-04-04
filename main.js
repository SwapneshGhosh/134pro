song="";
status="";
objects=[];
function preload(){
   song=loadSound("Alarm.mp3");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status: Detecting baby";
}

 
function modelLoaded(){
    console.log("model loaded");
    status=true;
    
}
function draw(){
    image(video,0,0,480,380);
    if(status!=""){

        objectDetector.detect(video,gotResult);
        for(i=0;i< objects.length;i++){
            document.getElementById("status").innerHTML="status: baby detected";
          
            fill("#03dbfc");
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#03dbfc");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person"){
                console.log("stop");
                document.getElementById("no_of_object").innerHTML="no.of objects detected are:"+ objects.length;
                song.stop();
            
            }
            else{
                console.log("play");
                document.getElementById("no_of_object").innerHTML="no.of objects detected are:"+ objects.length;
                song.play();
            }
            
        }
        if(objects.length==0){
            console.log("play");
                document.getElementById("no_of_object").innerHTML="no.of objects detected are:"+ objects.length;
                song.play();
            }
    }
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}