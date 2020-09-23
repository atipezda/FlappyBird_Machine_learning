class Bird {
    // @ts-ignore
    y = height / 2;
    x = 64;
    gravity = 0.6;
    lift = -19;
    velocity = 0;
    isAlive = true;
    topNextObstacle = {x: 0, y: 0};
    bottomNextObstacle = {x: 0, y: 0};
    upperDist = 0;
    lowerDist = 0;
    bottomDist = 0;
    debug = true;

    show() {
        this.calcDistances();
        this.debug && this.drawDistances();
        this.isAlive ? fill(0, 20, 220) : fill(255, 0, 0);
        ellipse(this.x, this.y, 32, 32)
    }

    calcDistances(){
        this.upperDist = int(dist(this.x, this.y, this.topNextObstacle.x, this.topNextObstacle.y));
        this.lowerDist = int(dist(this.x, this.y, this.bottomNextObstacle.x, this.bottomNextObstacle.y));
        this.bottomDist = int(dist(this.x, this.y, this.x, height));
    }

    drawDistances() {

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
        if (this.y < obstacle.gapStart || this.y > obstacle.gapStart + obstacle.gapLength) {
            if (this.x > obstacle.x && this.x < obstacle.x + obstacle.w) {
                this.isAlive = false;
                console.log('dead');
                return false
            }
        }
        return true
    }

    goUp() {
        this.velocity += this.lift;
    }

    update() {
        this.velocity += this.gravity
        this.velocity *= 0.9
        this.y += this.velocity

        if (this.y > height - 10) {
            this.isAlive = false;
            return
        }

        if (this.y > height) {
            this.y = height
            this.velocity = 0
        }

        if (this.y < 0) {
            this.y = 0
            this.velocity = 0
        }

    }

    updateNextObstacle(obstacle: Obstacle) {
        this.topNextObstacle = obstacle.upperVertex;
        this.bottomNextObstacle = obstacle.lowerVertex;
    }

}
