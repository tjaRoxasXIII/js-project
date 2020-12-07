class Enemy {
    constructor(id, name, hp, attack, points) {
        this.id = id
        this.name = name
        this.hp = hp
        this.attack = attack
        this.points = points
        this.img = `./imgs/${name}.gif`
        this.maxHP = hp
    }
}

class Hero {
    constructor(id, name, hp, attack) {
        this.id = id
        this.name = name
        this.hp = hp
        this.attack = attack
        this.img = `./imgs/${name}.gif`
        this.maxHP = hp
    }
}