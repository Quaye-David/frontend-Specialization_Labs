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

