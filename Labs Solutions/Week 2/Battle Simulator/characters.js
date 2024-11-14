// characters.js
export class Character {
    constructor({ name, secretIdentity, powers, weakness = null, nemeses = null }) {
        this.name = name;
        this.secretIdentity = secretIdentity;
        this.powers = powers;
        this.weakness = weakness;
        this.nemeses = nemeses;
        this.health = 100;
    }

    attack() {
        return Math.floor(Math.random() * 30) + 10;
    }

    takeDamage(damage) {
        this.health = Math.max(0, this.health - damage);
        return this.health;
    }
}

export class Superhero extends Character {
    constructor(props) {
        super(props);
        if (!props.weakness) {
            throw new Error("Superhero must have a weakness defined");
        }
    }
}

export class SuperVillain extends Character {
    constructor(props) {
        super(props);
        if (!props.nemeses) {
            throw new Error("Supervillain must have nemeses defined");
        }
    }
}