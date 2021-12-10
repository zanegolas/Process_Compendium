class ElementOne {
    constructor(x,y,r){
        //initial x coordinate
        this.posX = x;
        //initial y coordinate
        this.posY = y;
        //radius passed in at creation of element
        this.radius = r;
        //initial angle of movement in radians
        this.angle = random(TWO_PI);
        //speed at which element moves
        this.speed = 0.5;
        this.age = 0;
        this.dead = false;
    }

    //B1: Move in a straight line
    behavior1() {
        //update x and y coordinates based on angle and speed
        this.posX += cos(this.angle) * this.speed;
        this.posY += sin(this.angle) * this.speed;
    }

    //B2: Constrain to surface
    behavior2() {
        //keeps coordinates within canvas boundry
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