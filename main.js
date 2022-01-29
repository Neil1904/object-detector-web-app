img = "";
status = "";
objects = [];

function preload() {
    img = loadImage("dog_cat.jpg");
}

function draw() {
    image(img, 0, 0, 640, 420);
    
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";            
            fill("blue");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 20, objects[i].y + 20);
            noFill();
            stroke("blue");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetection = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetection.detect(img, gotresults);
}

function gotresults(error, results) {
    if (error) {
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}