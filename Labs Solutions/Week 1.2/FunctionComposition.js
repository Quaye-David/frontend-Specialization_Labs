// FunctionComposition.js
console.log("--------------------------------------------------------");
console.log("Function Composition\n");
console.log("--------------------------------------------------------");

// Compose function
const compose = (...fns) => (arg) => fns.reduceRight((acc, fn) => fn(acc), arg);

// Functions from StringTransformation.js
const capitalize = (string) => {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const reverseString = (string) => {
    return string.split('').reverse().join('');
};

// Functions from ObjectTransformation.js
const fullName = (person) => `${person.firstName} ${person.lastName}`;
const isAdult = (person) => person.age >= 18;

// Combining functions to create new functionality
const reverseAndCapitalize = compose(capitalize, reverseString);
const getFullNameAndCheckAdult = (person) => {
    const name = fullName(person);
    const adultStatus = isAdult(person);
    return { name, adultStatus };
};

console.log(reverseAndCapitalize("JavaScript Frontend"));

let person = {
    firstName: "Kwame",
    lastName: "Nkrumah",
    age: 16,
    occupation: "Backend Developer"
};

const result = getFullNameAndCheckAdult(person);
console.log(`Full Name: ${result.name}, Is Adult: ${result.adultStatus}`);

console.log("--------------------------------------------------------\n");