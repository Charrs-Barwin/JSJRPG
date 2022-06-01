class Game {
    constructor(x=0){
        var Formations;
        var battle_loop;
        var roster;
        var party;
        var monsters;
        var units;
    }
    play = () => {
        this.roster = [new Thief(),new Mage()]
        this.party = this.roster
        // this.party = [this.roster[1]]
        
        let Formation_1 = [new Boar("Old boar")]
        let Formation_2 = [new Boar("boar A",9,1,80),new Boar("boar B",9,1,80)]
        let Formation_3 = [new Boar("Big Boar",22,2,95),new Boar("boar A",9,1,80),new Boar("boar B",9,1,80)]

        this.Formations = [Formation_1,Formation_2,Formation_3]

        this.monsters = this.Formations.shift()
        this.units = this.party.concat(this.monsters)
        
        this.play_stage(this.monsters)
        // debugger
    }
    play_stage(enemies){
        console.table(this.party)
        console.table(enemies)
        // this.party.forEach(pm => pm.set_instructions())
        this.battle_loop = setInterval(this.tick,40,this.party,this.monsters);
    }
    tick(party,monsters){
        let units = party.concat(monsters).filter(t => t.alive)
        units.forEach(unit => {
            unit.tick()
            if (unit.cp>=unit.ct){
                let targets = unit.isPartyMember ? monsters : party
                targets = targets.filter(t=>t.alive)
                if(!targets.length){
                    return
                }
                unit.take_turn(targets)
                unit.cp = 0
                gm.check_battle()
            }
        });
    }
    gameover(){
        lg(" GAME OVER !!!");
        clearInterval(this.battle_loop)
    }
    battle_won(){
        lg(" YOU WON !!!");
        clearInterval(this.battle_loop)
        if (this.Formations.length){
            this.monsters = this.Formations.shift()
            this.units = this.party.concat(this.monsters)
            this.play_stage(this.monsters)
        } else {
            lg(" YOU WIN THE GAME! ")
            lg("     Nice Job      ")
        }
    }
    check_battle(){
        if(gm.party.every(p => !p.alive)){
            gm.gameover()
        } else if(gm.monsters.every(m => !m.alive)) {
            gm.battle_won()
        }
    }
}
// export default Game1