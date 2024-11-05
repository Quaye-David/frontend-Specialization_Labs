console.log("--------------------------------------------------------");
console.log("Object Transformation");

// Declaring an array of objects of people
let people = [
    {
        firstName: "Dave",
        lastName: "Quaye",
        age: 25,
        occupation: "Frontend Developer"
    },
    {
        firstName: "Jane",
        lastName: "Doe",
        age: 16,
        occupation: "Backend Developer"
    },
    {
        firstName: "John",
        lastName: "",
        age: 19,
        occupation: "Full Stack Developer"
    }
];

let person = people[0];
// person variable is derived from the people array in array[0]


console.log("--------------------------------------------------------\n");

// a. A function that returns the full name of a person
const fullName = (person) => {
    console.log(`My name is ${person.firstName} ${person.lastName}`);
 }
 fullName(person);

console.log("\n--------------------------------------------------------\n");