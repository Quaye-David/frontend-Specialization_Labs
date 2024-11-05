console.log("--------------------------------------------------------");
console.log("Object Transformation");

// Declaring an array of objects of people
let people = [
  {
    firstName: "Dave",
    lastName: "Quaye",
    age: 28,
    occupation: "Frontend Developer",
  },
  {
    firstName: "Kwame",
    lastName: "Nkrumah",
    age: 16,
    occupation: "Backend Developer",
  },
  {
    firstName: "Ama",
    lastName: "Mensah",
    age: 19,
    occupation: "Full Stack Developer",
  },
  {
    firstName: "Kofi",
    lastName: "Annan",
    age: 22,
    occupation: "Frontend Developer",
  },
  {
    firstName: "Akosua",
    lastName: "Adjei",
    age: 14,
    occupation: "Data Scientist",
  },
];

let person = people[0];
// person variable is derived from the people array in array[0]

console.log("--------------------------------------------------------\n");

// a. A function that returns the full name of a person
const fullName = (person) => {
  console.log(`My name is ${person.firstName} ${person.lastName}`);
};
fullName(person);

console.log("\n--------------------------------------------------------\n");

// b. A function that checks if the person is an adult 18 years and above
const isAdult = (person) => {
  if (person.age >= 18) {
    console.log("I am an adult");
  } else {
    console.log("I am not an adult");
  }
};
isAdult(person);

console.log("\n--------------------------------------------------------\n");

// c. A function that filters an array of person objects to keep only those at least minAge years old
const filterAdults = (array, minAge) => {
  return array.filter((person) => person.age >= minAge);
};
console.log("Adults: ", filterAdults(people, 18));

console.log("\n--------------------------------------------------------\n");


