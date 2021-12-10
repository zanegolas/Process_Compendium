class ElementOne {
    constructor(x,y,r){
        this.posX = x;
        this.posY = y;
        this.radius = r;
        this.angle = random(TWO_PI);
        this.speed = 2;
        this.age = 0;
        this.dead = false;
    }

    behavior1() {
        this.posX += cos(this.angle) * this.speed;
        this.posY += sin(this.angle) *this.speed;
    }

    behavior2() {
        this.posX = constrain( this.posX, 0, width);
        this.posY = constrain( this.posY, 0, height);
    }

    behavior3(){
        this.angle += random(-1, 1);
    }

    lifecycle(){
        this.age++;
        if (this.age >= 300){
            this.dead = true;
        }
    }

    update() {
        this.behavior1();
        this.behavior2();
        this.lifecycle();
    }

    display() {
        push();
        circle( this.posX, this.posY, this.radius*2);
        pop();
    }

    checkOverlap(otherElement){
        let d = dist(this.posX, this.posY, otherElement.posX, otherElement.posY);
        let maxD = this.radius + otherElement.radius;
        if (d < maxD){
            stroke(map(d, 0, maxD, 0, 365), 100, 100, random(0, 100));
            line(this.posX, this.posY, otherElement.posX, otherElement.posY);
        }
    }


}