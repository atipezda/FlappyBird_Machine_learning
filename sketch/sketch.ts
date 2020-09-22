let birds: Bird[] = [];
let obstacles: Obstacle[] = [];
let pipesCleared: number = 0;
let obstaclesHit: number;
let playQuality: number;


function setup() {
    console.log("🚀 - Setup initialized - P5 is running");

    // FULLSCREEN CANVAS
    createCanvas(windowWidth, windowHeight);

    // SETUP SOME OPTIONS
    frameRate(50);

    birds.push(new Bird());
    birds.push(new Bird());
    birds.push(new Bird());
    birds.push(new Bird());
    pipesCleared = 0
    obstaclesHit = 0
    playQuality = 10
    obstacles.push(new Obstacle())
}

function draw() {
    clear()
    fill(0, 0, 255)
    textSize(20)
    textFont("Helvetica")
    text('Obstacles Cleared: ' + pipesCleared, 20, 20)
    text('Obstacle Damage: ' + obstaclesHit, 20, 40)
    text('Play Quality: ' + String(1 + (pipesCleared / obstaclesHit) || 4).substring(0, 4) + '/5', 20, 60);
    // bird.show()
    // bird.update()
    // background('#FF0000')

    if (frameCount % 100 == 0) {
        obstacles.push(new Obstacle())
    }

    for (let z=0; z<birds.length; z+=1){
        birds[z].show();
        birds[z].update();
        for (let i = obstacles.length - 1; i >= 0; i-=1) {
            let isAlive = birds[z].hits(obstacles[i]);
        }
    }

    birds = birds.filter(bird => bird.isAlive);

    for (let i = obstacles.length - 1; i >= 0; i-=1) {
        obstacles[i].show();
        obstacles[i].update();
        // if (obstacles[i].hits(bird)) {
        //     obstaclesHit++
        // }
        //
        // if (obstacles[i].offscreen()) {
        //     obstacles.splice(i, 1)
        //     pipesCleared++
        // }
    }
}

function keyPressed() {
    if (key === " ") {
        birds[0].goUp()
    }
}
