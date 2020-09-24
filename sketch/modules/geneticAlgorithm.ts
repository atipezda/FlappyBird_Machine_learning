function nextGeneration() {

    calculateFitness();

    for (let i=0; i< birdsAmount;i++){
        birds[i] = pickOne();
    }
    savedBirds = [];
}

function pickOne() {
    let index = 0;
    let r = random(1);
    while (r > 0) {
        r = r - savedBirds[index].fitness;
        index++;
    }
    index--;
    let bird = savedBirds[index];
    console.log(bird.score);
    let child = new Bird(bird.brain);
    child.mutate();
    return child;
}

function calculateFitness() {
    let sum = 0;
    for(let bird of savedBirds){
        sum +=bird.score;
    }
    for(let bird of savedBirds){
        bird.fitness = bird.score / sum;
    }
}
