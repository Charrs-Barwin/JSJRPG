class Unit {
    constructor(_name = 'unit',_pos=[240,260],_size = [200,132],_hp=10,_str=1,_ct=100,_mp=0,pm=false){
        this.hpp = _hp
        this.hp = _hp
        this.mpp = _mp
        this.mp = _mp
        this.str = _str
        this.def = 0
        this.ct = _ct
        this.cp = 0
        this.tp = 5
        this.name = _name
        this.isPartyMember = pm
        this.start_pos = [..._pos]
        this.pos = [..._pos]
        this.size = _size
        this.default_frame = boar
        this.att_frame = boar
        this.current_frame = boar
        this.alive = true

        this.skills = [new Attack(this)]
        this._skills = {'attack':this.skills[0]}

        this.instructions = []
        
        this.returntToPosition = this.returntToPosition.bind(this)
    }
    tick(){this.cp += this.tp}
    print_hp() {console.log(this.name+': '+this.hp+'/'+this.hpp);}

    async take_turn(targets){
        console.log(this.name);
        if (this.isPartyMember && this.instructions.length) { await this.execute_instructions(targets) }
        else { await this.ai(targets) }        
    }

    async execute_instructions(targets){
        for(let i=0;i<this.instructions.length;i++) {
            let instruction = this.instructions[i]

            let trg = instruction['targetting'](targets)
            // console.log(instruction);
            // debugger
            if(instruction['conditions'](instruction['action'],[trg])){
                // console.log(this);
                await instruction['action'].cast(trg)
                return
            }
        }
    }
    async ai(targets){
        await this.skills.random().cast(targets.random())
    }
    returntToPosition(){
        this.pos = [...this.start_pos]
        this.current_frame = this.default_frame
        gm.draw_stage()
        // debugger
    }

    take_dmg(amount=1) {
        this.hp= Math.max(this.hp-amount,0);
        lg(`${this.name} takes ${amount} points of damage.`);
        this.print_hp();
        if(this.hp <= 0){
            this.died()
        }
        ctx.fillText(amount, this.pos[x]+this.size[x]/2, this.pos[y]-10);
        ctx.strokeText(amount, this.pos[x]+this.size[x]/2, this.pos[y]-10);
    }
    died(){
        lg(this.name+" has died :(");
        this.alive = false
        gm.draw_stage()
    }

    setInstructions(){
        


        alert(this.name);
    }

    set_instructions(){
        let message = this.instructions.length ? "Would you like to keep previous instructions for "+this.name+"?\nYes to keep\n(otherwise press enter)"
         : "Would you like to skip 'ai' setup for "+this.name+"?\nThis would proceed with 'random ai'.\n'Yes' or 'Skip' to skip.\n(otherwise press enter)";
        
        let response = (prompt(message)||'').toLowerCase()
        if(['y','ye','yes','go','keep','skip'].includes(response)){return}

        let skls = Object.assign({}, this._skills);
        this.instructions.length = 0;
        while(Object.keys(skls).length){
            let _actions = Object.getOwnPropertyNames(skls)
            let input_action = ""
            if (_actions.length === 1){
                input_action = _actions[0]
            }               
            console.table(skls);
            while(!input_action || !_actions.includes(input_action)){
                input_action = 
                (prompt("please choose an action\nvalid choices are\n" + _actions)||'').toLowerCase()
            }

            let action = this._skills[input_action]
            let targetting = Object.getOwnPropertyNames(action.targetting)
            let input_targets = ""
            if (targetting.length === 1){
                input_targets = targetting[0]
            }
            console.table(action.targetting);
            while(!input_targets || !targetting.includes(input_targets)){
                input_targets = 
                (prompt("please choose targetting for "+input_action.toUpperCase()+".\nvalid choices are:\n" + targetting)||'').toLowerCase()
            }

            let conditions = Object.getOwnPropertyNames(action.conditions)
            let input_condition = ""
            if (conditions.length === 1){
                input_condition = conditions[0]
            }
            console.table(action.conditions);
            while(!input_condition || !conditions.includes(input_condition)){
                input_condition = 
                (prompt("please choose condition for "+input_action.toUpperCase()+".\nvalid choices are\n" + conditions)||'').toLowerCase()
            }
            
            let instruction = {}
            instruction['action'] = action
            instruction['targetting'] = action.targetting[input_targets]//this.skill_targets[input_action][input_targets]
            instruction['conditions'] = action.conditions[input_condition]//this.skill_conditions[input_action][input_condition]
            this.instructions.push(instruction)

            if (input_condition === "always"){
                break
            }
            
            delete skls[input_action]
        }
        console.log(this.instructions)
        // debugger
    }
    
    
}

class Boar extends Unit {}

class Mage extends Unit {
    constructor(pos){
        super("mage",pos)
        // this.name = "mage"
        this.size = [232,114]    //[214,248]
        this.default_frame = mage
        this.att_frame = mage_att
        this.current_frame = mage
        this.isPartyMember = true
        this.hpp = 14
        this.hp = 14
        this.mpp = 4
        this.mp = 4
        this.str = 1
        this.def = 0
        this.ct = 70
        this.skills = [new Attack(this),new Fire(this)]
        this._skills = {}
        this.skills.forEach(skill => {this._skills[skill.name.toLowerCase()]=skill})
    }
}

class Thief extends Unit {
    constructor(pos){
        super("thief",pos)
        // this.name = "thief"
        this.size = [84,114]    //[167,228]
        this.default_frame = thf
        this.att_frame = thf_att
        this.current_frame = thf
        this.isPartyMember = true
        this.hpp = 15
        this.hp = 15
        this.mpp = 0
        this.mp = this.mpp
        this.str = 1
        this.def = 0
        this.ct = 55
    }
}
