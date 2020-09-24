class Bird {
    // @ts-ignore
    y = height / 2;
    x = 64;
    gravity = 0.8;
    lift = -12;
    velocity = 0;
    isAlive = true;
    topNextObstacle = {x: 0, y: 0};
    bottomNextObstacle = {x: 0, y: 0};
    upperDist = 0;
    lowerDist = 0;
    bottomDist = 0;
    debug = false;
    brain: NeuralNetwork;
    score = 0;
    fitness = 0;
    constructor(brain: NeuralNetwork = undefined) {
        if(brain){
            this.brain = brain.copy();
        }else{
            console.log('new brain');
            this.brain = new NeuralNetwork(5,8,2);
        }
    }


    show() {
        this.calcDistances();
        this.debug && this.drawDistances();
        stroke(255);
        fill(150,50);
        ellipse(this.x, this.y, 32, 32)
    }
    mutate(){
        this.brain.mutate(0.2);
    }

    calcDistances(){
        this.upperDist = int(dist(this.x, this.y, this.topNextObstacle.x, this.topNextObstacle.y));
        this.lowerDist = int(dist(this.x, this.y, this.bottomNextObstacle.x, this.bottomNextObstacle.y));
        this.bottomDist = int(dist(this.x, this.y, this.x, height));
    }

    drawDistances() {

        fill(10,20,250);
        stroke(10,20,250);
        line(this.x, this.y, this.bottomNextObstacle.x, this.bottomNextObstacle.y);
        line(this.x, this.y, this.topNextObstacle.x, this.topNextObstacle.y);
        line(this.x, this.y, this.x, height);

        push();
        translate((this.x + this.topNextObstacle.x) / 2, (this.y + this.topNextObstacle.y) / 2);
        rotate(atan2(this.topNextObstacle.y - this.y, this.topNextObstacle.x - this.x));
        text(this.upperDist, 0, -5);
        pop();

        push()
        translate((this.x + this.bottomNextObstacle.x) / 2, (this.y + this.bottomNextObstacle.y) / 2);
        rotate(atan2(this.bottomNextObstacle.y - this.y, this.bottomNextObstacle.x - this.x));
        text(this.lowerDist, 0, -5);
        pop()

        push();
        translate(this.x / 2, (this.y + height) / 2);
        rotate(atan2(height - this.y, 0 ));
        text(this.bottomDist, 0, -5);
        pop();

    }

    hits(obstacle: Obstacle) {
        if(this.y < 10 || this.y > height - 20){
            this.isAlive = false;
            return true
        }
        if (this.y < obstacle.gapStart || this.y > obstacle.gapStart + obstacle.gapLength) {
            if (this.x > obstacle.x && this.x < obstacle.x + obstacle.w) {
                this.isAlive = false;
                return true
            }
        }
        return false
    }

    goUp() {
        this.velocity += this.lift;
    }

    update() {
        this.velocity += this.gravity
        this.velocity *= 0.9
        this.y += this.velocity
        this.score++;

        if (this.y > height) {
            this.y = height
            this.velocity = 0
        }

        if (this.y < 0) {
            this.y = 0
            this.velocity = 0
        }

    }
    think(){
        let inputs = [];
        inputs[0] = this.y / height;
        inputs[1] = this.topNextObstacle.y / height;
        inputs[2] = this.bottomNextObstacle.y / height;
        inputs[3] = this.bottomNextObstacle.x / width;
        inputs[4] = this.velocity/10;
        let output = this.brain.predict(inputs);
        if(output[0] > output[1]){
            this.goUp();
        }
    }

    updateNextObstacle(obstacle: Obstacle) {
        this.topNextObstacle = obstacle.upperVertex;
        this.bottomNextObstacle = obstacle.lowerVertex;
    }

}
