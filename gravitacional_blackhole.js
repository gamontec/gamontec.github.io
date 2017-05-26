var canvas;

var particle=[];
var x0;
var y0;
var numPart = 3000;

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

function setup(){
  canvas=createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');

  for (var i = 0; i < numPart; i++) {
    x0=random(-width/2, 1.5*width);
    y0=random(-width/2-height/2, 1.5*width);

    while(dist(x0,y0,width/2,height/2)>width)
    {
      x0=random(-width/2, 1.5*width);
      y0=random(-width/2, 1.5*width);
    }

    particle[i] = new Particle(x0,y0,random(1,4));
  }
}

function draw(){
background(30);
for (var i = 0; i < numPart; i++) {
  particle[i].blackHole();
  particle[i].update();
}
//print(particle[0].v);
}

function Particle(x,y,radius){
  this.x=x;
  this.y=y;
  this.radius=radius;
  this.direction=createVector();
  this.dirNorm=createVector();
  this.ac=createVector(); //fuerza
  this.v=createVector();
  this.trapped = false;

  this.update = function(){

    if (this.trapped == false) {
        this.move();
    }

    noStroke();
    fill(255);
    ellipse(this.x,this.y,this.radius,this.radius);
  }

  this.move = function(){
    //Set direction
    this.direction.x = width/2-this.x;
    this.direction.y = height/2-this.y;
    this.dirNorm=this.direction.normalize();

    //Set acceleration
    var distancia = dist(this.x,this.y,width/2,height/2);
    if(distancia<1){
      this.ac=this.dirNorm.mult(0);
    }
    else {
      this.ac=this.dirNorm.mult(1/(2*distancia));
    }

    //Set velocity
    this.v.x = this.v.x + this.ac.x;
    this.v.y = this.v.y + this.ac.y;

    //Set position
    this.x = this.x + this.v.x;
    this.y = this.y + this.v.y;
  }

  this.blackHole = function(){
    if (dist(this.x,this.y,width/2,height/2) <= 5) {
      this.trapped = true;
      this.ac.set(0,0);
      this.v.set(0,0);
      this.x = 0;
      this.y = 0;
    }
  }

}
