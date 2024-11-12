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

const getFullNameAndCheckAdult = (input) => {
    try {
        // Check for null or undefined
        if (input == null) {
            throw new Error('Input cannot be null or undefined');
        }

        // Check for numbers
        if (typeof input === 'number') {
            throw new Error('Numbers are not valid input');
        }

        // Check for empty string
        if (typeof input === 'string') {
            if (input.trim() === '') {
                throw new Error('Empty string is not valid input');
            }
            throw new Error('String input must be a valid person object');
        }

        // Check for arrays
        if (Array.isArray(input)) {
            throw new Error('Arrays are not valid input');
        }

        // Check if input is an object but not null
        if (typeof input === 'object') {
            // Check for empty object
            if (Object.keys(input).length === 0) {
                throw new Error('Empty object is not valid input');
            }

            // Validate object structure
            if (!input.firstName || !input.lastName || !input.age) {
                throw new Error('Object missing required properties: firstName, lastName, age');
            }

            // Validate property types
            if (typeof input.firstName !== 'string' || 
                typeof input.lastName !== 'string' || 
                typeof input.age !== 'number') {
                throw new Error('Invalid property types in person object');
            }

            // If all validations pass, process the object
            const fullName = `${input.firstName} ${input.lastName}`;
            const isAdult = input.age >= 18;
            return `${fullName} is ${isAdult ? 'an adult' : 'not an adult'}`;
        }

        throw new Error('Invalid input type');
    } catch (error) {
        return `Error: ${error.message}`;
    }
};



// Combining functions to create new functionality
const reverseAndCapitalize = compose(capitalize, reverseString);

console.log(reverseAndCapitalize("JavaScript Frontend"));

let person = {
  firstName: "Kwame",
  lastName: "Nkrumah",
  age: 16,
};

const result = getFullNameAndCheckAdult(person);

//Test cases for compose function
console.log(reverseAndCapitalize(123));
console.log(reverseAndCapitalize(""));
console.log(reverseAndCapitalize(" "));
console.log(reverseAndCapitalize("dave is cool"));

// Test cases
console.log(getFullNameAndCheckAdult(123));
console.log(getFullNameAndCheckAdult(''));
console.log(getFullNameAndCheckAdult('dave is cool'));
console.log(getFullNameAndCheckAdult({}));
console.log(getFullNameAndCheckAdult([]));
console.log(
  getFullNameAndCheckAdult({ firstName: "Dave", lastName: "Quaye", age: 28 })
);
console.log(getFullNameAndCheckAdult(person));

console.log("--------------------------------------------------------\n");
