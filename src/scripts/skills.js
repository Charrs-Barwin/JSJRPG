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
    async cast(target){
        lg(`${this.caster.name} attacks ${target.name}.`);

        this.caster.pos[y] = target.pos[y] + target.size[y] - this.caster.size[y]
        this.caster.pos[x] = target.pos[x] + (this.caster.isPartyMember ? target.size[x] : (-this.caster.size[x]))
        this.caster.current_frame = this.caster.att_frame
        gm.draw_stage()
        await setDelay(250)

        target.take_dmg(this.caster.str);
        // gm.draw_stage()
        
        await setDelay(750)
        this.caster.returntToPosition()
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
    async cast(unit){
        if(this.caster.mp<this.cost){
            lg("NOT ENOUGH MP")
            return
        }
        this.caster.mp -= this.cost;
        lg(`${this.caster.name} casts 'Fire' on ${unit.name}.`);

        this.caster.current_frame = this.caster.att_frame
        gm.draw_stage()
        ctx.drawImage(fire,unit.pos[x],unit.pos[y],unit.size[x],unit.size[y])
        await setDelay(250)
        
        console.log(`Mp: ${this.caster.mp}/${this.caster.mpp}`);
        unit.take_dmg(4);

        await setDelay(500)
        this.caster.returntToPosition()
    }
}