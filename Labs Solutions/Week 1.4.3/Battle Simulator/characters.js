// characters.js
export function createCharacter({ name, secretIdentity, powers, weakness = null, nemeses = null }) {
    return {
        name,
        secretIdentity,
        powers,
        weakness,
        nemeses,
        health: 100,
        attack() {
            return Math.floor(Math.random() * 30) + 10;
        },
        takeDamage(damage) {
            this.health = Math.max(0, this.health - damage);
            return this.health;
        }
    };
}

export function createSuperhero(props) {
    if (!props.weakness) {
        throw new Error("Superhero must have a weakness defined");
    }
    if (props.nemeses) {
        throw new Error("Superhero must not have nemeses defined");
    }
    return createCharacter(props);
}

 export function createSuperVillain(props) {
    if (!props.nemeses) {
        throw new Error("Supervillain must have nemeses defined");
    }
    if (props.weakness) {
        throw new Error("Supervillain must not have a weakness defined");
    }
    return createCharacter(props);
}

// export { createCharacter, createSuperhero, createSuperVillain };