class Skills {
    constructor(owner){
        this.caster = owner
        this.name = this.constructor.name//.toLowerCase()
        this.cost = 0;
        
        this.targetting = {
            'first': (targets) => targets[0],
            'random': (targets) => targets.random(),
            'max_hp': by_max_attr('hp'),
            'min_hp': by_min_attr('hp'),
            'strongest': by_max_attr('str')
        }
        this.conditions = {
            'always': () => true,
        }
    }
    cast(unit){
        lg(`${this.caster.name} attacks ${unit.name}.`);
        unit.take_dmg(this.caster.str);
    }
    
}

class Attack extends Skills {}

class Fire extends Skills {
    constructor(owner){
        super(owner)
        this.cost = 1
        
        this.conditions = {
            'always': () => true,
            'can_cast': (action) => this.caster.mp >= action.cost,
            'mp_full': () => this.caster.mp === this.caster.mpp,
            'high_mp': (action) => (this.caster.mp-action.cost)/(this.caster.mpp-action.cost) > Math.random(),
            'frugal': (action) => (this.caster.mp-action.cost)/(this.caster.mpp+1) > Math.random(),
            'high_trg_hp': (action,targets) => targets[0].hp/targets[0].hpp >= 0.4 && this.caster.mp >= action.cost
        }
    }
    cast(unit){
        if(this.caster.mp<this.cost){
            lg("NOT ENOUGH MP")
            return
        }
        this.caster.mp -= this.cost;
        lg(`${this.caster.name} casts 'Fire on ${unit.name}.`);
        console.log(`Mp: ${this.caster.mp}/${this.caster.mpp}`);
        unit.take_dmg(4);
    }
}