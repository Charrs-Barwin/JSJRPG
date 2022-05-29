// import from "./scripts/game.js";
// import Game2 from "./scripts/game2.js";
// // errors immediately;
// // Uncaught SyntaxError: Cannot use import statement outside a module (at index.js:1:1) 
// let gm1 = new Game1(5);
// let gm2 = new Game2(5);
// console.log(gm1.num);
// console.log(gm2.num);
// debugger
console.log("TOP TEST!! also");
// Array.prototype.random = function() {return this[Math.floor(Math.random()*this.length)]}

// let num = 1
// let canvas;
// let context;
// let label = document.getElementById("label");
// let hp = 13
// let hhp = 24

// function draw(){}

// function init(){
//     canvas = document.getElementById('canvas');
//     context = canvas.getContext('2d');  // was erroring

//     let background = document.getElementById("field");
//     let thf = document.getElementById("thief");

//     context.drawImage(background,0,0,1200,720);

//     context.fillStyle = 'brown';
//     context.fillRect(240,200,180,150);
    
//     context.drawImage(thf,750,260,84,114);  // original dimensions: 167,228
    
// }
// window.onload = init;
// // init()

// // class Skills {
// //     static attack(actor,target){
// //         console.log("Attack test");
// //     }
// // }
// class Unit {
//     constructor(_name = 'unit',_hp=10,_str=1,_ct=100,_mp=0,pm=false){
//         this.hpp = _hp
//         this.hp = this.hpp
//         this.mpp = _mp
//         this.mp = this.mpp
//         this.str = _str
//         this.def = 0
//         this.ct = _ct
//         this.cp = 0
//         this.tp = 5
//         this.name = _name
//         this.isPartyMember = pm
//         this.alive = true
//         this.skills = [this.attack]
//     }
//     take_turn(targets){
//         this.attack(targets.random())
//     }
//     tick(){this.cp += this.tp}
//     print_hp() {console.log(this.name+': '+this.hp+'/'+this.hpp);}
//     take_dmg(amount=1) {
//         this.hp= Math.max(this.hp-amount,0);
//         console.log(`${this.name} takes ${amount} points of damage.`);
//         this.print_hp();
//         if(this.hp <= 0){
//             this.died()
//         }
//     }
//     died(){
//         console.log(this.name+" has died :(");
//         this.alive = false
//     }
//     attack(unit) {
//         console.log(`${this.name} attacks ${unit.name}.`);
//         unit.take_dmg(this.str);
//     }
// }

// class Thief extends Unit {
//     constructor(){
//         super("thief",11,1,60,0,true)
//     }
// }

// class Mage extends Unit {
//     constructor(){
//         super("mage",9,1,70,4,true)
//         this.skills.push(this.fire)
//     }
    
//     take_turn(targets){
//         let trg = targets.random()
//         // if (this.fire() && trg.hp>=4) {this.fire(trg)}
//         console.log(this.mp/this.mpp/2);
//         this.mp/this.mpp/2 > Math.random() ? this.fire(trg) : this.attack(trg)
//         // else {this.attack(trg)}
//     }
//     fire(unit = null){
//         let cost = 1;
//         if (!unit){
//             return this.mp >= cost;
//         }
//         this.mp -= cost;
//         console.log(`${this.name} casts 'Fire on ${unit.name}.`);
//         console.log(`Mp: ${this.mp}/${this.mpp}`);
//         unit.take_dmg(4);
//     }
// }

// class Game {
//     constructor(x=0){
//         var battle_loop;
//         var roster;// = [new Thief()];
//         var party;
//         var monsters;
//         var units;
//     }
//     play = () => {
//         console.log("TEST Number 4");
//         this.roster = [new Thief(),new Mage()]
//         this.party = [this.roster[0],this.roster[1]]
        
//         let u1 = new Unit("boar A",9,1,80)
//         let u2 = new Unit("boar B",9,1,80)

//         this.monsters = [u1,u2]
//         this.units = this.party.concat(this.monsters)

//         this.battle_loop = setInterval(this.tick,40,this.party,this.monsters);
//         // setTimeout(clearInterval(this.battle_loop),100000)   // loop never starts
//         // this.battle_loop.refresh()
//     }
//     tick(party,monsters){
//         let units = party.concat(monsters).filter(t => t.alive)
//         // console.log(units);
//         units.forEach(unit => {
//             unit.tick()
//             if (unit.cp>=unit.ct){
//                 let targets = unit.isPartyMember ? monsters : party
//                 targets = targets.filter(t=>t.alive)
//                 if(!targets.length){
//                     return
//                 }
//                 unit.take_turn(targets)
//                 unit.cp = 0
//                 gm.check_battle()
//             }
//         });
//     }
//     gameover(){
//         console.log(" GAME OVER !!!");
//         clearInterval(this.battle_loop)
//     }
//     battle_won(){
//         console.log(" YOU WON !!!");
//         clearInterval(this.battle_loop)
//     }
//     check_battle(){
//         if(gm.party.every(p => !p.alive)){
//             gm.gameover()
//         } else if(gm.monsters.every(m => !m.alive)) {
//             gm.battle_won()
//         }
//     }
// }
// var gm = new Game()
// gm.play()

