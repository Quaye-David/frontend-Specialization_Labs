//String Transformation

// a. A function that takes a string as a parameter and converts the first letter of each word of the string in upper case.
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
capitalizeFirstLetter('dave is a developer');