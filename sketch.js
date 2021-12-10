//number of elements to start with
const numElements = 40;
//array to store elements
let elements = [];
//set minimum and maximum radius for circles
let rMin, rMax;
//debug mode boolean
let debugMode = false;





function setup() {
  //make fullscreen with black background and no fill
  createCanvas(windowWidth, windowHeight);
  background(0);
  noFill();
  //HSB color mode for raibow effect
  colorMode(HSB, 360, 100, 100, 255);
  //set rMin and rMax based on window width
  rMin = width/50;
  rMax = width/10;
  //add initial elements to array
  for (let i = 0; i < numElements; i++ ){
    elements.push(new ElementOne(random(0,width), random(0,height), random(rMin, rMax)));
  }
}

function draw() {
  if (debugMode){
    background(0);
  }
  if (mouseIsPressed){
    elements.push(new ElementOne(mouseX, mouseY, random(rMin, rMax)));
  }
  for (let i = 0; i < elements.length; i++){
    //update position and age of each element
    elements[i].update();
    //check if the element is overlapping with any previusly updated element in the array
    for (let j = 0; j < i; j++){
      //if overlap is detected, draw a line between centerpoints with hue maped to min/max distance
      elements[i].checkOverlap(elements[j]);
    }
    //draw circles for debug mode
    if (debugMode){
      elements[i].display();
    }
    //elements[i].display();
    //check if element has completed its lifecycle, remove from array if true;
    if (elements[i].dead){
      elements.splice(i, 1);
    }

  }
}


function keyPressed(){
  if (key === 'd'){
    debugMode = !debugMode;
    background(0);
  }
  if (key === 's'){
    save('mySuperCoolPicture.png');
  }
}