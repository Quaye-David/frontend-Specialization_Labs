// FunctionComposition.js
console.log("--------------------------------------------------------");
console.log("Function Composition\n");
console.log("--------------------------------------------------------");

// Compose function
const compose =
  (...fns) =>
  (arg) =>
    fns.reduceRight((acc, fn) => fn(acc), arg);

// Functions from StringTransformation.js
const capitalize = (string) => {
  try {
    if (typeof string !== "string") {
      throw new Error("Input must be a string");
    }
    if (string.length === 0) {
      throw new Error("String is required");
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

const reverseString = (string) => {
  try {
    if (typeof string !== "string") {
      throw new Error("Input must be a string");
    }
    if (string.length === 0) {
      throw new Error("String is required");
    }
    return string.split("").reverse().join("");
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

// Functions from ObjectTransformation.js
//Update the function to use destructuring and error handling
const isValidPerson = (person) => {
  return (
    person &&
    typeof person === "object" &&
    typeof person.firstName === "string" &&
    typeof person.lastName === "string" &&
    typeof person.age === "number" &&
    typeof person.occupation === "string"
  );
};

const fullName = (person) => {
  try {
    if (!person) {
      throw new Error("Person is required");
    }
    if (!isValidPerson(person)) {
      throw new Error("Invalid person object");
    }
    const { firstName, lastName } = person;
    return `${firstName} ${lastName}`;
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

const isAdult = (person) => {
  try {
    if (!person) {
      throw new Error("Person is required");
    }
    if (!isValidPerson(person)) {
      throw new Error("Invalid person object");
    }
    const { age } = person;
    return age >= 18;
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

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
  occupation: "Backend Developer",
};

const result = getFullNameAndCheckAdult(person);
console.log(`Full Name: ${result.name}, Is Adult: ${result.adultStatus}`);

//Test cases for compose function
console.log(reverseAndCapitalize(123));
console.log(reverseAndCapitalize(""));
console.log(reverseAndCapitalize(" "));
console.log(reverseAndCapitalize("dave is cool"));

console.log(getFullNameAndCheckAdult(123));
console.log(getFullNameAndCheckAdult(""));
console.log(getFullNameAndCheckAdult(""));
console.log(getFullNameAndCheckAdult("dave is cool"));

console.log("--------------------------------------------------------\n");
