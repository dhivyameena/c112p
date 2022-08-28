gesture="";

Webcam.set ({
    width: 350,
    height: 300, 
    image_format: 'png',
    png_quality: 90
});

camera=document.getElementById("camera");
Webcam.attach('#camera')

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'">';
    });
}

console.log('ml5 version - ', ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/H9L0yfbt5/model.json', modelLoaded);

function modelLoaded() {
    console.log('model has been loaded');
}

function speak() {
    var synth=window.speechSynthesis;
    speak_data=toSpeak;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    utterThis.rate=1;
    synth.speak(utterThis);
}

function check() {
    img=document.getElementById('capture_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        gesture=results[0].label;
        toSpeak="";
        if(gesture=="amazing"){
            toSpeak="this is looking amazing";
            document.getElementById("update_gesture").innerHTML="&#128076;";
        }
        else if(gesture=="best"){
            toSpeak="all the best";
            document.getElementById("update_gesture").innerHTML="&#128077;";
        }
        else if(gesture=="best"){
            toSpeak="marvelous victory";
            document.getElementById("update_gesture").innerHTML="&#9996;";
        }
        speak();
    }
}