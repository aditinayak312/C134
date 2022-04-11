sound="";
objectDetector="";
st="";
objects=[];

function preload(){
sound=loadSound("alarmSoundEffect.mp3");
}

function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.hide();
video.size(380,380);
objectDetector=ml5.objectDetector("cocossd",modelLoaded);
}

function modelLoaded(){
    console.log("modelLoaded");
    st="true";
}
function getResult(error,results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw(){

    image(video,0,0,380,380);

    if(st !=""){

        r=random(255);
        g=random(255);
        b=random(255);

               for( var i=0 ; i<objects.length ; i++){

                objectDetector.detect(video,getResult);

            document.getElementById("status").innerHTML="Status : Object Detected";
            fill(r,g,b);
            holder=floor(objects[i].confidence*100);
           text(objects[i].label+" "+ holder + "%" , objects[i].x+15 , objects[i].y+15 );
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

            if(objects[i].label=="person"){
                document.getElementById("baby").innerHTML= "BABY FOUND";
                sound.stop();
            }
            else{
                document.getElementById("baby").innerHTML= "BABY NOT FOUND";
                sound.play();
            }

        }
         if(objects.length==0){
            document.getElementById("baby").innerHTML= "BABY NOT FOUND";
            sound.play();
         }
    }

}
