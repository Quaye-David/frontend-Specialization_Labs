// characters.js
export class Superhero {
    constructor(name, secretIdentity, powers, weakness) {
        this.name = name;
        this.secretIdentity = secretIdentity;
        this.powers = powers;
        this.weakness = weakness;
        this.health = 100;
    }

    attack() {
        return Math.floor(Math.random() * 30) + 10;
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
    }
}

export class SuperVillain {
    constructor(name, secretIdentity, powers, nemeses) {
        this.name = name;
        this.secretIdentity = secretIdentity;
        this.powers = powers;
        this.nemeses = nemeses;
        this.health = 100;
    }

    attack() {
        return Math.floor(Math.random() * 30) + 10;
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
    }
}