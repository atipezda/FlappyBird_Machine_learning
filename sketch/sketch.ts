let birds: Bird[] = [];
let obstacles: Obstacle[] = [];
let score = 0;
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");

    // FULLSCREEN CANVAS
    createCanvas(windowWidth, windowHeight);

    // SETUP SOME OPTIONS
    frameRate(50);

    birds.push(new Bird());
    console.log(birds.length)
    obstacles.push(new Obstacle())
}

function draw() {
    clear()
    fill(0, 0, 255)
    textSize(20)
    textFont("Helvetica")
    text('score: ' + score, 20, 20)

    if (frameCount % 100 == 0) {
        obstacles.push(new Obstacle())
    }

    for (let z=0; z<birds.length; z+=1){
        birds[z].show();
        birds[z].update();
        for (let i = obstacles.length - 1; i >= 0; i-=1) {
            let isAlive = birds[z].hits(obstacles[i]);
        }
        const nextObstacle = obstacles[0].passesBird() ? obstacles[1] : obstacles[0];
        birds[z].updateNextObstacle(nextObstacle);
    }

    birds = birds.filter(bird => bird.isAlive);

    for (let i = obstacles.length - 1; i >= 0; i-=1) {
        obstacles[i].show();
        obstacles[i].update();
        // if (obstacles[i].hits(bird)) {
        //     obstaclesHit++
        // }
        //
        if (!obstacles[i].passed && obstacles[i].passesBird()) {

            score++;
        }
        if(obstacles[i].isOffScreen()){
            obstacles.splice(i, 1)
        }
    }
}

function keyPressed() {
    if (key === " ") {
        birds[0].goUp()
    }
}
