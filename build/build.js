var numberOfShapes = 15;
var speed;
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER).noFill().frameRate(30);
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
//# sourceMappingURL=../sketch/sketch/build.js.map