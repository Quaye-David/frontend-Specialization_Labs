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