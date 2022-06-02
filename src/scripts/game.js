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
        this.p1_pos = [750,260];
        this.p2_pos = [850,360];
        this.roster = [new Thief(),new Mage()];
        this.party = this.roster;
        // this.party = [this.roster[1],this.roster[0]]
        this.party[0].pos = this.p1_pos;
        this.party[1].pos = this.p2_pos;
        
        let Formation_1 = [new Boar("Old boar")]
        let Formation_2 = [new Boar("boar A",[240,260],undefined,9,1,80),new Boar("boar B",[200,400],undefined,9,1,80)]
        let Formation_3 = [new Boar("Big Boar",[300,320],[300,198],16,2,95),new Boar("boar A",[100,200],undefined,9,1,80),new Boar("boar B",[100,450],undefined,9,1,80)]

        this.Formations = [Formation_1,Formation_2,Formation_3]
        this.monsters = this.Formations.shift()

        this.units = this.party.concat(this.monsters)
        
        this.play_stage(this.monsters)
    }
    draw_stage(){
        ctx.drawImage(background,0,0,1200,720);
        this.units.forEach(u => {
            if (u.alive){
                ctx.drawImage(u.default_frame,u.pos[0],u.pos[1],u.size[0],u.size[1])
            }
        });
    }
    play_stage(enemies){
        console.log("Your Party");
        console.table(this.party)
        console.log("Upcomming battle");
        console.table(enemies)
        this.draw_stage()
        this.party.forEach(pm => pm.set_instructions())
        this.battle_loop = setInterval(this.tick,40,this.party,this.monsters);
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
    }
    gameover(){
        lg(" GAME OVER !!!");
        clearInterval(this.battle_loop)
        console.log("Your Party");
        console.table(this.party)
        console.log("The enemy");
        console.table(this.monsters)
    }
    battle_won(){
        lg(" YOU WON !!!");
        clearInterval(this.battle_loop)
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