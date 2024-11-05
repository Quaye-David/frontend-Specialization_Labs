//String Transformation
console.log("\n--------------------------------------------------------");
console.log("Section 1: String Transformation");
console.log("--------------------------------------------------------\n");
// a. A function that takes a string as a parameter and converts the first letter of each word of the string in upper case.
let string = "dave is a frontend developer";

const capitalize = (string) => {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
console.log("Original String: ", string);
console.log("Capitalized String: ", capitalize(string));


console.log("\n--------------------------------------------------------\n");


// b. A function that reverses a string
const reverse = (string) => {
    return string.split('').reverse().join('');
}
console.log("Original String: ", string);
console.log("Reversed String: ", reverse(string));

console.log("\n--------------------------------------------------------\n");


// c. A function that checks if a string is a palindrome (reads the same backward as forward)
const isPalindrome = (string) => {
    return string === string.split('').reverse().join('');
}
console.log(`Is "A man, a plan, a canal, Panama" a palindrome? ${isPalindrome("A man, a plan, a canal, Panama")}`);
console.log(`Is "racecar" a palindrome? ${isPalindrome("racecar")}`);
console.log(`Is "hello" a palindrome? ${isPalindrome("hello")}`);

console.log("\n--------------------------------------------------------\n");

// d. A function that counts the number of words in a string
const countWords = (string) => {
    return string.split(' ').length;
}
console.log("Original String: ", string);
console.log("Number of Words: ", countWords(string));

console.log("\n--------------------------------------------------------\n");


// 2. Array Transformation
let myArray = [1, 2, 3, 4, 5];

// a. A function that doubles all the numbers in an array
const double = (array) => {
    return array.map(num => num * 2);
}
console.log("Original Array: ", myArray);
console.log("Doubled Array: ", double(myArray));

console.log("\n--------------------------------------------------------\n");


// b. A function that filters all the even numbers in an array
const filterEven = (array) => {
    return array.filter(num => num % 2 === 0);
}
console.log("Original Array: ", myArray);
console.log("Even Numbers: ", filterEven(myArray));

console.log("\n--------------------------------------------------------\n");