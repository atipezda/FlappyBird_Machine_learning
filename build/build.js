var bird;
var obstacles = [];
var pipesCleared = 0;
var obstaclesHit;
var playQuality;
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    createCanvas(windowWidth, windowHeight);
    frameRate(50);
    bird = new Bird();
    pipesCleared = 0;
    obstaclesHit = 0;
    playQuality = 10;
    obstacles.push(new Obstacle());
}
function draw() {
    clear();
    fill(0, 0, 255);
    textSize(20);
    textFont("Helvetica");
    text('Obstacles Cleared: ' + pipesCleared, 20, 20);
    text('Obstacle Damage: ' + obstaclesHit, 20, 40);
    text('Play Quality: ' + String(1 + (pipesCleared / obstaclesHit) || 4).substring(0, 4) + '/5', 20, 60);
    bird.show();
    bird.update();
    if (frameCount % 100 == 0) {
        obstacles.push(new Obstacle());
    }
    for (var i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].show();
        obstacles[i].update();
        if (obstacles[i].hits(bird)) {
            obstaclesHit++;
        }
        if (obstacles[i].offscreen()) {
            obstacles.splice(i, 1);
            pipesCleared++;
        }
    }
}
function keyPressed() {
    if (key === " ") {
        bird.goUp();
    }
}
var Bird = (function () {
    function Bird() {
        this.y = height / 2;
        this.x = 64;
        this.gravity = 0.6;
        this.lift = -16;
        this.velocity = 0;
    }
    Bird.prototype.show = function () {
        fill(255);
        ellipse(this.x, this.y, 32, 32);
    };
    Bird.prototype.goUp = function () {
        this.velocity += this.lift;
        console.log(this.velocity);
    };
    Bird.prototype.update = function () {
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;
        if (this.y > height) {
            this.y = height;
            this.velocity = 0;
        }
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }
    };
    return Bird;
}());
var Obstacle = (function () {
    function Obstacle() {
        this.x = width;
        this.w = 30;
        this.topMin = 50;
        this.botMin = height - 50;
        this.gapStart = random(this.topMin, this.botMin);
        this.gapLength = 200;
        this.speed = 3;
        this.highlight = false;
    }
    Obstacle.prototype.show = function () {
        fill(0);
        if (this.highlight) {
            fill('#FF0863');
        }
        rect(this.x, 0, this.w, this.gapStart);
        rect(this.x, this.gapStart + this.gapLength, this.w, height);
    };
    Obstacle.prototype.update = function () {
        this.x -= this.speed;
    };
    Obstacle.prototype.offscreen = function () {
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