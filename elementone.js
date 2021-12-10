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
        this.speed = 1;
        //speed at which the angle will rotate when elements overlap
        this.rotationSpeed = 0.001 * TWO_PI;
        //speed of repulsion between elements
        this.repulseSpeed = 0.5;
        //age tracker
        this.age = 0;
        //maximum age before death
        this.maxAge = random(300, 500);
        //death status
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

    //B3: Change direction by rotating when overlap is detected
    behavior3(){
        this.angle += this.rotationSpeed;
    }

    //B4: Move away from overlapping elements
    behavior4(overlapElement){
        let d = this.findDistanceTo(overlapElement);
        let dX = (this.posX - overlapElement.posX)/d;
        let dY = (this.posY - overlapElement.posY)/d;

        //update this element's coordinates
        this.posX += dX * this.repulseSpeed;
        this.posY += dY * this.repulseSpeed;

        //update other element's coordinates
        overlapElement.posX -= dX * this.repulseSpeed;
        overlapElement.posY -= dY * this.repulseSpeed;
    }

    //Tracks age of element
    lifecycle(){
        //add 1 to age count
        this.age++;
        //sets dead variable to true when age reaches 300
        if (this.age >= this.maxAge){
            this.dead = true;
        }
    }

    //uses B1 and B2 to update position, then ages element with lifecycle
    update() {
        this.behavior1();
        this.behavior2();
        this.lifecycle();
    }

    //draws circles for debug mode
    display() {
        stroke('white');
        push();
        translate(this.posX, this.posY);
        rotate(this.angle);
        circle( 0, 0, this.radius*2);
        //directional arrows
        line(0, 0, this.radius, 0);
        line(this.radius, 0, this.radius - 5, -5);
        line(this.radius, 0, this.radius - 5, 5);
        //return to normal grid
        pop();
    }

    //returns distance to given element
    findDistanceTo(otherElement){
        return dist(this.posX, this.posY, otherElement.posX, otherElement.posY);
    }

    //draw a line between overlapping elements
    checkOverlap(otherElement){
        let d = this.findDistanceTo(otherElement);
        let maxD = this.radius + otherElement.radius;
        if (d < maxD){
            //rotates angle of both elements
            this.behavior3();
            otherElement.behavior3();
            //moves overlapping elements away
            this.behavior4(otherElement);
            if (debugMode === false){
                //sets color based on actual vs max distance
                stroke(map(d, 0, maxD, 0, 365), 100, 100, map(this.age, 0, this.maxAge, 100, 0));
                //draws line
                line(this.posX, this.posY, otherElement.posX, otherElement.posY);
            }


        }
    }


}