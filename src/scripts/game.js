class Game {
    constructor(x=0){
        var Formations;
        var battle_loop;
        var roster;
        var party;
        var monsters;
        var units;
        var p1_pos;
        var p2_pos;
    }

    play = () => {
        // ctx.drawImage(background,0,0,1200,720);
        this.p1_pos = [750,260];
        this.p2_pos = [850,360];
        this.roster = [new Thief(this.p1_pos),new Mage(this.p2_pos)];
        this.party = this.roster;
        // this.party = [this.roster[1],this.roster[0]]
        
        let Formation_1 = [new Boar("Old boar")]
        let Formation_2 = [new Boar("boar A",[240,260],_,9,1,80),new Boar("boar B",[200,400],_,9,1,80)]
        let Formation_3 = [new Boar("Big Boar",[300,320],[300,198],16,2,95),new Boar("boar A",[100,200],_,9,1,80),new Boar("boar B",[100,450],_,9,1,80)]

        this.Formations = [Formation_1,Formation_2,Formation_3]
        this.monsters = this.Formations.shift()

        this.units = this.party.concat(this.monsters)
        
        // this..()
        prompt("Please open consol to see unit actions\n( ctr + shift + j )\n More to come in the future")
        this.play_stage(this.monsters)
    }

    draw_stage(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background,0,0,1200,720);

        this.units.forEach(unit => {
            if (unit.alive){
                ctx.drawImage(unit.current_frame,unit.pos[x],unit.pos[y],unit.size[x],unit.size[y])
            }
        });
    }

    play_stage(enemies){

        this.draw_stage()

        console.log("Your Party");
        console.table(this.party)
        console.log("Upcomming battle");
        console.table(enemies)

        this.party.forEach(pm => pm.set_instructions())

        // this.battle_loop = setInterval(this.tick,400,this.party,this.monsters);
        // setInterval(this.draw_stage,16)
        setTimeout(this.tick,400,this.party,this.monsters);
    }

    tick = (party,monsters)=>{
        let units = party.concat(monsters).filter(t => t.alive)
        units.forEach(unit => {
            unit.tick()
            if (unit.cp>=unit.ct){
                // createjs.Sound.play("turn_chime");
                let targets = unit.isPartyMember ? monsters : party
                targets = targets.filter(t=>t.alive)
                if(!targets.length){
                    return
                }
                unit.take_turn(targets)
                unit.cp = 0
                this.draw_stage()
                if (this.check_battle()){
                    return
                }
            }
        });
        setTimeout(this.tick,400,this.party,this.monsters);
    }

    gameover(){
        lg(" GAME OVER !!!");
        // clearInterval(this.battle_loop)
        console.log("Your Party");
        console.table(this.party)
        console.log("The enemy");
        console.table(this.monsters)
    }

    battle_won(){
        lg(" YOU WON !!!");
        // clearInterval(this.battle_loop)
        if (this.Formations.length){
            this.party.forEach(pm =>{
                if (pm.hp && pm.hp < pm.hpp){
                    pm.hp++
                    console.log(pm.name+" has recovered 1 Hp");
                }
                if (pm.mpp && pm.mp < pm.mpp){
                    pm.mp++
                    console.log(pm.name+" has recovered 1 Mp");
                }
            })

            this.monsters = this.Formations.shift()
            this.units = this.party.concat(this.monsters)
            // this.draw_stage()
            this.play_stage(this.monsters)
        } else {
            lg(" YOU WIN THE GAME! ")
            lg("     Nice Job      ")
        }
    }

    check_battle = ()=>{
        if(this.party.every(p => !p.alive)){
            this.gameover()
            return true
        } else if(this.monsters.every(m => !m.alive)) {
            this.battle_won()
            return true
        }
    }
    
}
// export default Game1