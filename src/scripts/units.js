class Unit {
    constructor(_name = 'unit',_hp=10,_str=1,_ct=100,_mp=0,pm=false){
        this.hpp = _hp
        this.hp = this.hpp
        this.mpp = _mp
        this.mp = this.mpp
        this.str = _str
        this.def = 0
        this.ct = _ct
        this.cp = 0
        this.tp = 5
        this.name = _name
        this.isPartyMember = pm
        this.alive = true

        this.skills = [new Attack(this)]
        this._skills = {'attack':this.skills[0]}

        this.instructions = []
        
    }
    tick(){this.cp += this.tp}
    print_hp() {console.log(this.name+': '+this.hp+'/'+this.hpp);}

    take_turn(targets){
        if (this.isPartyMember && this.instructions.length) { this.execute_instructions(targets) }
        else { this.ai(targets) }        
    }

    execute_instructions(targets){
        for(let i=0;i<this.instructions.length;i++) {
            let instruction = this.instructions[i]
            let trg = instruction['targetting'](targets)
            console.log(instruction);
            // debugger
            if(instruction['conditions'](instruction['action'],[trg])){
                console.log(this);
                instruction['action'].cast(trg)
                return
            }
        }
    }
    ai = (targets) => {
        this.skills.random().cast(targets.random())
    }

    take_dmg(amount=1) {
        this.hp= Math.max(this.hp-amount,0);
        lg(`${this.name} takes ${amount} points of damage.`);
        this.print_hp();
        if(this.hp <= 0){
            this.died()
        }
    }
    died(){
        lg(this.name+" has died :(");
        this.alive = false
    }

    set_instructions(){
        let message = this.instructions.length ? "Would you like to keep previous instructions for "+this.name+"?\nYes to keep"
         : "Would you like to skip 'ai' setup for "+this.name+"?\nThis would proceed with 'random ai'.\n'Yes' or 'Skip' to skip.";
        
        let response = prompt(message).toLowerCase()
        if(['y','ye','yes','go','keep','skip'].includes(response)){return}

        let skls = Object.assign({}, this._skills);

        while(Object.keys(skls).length){
            let _actions = Object.getOwnPropertyNames(skls)
            let input_action = ""
            if (_actions.length === 1){
                input_action = _actions[0]
            }               
            console.table(skls);
            while(!_actions.includes(input_action)){
                input_action = 
                prompt("please choose an action\nvalid choices are\n" + _actions).toLowerCase()
            }

            let action = this._skills[input_action]
            let targetting = Object.getOwnPropertyNames(action.targetting)
            let input_targets = ""
            if (targetting.length === 1){
                input_targets = targetting[0]
            }
            console.table(action.targetting);
            while(!targetting.includes(input_targets)){
                input_targets = 
                prompt("please choose targetting for "+input_action.toUpperCase()+".\nvalid choices are:\n" + targetting).toLowerCase()
            }

            let conditions = Object.getOwnPropertyNames(action.conditions)
            let input_condition = ""
            if (conditions.length === 1){
                input_condition = conditions[0]
            }
            console.table(action.conditions);
            while(!conditions.includes(input_condition)){
                input_condition = 
                prompt("please choose condition for "+input_action.toUpperCase()+".\nvalid choices are\n" + conditions).toLowerCase()
            }
            
            let instruction = {}
            instruction['action'] = action
            instruction['targetting'] = action.targetting[input_targets]//this.skill_targets[input_action][input_targets]
            instruction['conditions'] = action.conditions[input_condition]//this.skill_conditions[input_action][input_condition]
            this.instructions.push(instruction)
            
            delete skls[input_action]
        }
        console.log(this.instructions)
        // debugger
    }
    
    
}

class Boar extends Unit {}

class Mage extends Unit {
    constructor(){
        super()
        this.name = "mage"
        this.isPartyMember = true
        this.hpp = 19
        this.hp = this.hpp
        this.mpp = 4
        this.mp = this.mpp
        this.str = 1
        this.def = 0
        this.ct = 70
        this.skills = [new Attack(this),new Fire(this)]
        this._skills = {}
        this.skills.forEach(skill => {this._skills[skill.name.toLowerCase()]=skill})
    }
}

class Thief extends Unit {
    constructor(){
        super()
        this.name = "thief"
        this.isPartyMember = true
        this.hpp = 11
        this.hp = this.hpp
        this.mpp = 0
        this.mp = this.mpp
        this.str = 1
        this.def = 0
        this.ct = 55
    }
}
