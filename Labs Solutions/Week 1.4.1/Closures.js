// Closure for input validation
const createValidator = () => {
    return {
        validateInput(input) {
            if (input === null || input === undefined) {
                throw new Error('Input cannot be null or undefined');
            }
            if (typeof input !== 'object') {
                throw new Error('Input must be an object');
            }
            if (Object.keys(input).length === 0) {
                throw new Error('Input object cannot be empty');
            }
            if (!input.hasOwnProperty('name') || !input.hasOwnProperty('age')) {
                throw new Error('Input object must have name and age properties');
            }
        }
    };
};

const validator = createValidator();

const person = {
    name: 'Dave',
    age: 12,
    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
};

// Another person object
const person2 = {
    name: 'Abdul',
    age: 25,
};

// Destructuring the object
const { name, age } = person;

// Using the Direct Method call
console.log('Direct call:');
person.greet();

// Using call() method
console.log('\nUsing call():');
person.greet.call(person2);

// Using the apply() method
console.log('\nUsing apply():');
person.greet.apply({ name: 'Kweku', age: 35 });

// Using bind()
console.log('\nUsing bind():');
const boundGreet = person.greet.bind({ name: 'John', age: 40 });
boundGreet();

// Demonstrating context loss. Without the bind method, the greet method will lose its context
console.log('\nContext loss demonstration:');
const greetCopy = person.greet;
greetCopy();

// Fixing context loss
console.log('\nFixed context:');
const fixedGreet = person.greet.bind(person);
fixedGreet();

// Example of using the validator
try {
    validator.validateInput(person);
    console.log('Person object is valid.');
} catch (error) {
    console.error(error.message);
}

try {
    validator.validateInput({ name: 'Alice' }); // Missing age property
} catch (error) {
    console.error(error.message);
}