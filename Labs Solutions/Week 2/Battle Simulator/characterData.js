// characterData.js
import { Superhero, SuperVillain } from './characters.js';

export const superheroes = [
    new Superhero("Superman", "Clark Kent", ["super strength", "flight", "heat vision"], "Kryptonite"),
    new Superhero("Batman", "Bruce Wayne", ["martial arts", "gadgets"], "No superpowers"),
    new Superhero("Spider-Man", "Peter Parker", ["web swinging", "super strength"], "Spider-Sense"),
    new Superhero("Iron Man", "Tony Stark", ["flight", "repulsor technology"], "Arc Reactor"),
    new Superhero("Wonder Woman", "Diana Prince", ["super strength", "lasso of truth"], "Binding by a man")
];

export const supervillains = [
    new SuperVillain("Lex Luthor", "Lex Luthor", ["genius intellect", "technology"], "Superman"),
    new SuperVillain("Joker", "Unknown", ["chaos", "manipulation"], "Batman"),
    new SuperVillain("Green Goblin", "Norman Osborn", ["strength", "gadgets"], "Spider-Man"),
    new SuperVillain("Thanos", "Thanos", ["super strength", "infinity gauntlet"], "Avengers"),
    new SuperVillain("Doctor Doom", "Victor von Doom", ["magic", "technology"], "Fantastic Four")
];