let numberOfShapes = 15;
let speed: p5.Element;

function setup() {
    console.log("🚀 - Setup initialized - P5 is running");

    // FULLSCREEN CANVAS
    createCanvas(windowWidth, windowHeight);

    // SETUP SOME OPTIONS
    rectMode(CENTER).noFill().frameRate(30);

    // SPEED SLIDER
    speed = createSlider(0, 15, 3, 1);
    speed.position(10, 10);
    speed.style("width", "80px");
}



function draw() {
    background(0);
    fill(255);
    text('Hello world', 10, 50);
}

function windowResized() {
    createCanvas(windowWidth, windowHeight);
}
