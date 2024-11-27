// 1. Creating a superhero object with its properties
const superman = {
  name: "Superman",
  secretIdentity: "Clark Kent",
  powers: ["super strength", "flight", "heat vision"],
  weakness: "Kryptonite",

  // 2. Adding a method to the superhero object
  usePower(powerName) {
    console.log(`${this.name} is using ${powerName}`);
  },
  revealIdentity() {
    console.log(`${this.name} is actually ${this.secretIdentity}`);
  },
};

// 3. Creating a Parent constructor function to streamline the object creation
function createCharacter(name, secretIdentity, powers) {
  // Basic checks for required fields
  if (!Array.isArray(powers) && !powers?.length) {
    throw new Error("Missing required character (array) powers");
  }

  if (!name || !secretIdentity) {
    throw new Error("Missing required character name or secretIdentity");
  }

  this.name = name;
  this.secretIdentity = secretIdentity;
  this.powers = powers;
}

// 4. Using Prototypal Inheritance to extend the functionality of the superhero objects
createCharacter.prototype.usePower = function (powerName) {
  console.log(`${this.name} is using ${powerName}`);
};

createCharacter.prototype.revealIdentity = function () {
  console.log(`${this.name} is actually ${this.secretIdentity}`);
};

// Hero constructor
function superhero(name, secretIdentity, powers, weakness) {
  character.call(this, name, secretIdentity, powers);
  this.weakness = weakness || "Unknown";
}

// Villain constructor
function superVillain(name, secretIdentity, powers, nemesis) {
  character.call(this, name, secretIdentity, powers);
  this.nemesis = nemesis || "Unknown";
}

// Set up inheritance
superhero.prototype = Object.create(character.prototype);
superVillain.prototype = Object.create(character.prototype);

// Create some heroes
const heroes = [
  new superhero(
    "Superman",
    "Clark Kent",
    ["super strength", "flight", "heat vision"],
    "Kryptonite"
  ),
  new superhero("Batman", "Bruce Wayne", ["martial arts", "gadgets"], "Joker"),
  new superhero(
    "Spiderman",
    "Peter Parker",
    ["web swinging", "super strength"],
    "Green Goblin"
  ),
];

// Create some villains
const villains = [
  new superVillain(
    "Lex Luthor",
    "Lex Luthor",
    ["genius intellect", "advanced technology"],
    "Superman"
  ),
  new superVillain(
    "Joker",
    "Unknown",
    ["chaos manipulation", "criminal mastermind"],
    "Batman"
  ),
  new superVillain(
    "Green Goblin",
    "Norman Osborn",
    ["enhanced strength", "advanced weapons"],
    "Spiderman"
  ),
];

// Helper function to show character info
function showCharacterInfo(characters, type) {
  console.log(`\n=== ${type} ===\n`);

  characters.forEach((char) => {
    console.log(`Name: ${char.name}`);
    console.log(`Powers: ${char.powers.join(", ")}`);
    console.log(
      type === "Heroes"
        ? `Weakness: ${char.weakness}`
        : `Nemesis: ${char.nemesis}`
    );
    console.log("-------------------\n");
  });
}

// Show all characters
showCharacterInfo(heroes, "Heroes");
showCharacterInfo(villains, "Villains");

// Find heroes with super strength
const strongHeroes = heroes.filter((hero) =>
  hero.powers.includes("super strength")
);
console.log(
  "Heroes with super strength:",
  strongHeroes.map((hero) => hero.name)
);

// Find heroes with multiple powers
const multiPowerHeroes = heroes
  .filter((hero) => hero.powers.length > 1)
  .map((hero) => hero.name);
console.log("\nHeroes with multiple powers:", multiPowerHeroes);

// Show villain-nemesis pairs
console.log("\nVillain vs Hero matchups:");
console.log("-------------------");
villains.forEach((villain) => {
  console.log(`${villain.name} vs ${villain.nemesis}`);
});
