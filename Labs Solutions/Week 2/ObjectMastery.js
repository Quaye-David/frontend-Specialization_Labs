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

  //   //passing a method into the function
  //   this.usePower = function (powerName) {
  //     console.log(`${this.name} is using ${powerName}`);
  //   };
  //   this.revealIdentity = function () {
  //     console.log(`${this.name} is actually ${this.secretIdentity}`);
  //   };
}

function SuperVillian(name, secretIdentity, powers, weakness) {
    this.name = name;
    this.secretIdentity = secretIdentity,
    this.powers = powers;
    this.weakness = weakness;
}


// 4. Prototypal Inheritance
Superhero.prototype.usePower = function (powerName) {
  console.log(`${this.name} is using ${powerName}`);
};

Superhero.prototype.revealIdentity = function () {
  console.log(`${this.name} is actually ${this.secretIdentity}`);
};

SuperVillian.prototype.usePower = function (powerName) {
    console.log(`${this.name} is using ${powerName}`);
  };
  
SuperVillian.prototype.revealIdentity = function () {
    console.log(`${this.name} is actually ${this.secretIdentity}`);
 };


const superHero1 = new Superhero(
  "Superman",
  "Clark Kent",
  ["super strength", "flight", " heat vision"],
  "Kryptonite"
);

const superHero2 = new Superhero(
  "Batman",
  "Bruce Wayne",
  ["super strength", "flight"],
  "Joker"
);

const superHero3 = new Superhero(
  "Spiderman",
  "Peter Parker",
  ["web swinging, super strength"],
  "Green Goblin"
);

const superHero4 = new Superhero(
  "Iron Man",
  "Tony Stark",
  ["super strength", "flight", "repulsor technology"],
  " Ultron"
);

const superHero5 = new Superhero(
  "Captain America",
  "Steve Rogers",
  ["super strength", "shield throwing"],
  "Red Skull"
);

// superHero2.revealIdentity();
// superHero2.usePower("super strength");
//console.log(superHero2);
