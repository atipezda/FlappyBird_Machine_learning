class Obstacle{
    x = width;
    w = 30
    topMin = 50
    botMin = height - 50
    gapStart = random(this.topMin, this.botMin)
    gapLength = 200
    speed = 3
    highlight = false;

    show(){
        fill(0)
        if (this.highlight){
            fill('#FF0863')
        }
        rect(this.x, 0, this.w, this.gapStart)
        rect(this.x, this.gapStart + this.gapLength, this.w, height)
    }
    update(){
        this.x -= this.speed
    }
    offscreen(){
        return this.x < -this.w
    }

    hits(bird: Bird){
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
