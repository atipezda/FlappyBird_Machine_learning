let birds: Bird[] = [];
let obstacles: Obstacle[] = [];
let score = 0;
const birdsAmount = 500;


function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    tf.setBackend('cpu');
    // FULLSCREEN CANVAS
    createCanvas(windowWidth, windowHeight);

    // SETUP SOME OPTIONS
    frameRate(50);

    for(let i=0; i<birdsAmount; i++){
        birds.push(new Bird());
    }

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

    const nextObstacle = obstacles[0].passesBird() ? obstacles[1] : obstacles[0];
    for (let z=0; z<birds.length; z+=1){

        for (let i = obstacles.length - 1; i >= 0; i-=1) {
            let isAlive = birds[z].hits(obstacles[i]);
        }
        birds[z].updateNextObstacle(nextObstacle);
        birds[z].think();
        birds[z].update();
        birds[z].show();
    }

    birds = birds.filter(bird => bird.isAlive);


}

function keyPressed() {
    if (key === " ") {
        birds[0].goUp()
    }
}
