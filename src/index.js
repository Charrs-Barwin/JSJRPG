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
var x = 0;
var y = 1;

var setDelay = function(delay) {
    return new Promise(resolve=>{
        setTimeout(()=>resolve(),delay)
    })
}

var action_log = document.getElementById("log");
var lg = function lg(input) {
    console.log(input);
    const line = document.createElement("li")
    const newContent = document.createTextNode(input);
    line.appendChild(newContent)
    action_log.append(line)
    action_log.scrollTop = action_log.scrollHeight;
}


var canvas;
var ctx;

var background = document.getElementById("field");
var thf = document.getElementById("thief");
var thf_att = document.getElementById("thief_att");
var mage = document.getElementById("red");
var mage_att = document.getElementById("red_att");
var boar = document.getElementById("boar");
var fire = document.getElementById("fire");
var gm = new Game()

// function draw(){}
window.onload = init;

// document.addEventListener('keypress', function(e) { if (e.key==' ') console.log('SPACE')})

function init(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    ctx.font = "bold 48px sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = 'white'
    ctx.lineWidth = 3;

    gm.play()
}