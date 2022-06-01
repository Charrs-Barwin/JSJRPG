Array.prototype.random = function() {return this[Math.floor(Math.random()*this.length)]}

Array.prototype.max = function(attr=null) {
    if (attr){
        return this.find(trg => trg[attr] === Math.max(...this.map(t => t[attr])));
    }
    return Math.max(...this)
}
Array.prototype.min = function(attr=null) {
    if (attr){
        return this.find(trg => trg[attr] === Math.min(...this.map(t => t[attr])));
    }
    return Math.min(...this)
}
let by_max_attr = (attr) => {
    return (targets) => {
        return targets.max(attr)
    }
}
let by_min_attr = (attr) => {
    return (targets) => {
        return targets.min(attr)
    }
}
// createjs.Sound.registerSound("assets\audio\sfx\512481__philraco-indie__pause-piano-sound.wav", "turn_chime");
// createjs.Sound.play("turn_chime");
// debugger

let d1 = document.getElementById("dl1");
let d2 = document.getElementById("dl2");
let d3 = document.getElementById("dl3");
let d4 = document.getElementById("dl4");
let d5 = document.getElementById("dl5");
let log = []
var lg = function lg(input) {
    console.log(input);
    log.push(input)
    d1.innerHTML = d2.innerHTML
    d2.innerHTML = d3.innerHTML
    d3.innerHTML = d4.innerHTML
    d4.innerHTML = d5.innerHTML
    d5.innerHTML = input;
}
let canvas;
let context;
var stage;
var gm = new Game()

function draw(){}
// window.onload = init;

function init(){
    
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    // this.stage = new createjs.Stage("canvas")
    // this.loadImage();
    // createjs.Sound.registerSound("assets\audio\sfx\512481__philraco-indie__pause-piano-sound.wav", "turn_chime");

    var circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 100);
    circle.x = 100;
    circle.y = 100;
    // stage.addChild(circle);


    // createjs.Sound.play("turn_chime");
    // stage.update();
    // debugger


    let background = document.getElementById("field");
    let thf = document.getElementById("thief");
    let boar = document.getElementById("boar");

    context.drawImage(background,0,0,1200,720);

    // // context.fillStyle = 'brown';
    // // context.fillRect(240,200,180,150);
    
    context.drawImage(thf,750,260,84,114);  // original dimensions: 167,228
    context.drawImage(boar,240,260,200,132);  // original dimensions: 344,219
    
    // createjs.Tween.get(circle, { loop: true })
    //  .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(4))
    //  .to({ alpha: 0, y: 175 }, 500, createjs.Ease.getPowInOut(2))
    //  .to({ alpha: 0, y: 225 }, 100)
    //  .to({ alpha: 1, y: 200 }, 500, createjs.Ease.getPowInOut(2))
    //  .to({ x: 100 }, 800, createjs.Ease.getPowInOut(2));
    
    // createjs.Ticker.setFPS(60);
    // createjs.Ticker.addEventListener("tick", stage);
    
    gm.play()
}
function loadImage() {
    // debugger
    var preload = new createjs.LoadQueue();
    preload.addEventListener("fileload", handleFileComplete);
    preload.loadFile("assets\enemies\porcupine.png");
}
function handleFileComplete(event) {
    document.body.appendChild(event.result);
    // debugger
}