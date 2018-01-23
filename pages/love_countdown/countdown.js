//Love countdown is a script which counts in how many days we will meet again
//Based in Huelga de Hambre, by Guillermo Montecinos

var today = new Date();
var justNow = 0;
var dateTill = 0;
var deltaMilisec = 0;
var deltaMonth = 0;
var deltaWeeks = 0;
var deltaDays = 0;
var deltaHours = 0;
var deltaWeeks = 0;

dateTill = Date.parse("April 13, 2018");
//p5.js sketch

function setup(){
  createCanvas(1000,1000);
  textFont("Courier");
}

function draw(){
  justNow = today.getTime();


  deltaMilisec = parseInt((dateTill - justNow),0); ///(24*60*60*1000)
  deltaHours = Math.trunc(deltaMilisec/(1000*60*60)+8);
  if (deltaHours >= 24) {
    deltaDays = Math.trunc(deltaHours/24+1);
  }
  else {
    deltaDays = 0;
  }
  deltaWeeks = Math.trunc(deltaDays/7);
  deltaMonth = deltaWeeks/4;

  background(255);
  textSize(32);
  text("Nos volveremos a ver en ~",0,50);
  textSize(64);

  text(deltaHours,0,150);
  text(" horas.", 200, 150);
  text(deltaDays,0,200);
  text(" d"+String.fromCharCode(237)+"as.", 200, 200);
  text(deltaWeeks,0,250);
  text(" semanas.", 200, 250);
  text(deltaMonth,0,300);
  text(" meses.", 200, 300);
}
