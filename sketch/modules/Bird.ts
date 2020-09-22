class Bird {
    // @ts-ignore
    y = height / 2;
    x = 64;
    gravity = 0.6;
    lift = -16;
    velocity = 0;

    show() {
        fill(255)
        ellipse(this.x, this.y, 32, 32)
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
