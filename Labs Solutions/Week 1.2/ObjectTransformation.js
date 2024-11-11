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

let person = people[0]; // person variable is derived from the people array in array[0]

//Helper function to validate the person object
const isValidPerson = (person) => {
  return person &&
    typeof person === "object" &&
    typeof person.firstName === "string" &&
    typeof person.lastName === "string" &&
    typeof person.age === "number" &&
    typeof person.occupation === "string";
};

console.log("--------------------------------------------------------\n");

// a. A function that returns the full name of a person
// Updated the function with destructuring and error handling

const getFullName = (person) => {
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
  }

console.log(getFullName(person));

console.log("\n--------------------------------------------------------\n");

// b. A function that checks if the person is an adult 18 years and above
const isAdult = (person) => {
  try {
    if (!person) {
      throw new Error("Person is required");
    }
    if (!isValidPerson(person)) {
      throw new Error("Invalid person object");
    }
    return person.age >= 18;
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

console.log(isAdult(person));

console.log("\n--------------------------------------------------------\n");

// c. A function that filters an array of person objects to keep only those at least minAge years old
const filterAdults = (people, minAge) => {
  try {
    if (!people || !Array.isArray(people) || people.length === 0) {
      throw new Error("People array is required");
    }
    if (typeof minAge !== "number" || minAge < 0) {
      throw new Error("Minimum age is required");
    }
    return people.filter((person) => person.age >= minAge);
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

console.log(filterAdults(people, 18));

console.log("\n--------------------------------------------------------\n");

// Adding test cases to validate the functions

console.log("Full Name Tests");
console.log(getFullName(null))
console.log(getFullName({}))
console.log(getFullName(person));

console.log("\n--------------------------------------------------------\n");

console.log("Is Adult Tests");
console.log(isAdult(null));
console.log(isAdult({}));
console.log(isAdult(person));

console.log("\n--------------------------------------------------------\n");

console.log("Filter Adults Tests");
console.log(filterAdults(null, 18));
console.log(filterAdults([], 18));
console.log(filterAdults(people, 18));
console.log(filterAdults(people, "18"));

console.log("\n--------------------------------------------------------\n");
