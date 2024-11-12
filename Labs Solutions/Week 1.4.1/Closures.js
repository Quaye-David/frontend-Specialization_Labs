const person = {
    name: 'Peter',
    age: 30,
    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
};

//Another person object
const person2 = {
    name: 'John',
    age: 25,
};

//Destructuring the object
const { name, age } = person;

//Using thr Direct Method call.
console.log('Direct call:');
person.greet();

//Using call() method
console.log('\nUsing call():');
person.greet.call(person2);

//Using the apply() method
console.log('\nUsing apply():');
person.greet.apply({ name: 'Sarah', age: 35 });

// 4. Using bind()
console.log('\nUsing bind():');
const boundGreet = person.greet.bind({ name: 'John', age: 40 });
boundGreet();

// 5. Demonstrating context loss
console.log('\nContext loss demonstration:');
const greetCopy = person.greet;
// greetCopy(); // Would result in undefined values

// 6. Fixing context loss
console.log('\nFixed context:');
const fixedGreet = person.greet.bind(person);
fixedGreet();
