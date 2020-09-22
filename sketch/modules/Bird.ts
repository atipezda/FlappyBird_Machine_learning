class Bird {
    // @ts-ignore
    y = height / 2;
    x = 64;
    gravity = 0.6;
    lift = -16;
    velocity = 0;
    isAlive = true;


    show() {
        this.isAlive ? fill(0,20,220) : fill(255, 0 ,0);
        ellipse(this.x, this.y, 32, 32)
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
        this.velocity += this.lift
        console.log(this.velocity)
    }

    update() {
        this.velocity += this.gravity
        this.velocity *= 0.9
        this.y += this.velocity

        if (this.y > height) {
            this.y = height
            this.velocity = 0
        }

        if (this.y < 0) {
            this.y = 0
            this.velocity = 0
        }

    }

}
