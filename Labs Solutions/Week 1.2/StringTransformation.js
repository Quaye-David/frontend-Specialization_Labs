//String Transformation

// a. A function that takes a string as a parameter and converts the first letter of each word of the string in upper case.
let string = "dave is a frontend developer";

const capitalize = (string) => {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
console.log("Capitalized String: ", capitalize(string));