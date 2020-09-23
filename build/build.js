var birds = [];
var obstacles = [];
var score = 0;
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    createCanvas(windowWidth, windowHeight);
    frameRate(50);
    birds.push(new Bird());
    console.log(birds.length);
    obstacles.push(new Obstacle());
}
function draw() {
    clear();
    fill(0, 0, 255);
    textSize(20);
    textFont("Helvetica");
    text('score: ' + score, 20, 20);
    if (frameCount % 100 == 0) {
        obstacles.push(new Obstacle());
    }
    for (var z = 0; z < birds.length; z += 1) {
        birds[z].show();
        birds[z].update();
        for (var i = obstacles.length - 1; i >= 0; i -= 1) {
            var isAlive = birds[z].hits(obstacles[i]);
        }
        var nextObstacle = obstacles[0].passesBird() ? obstacles[1] : obstacles[0];
        birds[z].updateNextObstacle(nextObstacle);
    }
    birds = birds.filter(function (bird) { return bird.isAlive; });
    for (var i = obstacles.length - 1; i >= 0; i -= 1) {
        obstacles[i].show();
        obstacles[i].update();
        if (!obstacles[i].passed && obstacles[i].passesBird()) {
            score++;
        }
        if (obstacles[i].isOffScreen()) {
            obstacles.splice(i, 1);
        }
    }
}
function keyPressed() {
    if (key === " ") {
        birds[0].goUp();
    }
}
var Bird = (function () {
    function Bird() {
        this.y = height / 2;
        this.x = 64;
        this.gravity = 0.6;
        this.lift = -19;
        this.velocity = 0;
        this.isAlive = true;
        this.topNextObstacle = { x: 0, y: 0 };
        this.bottomNextObstacle = { x: 0, y: 0 };
        this.upperDist = 0;
        this.lowerDist = 0;
        this.bottomDist = 0;
        this.debug = true;
    }
    Bird.prototype.show = function () {
        this.calcDistances();
        this.debug && this.drawDistances();
        this.isAlive ? fill(0, 20, 220) : fill(255, 0, 0);
        ellipse(this.x, this.y, 32, 32);
    };
    Bird.prototype.calcDistances = function () {
        this.upperDist = int(dist(this.x, this.y, this.topNextObstacle.x, this.topNextObstacle.y));
        this.lowerDist = int(dist(this.x, this.y, this.bottomNextObstacle.x, this.bottomNextObstacle.y));
        this.bottomDist = int(dist(this.x, this.y, this.x, height));
    };
    Bird.prototype.drawDistances = function () {
        line(this.x, this.y, this.bottomNextObstacle.x, this.bottomNextObstacle.y);
        line(this.x, this.y, this.topNextObstacle.x, this.topNextObstacle.y);
        line(this.x, this.y, this.x, height);
        push();
        translate((this.x + this.topNextObstacle.x) / 2, (this.y + this.topNextObstacle.y) / 2);
        rotate(atan2(this.topNextObstacle.y - this.y, this.topNextObstacle.x - this.x));
        text(this.upperDist, 0, -5);
        pop();
        push();
        translate((this.x + this.bottomNextObstacle.x) / 2, (this.y + this.bottomNextObstacle.y) / 2);
        rotate(atan2(this.bottomNextObstacle.y - this.y, this.bottomNextObstacle.x - this.x));
        text(this.lowerDist, 0, -5);
        pop();
        push();
        translate(this.x / 2, (this.y + height) / 2);
        rotate(atan2(height - this.y, 0));
        text(this.bottomDist, 0, -5);
        pop();
    };
    Bird.prototype.hits = function (obstacle) {
        if (this.y < obstacle.gapStart || this.y > obstacle.gapStart + obstacle.gapLength) {
            if (this.x > obstacle.x && this.x < obstacle.x + obstacle.w) {
                this.isAlive = false;
                console.log('dead');
                return false;
            }
        }
        return true;
    };
    Bird.prototype.goUp = function () {
        this.velocity += this.lift;
    };
    Bird.prototype.update = function () {
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;
        if (this.y > height - 10) {
            this.isAlive = false;
            return;
        }
        if (this.y > height) {
            this.y = height;
            this.velocity = 0;
        }
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    };
    Bird.prototype.updateNextObstacle = function (obstacle) {
        this.topNextObstacle = obstacle.upperVertex;
        this.bottomNextObstacle = obstacle.lowerVertex;
    };
    return Bird;
}());
var Obstacle = (function () {
    function Obstacle() {
        this.x = width;
        this.w = 30;
        this.topMin = 50;
        this.botMin = height / 1.3;
        this.gapStart = random(this.topMin, this.botMin);
        this.gapLength = 200;
        this.speed = 3;
        this.passed = false;
        this.highlight = false;
        this.upperVertex = { x: 0, y: 0 };
        this.lowerVertex = { x: 0, y: 0 };
    }
    Obstacle.prototype.show = function () {
        fill(0);
        rect(this.x, 0, this.w, this.gapStart);
        rect(this.x, this.gapStart + this.gapLength, this.w, height);
        var center = this.x + this.w / 2;
        ellipse(center, this.gapStart + this.gapLength, this.w, this.w);
        ellipse(center, this.gapStart, this.w, this.w);
        this.lowerVertex = { x: center, y: this.gapStart + this.gapLength };
        this.upperVertex = { x: center, y: this.gapStart };
    };
    Obstacle.prototype.update = function () {
        this.x -= this.speed;
    };
    Obstacle.prototype.passesBird = function () {
        if (this.x < 60) {
            this.passed = true;
            return true;
        }
        else {
            return false;
        }
    };
    Obstacle.prototype.isOffScreen = function () {
        return this.x < -this.w;
    };
    Obstacle.prototype.hits = function (bird) {
        if (bird.y < this.gapStart || bird.y > this.gapStart + this.gapLength) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                this.highlight = true;
                return true;
            }
        }
        this.highlight = false;
        return false;
    };
    return Obstacle;
}());
//# sourceMappingURL=../sketch/sketch/build.js.map