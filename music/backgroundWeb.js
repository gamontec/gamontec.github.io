//Variables de formato de website usando biblioteca p5.dom
var canvas;

//Variables de modelo
var forma; //cuadrado o circulo
var distMax;
var puntosX; //representa cuántos puntos hacia la derecha
var puntosY; //representa cuántos puntos hacia abajo
var contador;
var pesoMin;
var pesoMax;
var colorFondo;
var maxAlfaPuntitos;
var minAlfaPuntitos;
var gapFiguras; //separación entre una figura y la siguiente
var puntito=[];


function windowResized(){
  resizeCanvas(windowWidth,2*windowHeight);
}

function setup(){
  //Formato de canvas
  canvas=createCanvas(windowWidth,2*windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');

  //Variables de modelo
  forma=round(random(0,1)); //setea de manera aleatoria si es un circulo=0 o cuadrad=1
  puntosX=16;
  contador=0;
  MinColor=.8; //valores del peso del color en %
  MaxColor=.95; //idem anterior %
  colorFondo=255;
  minAlfaPuntitos=.2;
  maxAlfaPuntitos=.85;
  gapFiguras=width/puntosX;
  puntosY=height/gapFiguras;

  distMax=2*sqrt(sq(width/puntosX)+sq(height/puntosY));
  /*puntito1 = new Punto(distMax,random(100,255),random(100,255),random(100,255),width/3,height/2,width/3,height/2);
  puntito2 = new Punto(distMax,random(100,255),random(100,255),random(100,255),2*width/3,height/2,2*width/3,height/2);*/
  for (var i = 0; i <= puntosX; i++) {
    for (var j = 0; j < puntosY; j++) {
      puntito[contador]=new Punto(distMax,random(MinColor*255,MaxColor*255),random(MinColor*255,MaxColor*255),random(MinColor*255,MaxColor*255),i*gapFiguras,j*gapFiguras,i*gapFiguras,j*gapFiguras,.95*gapFiguras);
      contador++;
    }
  }
  //puntito[0]=new Punto(distMax,random(100,255),random(100,255),random(100,255),width/3,height/2,width/3,height/2,50);
}
function draw(){
  background(colorFondo);

  //Acotamos las variables de posición al Canvas
  for (var i = 0; i < puntito.length; i++) {
    if (mouseX>width) {
      puntito[i].mousePosX=width;


    }
    else if (mouseY>height) {
      puntito[i].mousePosY=height;

    }
    else {
      puntito[i].mousePosX=mouseX;
      puntito[i].mousePosY=mouseY;

    }
    puntito[i].update();
  }


  /*
  puntito1.update();
  puntito2.update();*/
}

function Punto(maxDistancia,redColor,greenColor,blueColor,centroX,centroY,cursorX,cursorY,radio){//,initPosX,initPosY,mousePosX,mousePosY){
  this.maxDist=maxDistancia;
  this.red=redColor;
  this.green=greenColor;
  this.blue=blueColor;
  this.posX=centroX;
  this.posY=centroY;
  this.mousePosX=cursorX;
  this.mousePosY=cursorY;
  this.r=radio;
  this.distancia=0;
  this.alfa=255;

  this.update=function(){
    this.distancia=abs(dist(this.mousePosX,this.mousePosY,this.posX,this.posY));

    if (this.distancia>this.maxDist) {
      this.alfa=minAlfaPuntitos*255;
    }
    else if (this.distancia<this.maxDist*.4) {
      this.alfa=maxAlfaPuntitos*255;
    }
    else {
      this.alfa=abs(map(this.distancia,0,this.maxDist,maxAlfaPuntitos*255,minAlfaPuntitos*255));
    }
    strokeWeight(0);
    stroke(this.red,this.green,this.blue);
    fill(this.red,this.green,this.blue,this.alfa);

    if (forma==0) {
      rect(this.posX,this.posY,this.r,this.r);
    }
    else if (forma==1) {
      ellipse(this.posX,this.posY,this.r,this.r);
    }

  }
}
