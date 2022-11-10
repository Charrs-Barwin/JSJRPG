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
var _ = undefined;

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

var canvas;
var ctx;

var background = document.getElementById("field");
var thf = document.getElementById("thief");
var mage = document.getElementById("red");
var boar = document.getElementById("boar");
var gm = new Game()

// function draw(){}
window.onload = init;

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    gm.play()
}