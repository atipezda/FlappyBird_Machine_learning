let birds: Bird[] = [];
let obstacles: Obstacle[] = [];
let score = 0;
let savedBirds: Bird[] = [];
const birdsAmount = 250;
let counter = 0;
let gen = 1;
let best = 0;
const autoKill = false;


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

}

function draw() {
    clear()
    fill(0, 0, 255)
    textSize(20)
    textFont("Helvetica")
    text('SCORE: ' + score, 20, 20)
    text('BEST: ' + (best < score ? score : best), 20, 50)
    text('ALIVE: ' + birds.length, 20, 80)
    text('GEN: ' + gen, 20, 110)

    if (counter % 100 == 0) {
        obstacles.push(new Obstacle())
    }
    for (let i = obstacles.length - 1; i >= 0; i-=1) {
        obstacles[i].update();
        obstacles[i].show();
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
            birds[z].hits(obstacles[i]);
        }
        birds[z].update();
        birds[z].updateNextObstacle(nextObstacle);
        birds[z].think();
        birds[z].show();
    }

    birds = birds.filter(bird => {
        if(bird.isAlive){
            return true
        }else{
            savedBirds.push(bird);
            return false
        }
    });

    if(birds.length === 0 || autoKill &&  score >= best + 50){
        console.log('next gen');
        obstacles = [];
        obstacles.push(new Obstacle());
        best = score > best ? score : best;
        score = 0;
        counter = 0;
        nextGeneration();
        gen++;
    }
    counter ++;
}
