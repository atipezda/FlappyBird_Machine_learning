class Obstacle {
    x = width;
    w = 30
    topMin = 50
    botMin = height/1.3
    gapStart = random(this.topMin, this.botMin)
    gapLength = 200
    speed = 3
    passed = false;
    highlight = false;
    upperVertex = {x: 0, y: 0};
    lowerVertex = {x: 0, y: 0};

    show() {
        fill(0);
        rect(this.x, 0, this.w, this.gapStart);
        rect(this.x, this.gapStart + this.gapLength, this.w, height);
        // fill(0, 130, 0);
        const center = this.x + this.w / 2;
        ellipse(center, this.gapStart + this.gapLength, this.w, this.w);
        ellipse(center, this.gapStart, this.w, this.w);
        this.lowerVertex = {x: center, y: this.gapStart + this.gapLength};
        this.upperVertex = {x: center, y: this.gapStart};
    }

    update() {
        this.x -= this.speed
    }

    passesBird() {
        if(this.x < 60){
            this.passed = true;
            return true
        }else{
            return false
        }
    }

    isOffScreen() {
        return this.x < -this.w
    }

    hits(bird: Bird) {
        if (bird.y < this.gapStart || bird.y > this.gapStart + this.gapLength) {
            if (bird.x > this.x && bird.x < this.x + this.w) {
                this.highlight = true
                return true
            }
        }
        this.highlight = false
        return false
    }
}
