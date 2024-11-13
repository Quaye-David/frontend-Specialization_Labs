// 1. Object Creation Basics
const superHero = {
  name: "Superman",
  secretIdentity: "Clark Kent",
  powers: ["super strength", "flight", "heat vision"],
  weakness: "Kryptonite",

  // 2. Methods and functionality
  usePower(powerName) {
    console.log(`${this.name} is using ${powerName}`);
  },
  revealIdentity() {
    console.log(`${this.name} is actually ${this.secretIdentity}`);
  },
};

// 3. Object Constructor
function Superhero(name, secretIdentity, powers, weakness) {
  this.name = name;
  this.secretIdentity = secretIdentity;
  this.powers = powers;
  this.weakness = weakness;
}

function SuperVillain(name, secretIdentity, powers, nemeses) {
  this.name = name;
  this.secretIdentity = secretIdentity;
  this.powers = powers;
  this.nemeses = nemeses;
}

// 4. Prototypal Inheritance
Superhero.prototype.usePower = function (powerName) {
  console.log(`${this.name} is using ${powerName}`);
};

Superhero.prototype.revealIdentity = function () {
  console.log(`${this.name} is actually ${this.secretIdentity}`);
};

SuperVillain.prototype.usePower = function (powerName) {
  console.log(`${this.name} is using ${powerName}`);
};

SuperVillain.prototype.revealIdentity = function () {
  console.log(`${this.name} is actually ${this.secretIdentity}`);
};

// Create an array of superheroes and supervillians
// Superheroes
const superheroes = [
  new Superhero(
    "Superman",
    "Clark Kent",
    ["super strength", "flight", "heat vision"],
    "Kryptonite"
  ),
  new Superhero("Batman", "Bruce Wayne", ["martial arts", "gadgets"], "Joker"),
  new Superhero(
    "Spiderman",
    "Peter Parker",
    ["web swinging", "super strength"],
    "Green Goblin"
  ),
  new Superhero(
    "Iron Man",
    "Tony Stark",
    ["flight", "repulsor technology"],
    "Ultron"
  ),
  new Superhero(
    "Captain America",
    "Steve Rogers",
    ["super strength", "shield throwing"],
    "Red Skull"
  ),
];

// Supervillains
const supervillains = [
  new SuperVillain(
    "Lex Luthor",
    "Lex Luthor",
    ["genius level intellect"],
    "Superman"
  ),
  new SuperVillain("Ultron", "Ultron", ["artificial intelligence"], "Iron Man"),
  new SuperVillain(
    "Joker",
    "Joker",
    ["chaos manipulation", "genius level intellect"],
    "Batman"
  ),
  new SuperVillain(
    "Green Goblin",
    "Oscorp",
    ["genius level intellect", "explosives"],
    "Spiderman"
  ),
];

// Iterate over the arrays and log the names of the superheroes and supervillains
console.log("\n------------------------");
console.log(" }=== Superheroes ==={");
console.log("------------------------\n");

superheroes.forEach((superhero) => {
  console.log(`Name: ${superhero.name}`);
  console.log(`Powers: ${superhero.powers.join(", ")}`);
  console.log(`Weakness: ${superhero.weakness}`);
  console.log("-------------------\n");
});

console.log("[][][][][][][][][][][][][][][][][][][][][][][][][][]\n");

console.log("------------------------");
console.log("<=== Supervillains ===>");
console.log("------------------------\n");

supervillains.forEach((supervillain) => {
  console.log(`Name: ${supervillain.name}`);
  console.log(`Powers: ${supervillain.powers.join(", ")}`);
  console.log(`Nemesis: ${supervillain.nemeses}`);
  console.log("-------------------\n");
});

console.log("\n[][][][][][][][][][][][][][][][][][][][][][][][][][]\n");

//* Map a list of nemesis for the supervillains
const nemesesList = supervillains.map((supervillain) => {
  return `${supervillain.name} -> ${supervillain.nemeses}`;
});

console.log("== SuperVillain <==> Nemesis ==");
nemesesList.forEach((nemesis) => console.log(nemesis));

console.log("\n[][][][][][][][][][][][][][][][][][][][][][][][][][]\n");

//* Filter the list of superheroes to only include those with the power of "super strength"
const strongHeroes = superheroes.filter((superhero) =>
  superhero.powers.includes("super strength")
);
console.log("== Superheroes with Super Strength ==");
console.log(strongHeroes);

console.log("\n[][][][][][][][][][][][][][][][][][][][][][][][][][]\n");

//* Map with filter: Find and list superheroes who have more than one power.
const multiPowersHeroes = superheroes
  .filter((superhero) => superhero.powers.length > 1)
  .map((superhero) => superhero.name);
console.log("Heroes with multiple powers:");
console.log(multiPowersHeroes);
