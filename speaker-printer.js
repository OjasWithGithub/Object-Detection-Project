status = ""
objects = []
function preload(){

    img = loadImage("speaker-printer.jpg")
}

function setup(){
    canvas = createCanvas(550,420);
    canvas.center()


    objectDetector = ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML = "Model Loading..."
}

function modelLoaded(){
    document.getElementById("status").innerHTML = "Model Loaded!"
    console.log("Model_loaded")
    status = true
    objectDetector.detect(img,gotResult)

}

function gotResult(error,results){
    if(error){
        console.log(error)
    }
    console.log(results)
    objects = results
}

function draw(){

    image(img,0,0,550,420)
    
    if (status != ""){
        for (i = 0; i < objects.length; i++){

            r = random(255)
            g = random(255)
            b = random(255)

            document.getElementById("objects").innerHTML = "No.of Objects: 2| No.of objects detected: "+objects.length;

            fill(r,g,b)
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " "+percent+"%", objects[i].x + 15,objects[i].y + 15)
            noFill();
            stroke(r,g,b)
            rect(objects[i].x, objects[i].y,objects[i].width,objects[i].height)
 
        }
    }

}