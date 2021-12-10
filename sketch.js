//number of elements to start with
const numElements = 40;
//array to store elements
let elements = [];
//set minimum and maximum radius for circles
const rMin = 10;
const rMax = 100;




function setup() {
  //make fullscreen with black background
  createCanvas(windowWidth, windowHeight);
  background(0);
  //HSB color mode for raibow effect
  colorMode(HSB, 360, 100, 100, 255);
  //add initial elements to array
  for (let i = 0; i < numElements; i++ ){
    elements.push(new ElementOne(random(0,width), random(0,height), random(rMin, rMax)));
  }
}

function draw() {
  //background(0);
  for (let i = 0; i < elements.length; i++){
    //update position and age of each element
    elements[i].update();
    //check if the element is overlapping with any previusly updated element in the array
    for (let j = 0; j < i; j++){
      //if overlap is detected, draw a line between centerpoints with hue maped to min/max distance
      elements[i].checkOverlap(elements[j]);
    }
    //elements[i].display();
    //check if element has completed its lifecycle, remove from array if true;
    if (elements[i].dead){
      elements.splice(i, 1);
    }
  }
}

function mousePressed(){
  elements.push(new ElementOne(random(0,width), random(0,height), random(rMin, rMax)));
}