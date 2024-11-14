// characterData.js
import { Superhero, SuperVillain } from './characters.js';

export const superheroes = [
    new Superhero({
        name: "Superman",
        secretIdentity: "Clark Kent",
        powers: ["super strength", "flight", "heat vision"],
        weakness: "Kryptonite"
    }),
    new Superhero({
        name: "Batman",
        secretIdentity: "Bruce Wayne",
        powers: ["martial arts", "gadgets"],
        weakness: "No superpowers"
    }),
    new Superhero({
        name: "Spider-Man",
        secretIdentity: "Peter Parker",
        powers: ["web swinging", "super strength"],
        weakness: "Spider-Sense overload"
    }),
    new Superhero({
        name: "Iron Man",
        secretIdentity: "Tony Stark",
        powers: ["flight", "repulsor technology"],
        weakness: "Arc Reactor dependency"
    }),
    new Superhero({
        name: "Wonder Woman",
        secretIdentity: "Diana Prince",
        powers: ["super strength", "lasso of truth"],
        weakness: "Binding by a man"
    })
];

export const supervillains = [
    new SuperVillain({
        name: "Lex Luthor",
        secretIdentity: "Lex Luthor",
        powers: ["genius intellect", "technology"],
        nemeses: "Superman"
    }),
    new SuperVillain({
        name: "Joker",
        secretIdentity: "Unknown",
        powers: ["chaos", "manipulation"],
        nemeses: "Batman"
    }),
    new SuperVillain({
        name: "Green Goblin",
        secretIdentity: "Norman Osborn",
        powers: ["strength", "gadgets"],
        nemeses: "Spider-Man"
    }),
    new SuperVillain({
        name: "Thanos",
        secretIdentity: "Thanos",
        powers: ["super strength", "infinity gauntlet"],
        nemeses: "Avengers"
    }),
    new SuperVillain({
        name: "Doctor Doom",
        secretIdentity: "Victor von Doom",
        powers: ["magic", "technology"],
        nemeses: "Fantastic Four"
    })
];
