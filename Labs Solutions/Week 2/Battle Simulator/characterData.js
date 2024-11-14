// characterData.js
import { createSuperhero, createSuperVillain } from './characters.js';

export const superheroes = [
    new createSuperhero({
        name: "Superman",
        secretIdentity: "Clark Kent",
        powers: ["super strength", "flight", "heat vision"],
        weakness: "Kryptonite"
    }),
    new createSuperhero({
        name: "Batman",
        secretIdentity: "Bruce Wayne",
        powers: ["martial arts", "gadgets"],
        weakness: "No superpowers"
    }),
    new createSuperhero({
        name: "Spider-Man",
        secretIdentity: "Peter Parker",
        powers: ["web swinging", "super strength"],
        weakness: "Spider-Sense overload"
    }),
    new createSuperhero({
        name: "Iron Man",
        secretIdentity: "Tony Stark",
        powers: ["flight", "repulsor technology"],
        weakness: "Arc Reactor dependency"
    }),
    new createSuperhero({
        name: "Wonder Woman",
        secretIdentity: "Diana Prince",
        powers: ["super strength", "lasso of truth"],
        weakness: "Binding by a man"
    })
];

export const supervillains = [
    new createSuperVillain({
        name: "Lex Luthor",
        secretIdentity: "Lex Luthor",
        powers: ["genius intellect", "technology"],
        nemeses: "Superman"
    }),
    new createSuperVillain({
        name: "Joker",
        secretIdentity: "Unknown",
        powers: ["chaos", "manipulation"],
        nemeses: "Batman"
    }),
    new createSuperVillain({
        name: "Green Goblin",
        secretIdentity: "Norman Osborn",
        powers: ["strength", "gadgets"],
        nemeses: "Spider-Man"
    }),
    new createSuperVillain({
        name: "Thanos",
        secretIdentity: "Thanos",
        powers: ["super strength", "infinity gauntlet"],
        nemeses: "Avengers"
    }),
    new createSuperVillain({
        name: "Doctor Doom",
        secretIdentity: "Victor von Doom",
        powers: ["magic", "technology"],
        nemeses: "Fantastic Four"
    })
];
