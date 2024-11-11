//String Transformation
console.log("\n--------------------------------------------------------");
console.log("Section 1: String Transformation");
console.log("--------------------------------------------------------\n");

// a. A function that takes a string as a parameter and converts the first letter of each word of the string in upper case.
let string = "dave";

const capitalize = (string) => {
  try {
    if (typeof string !== "string") {
      throw new Error("Input must be a string");
    }
    if (string.length === 0) {
      throw new Error("String is required");
    }
    return string.charAt(0).toUpperCase();
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

//Test cases for capitalize function
console.log("Original String: ", string);
console.log("Capitalized String: ", capitalize(string));
console.log("Original String: ", capitalize(123));
console.log(capitalize(""));
console.log(capitalize(" "));
console.log(capitalize("dave is cool"));

console.log("\n--------------------------------------------------------\n");

// b. A function that reverses a string
const reverse = (string) => {
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

//Test cases for reverse function
console.log("Original String: ", string);
console.log("Reversed String: ", reverse(string));
console.log(reverse(123));
console.log(reverse(""));
console.log(reverse(" "));
console.log(reverse("dave is cool"));

console.log("\n--------------------------------------------------------\n");

// c. A function that checks if a string is a palindrome (reads the same backward as forward)
const isPalindrome = (string) => {
  try {
    if (typeof string !== "string") {
      throw new Error("Input must be a string");
    }
    if (string.match(/[^a-zA-Z0-9]/g) !== null) {
        throw new Error("Only alphanumeric characters are allowed");
    }
    if (string.length === 0) {
      throw new Error("String is required");
    }
     return string === string.split('').reverse().join('');
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

//Adding Test Cases for isPalindrome function
console.log(
  `Is "A man, a plan, a canal, Panama" a palindrome? ${isPalindrome(
    "A man, a plan, a canal, Panama"
  )}`
);
console.log(`Is "racecar" a palindrome? ${isPalindrome("racecar")}`);
console.log(`Is "hello" a palindrome? ${isPalindrome("hello")}`);
console.log(`Is "12321" a palindrome? ${isPalindrome("12321")}`);
console.log(`Is "12345" a palindrome? ${isPalindrome("12345")}`);
console.log(isPalindrome(123));
console.log(isPalindrome(""));
console.log(isPalindrome(" "));
console.log(isPalindrome(1 + "dave is cool?"));

console.log("\n--------------------------------------------------------\n");

// d. A function that counts the number of words in a string
const countWords = (string) => {
 try {
    if (typeof string !== "string") {
      throw new Error("Input must be a string");
    }
    if (string.length === 0) {
      throw new Error("String is required");
    }
    return string.trim().split(/\s+/).length;
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

//Test cases for countWords function
console.log("Original String: ", string);
console.log("Number of Words: ", countWords(string));
console.log(countWords(123));
console.log(countWords(""));
console.log(countWords(" "));
console.log(countWords("dave is cool"));
console.log(countWords(" dave is  cool!"));

console.log("\n--------------------------------------------------------\n");

// 2. Array Transformation
let myArray = [1, 2, 3, 4, 5];

// a. A function that doubles all the numbers in an array
const double = (array) => {
 try {
    if (!Array.isArray(array)) {
      throw new Error("Input must be an array");
    }
    if (array.length === 0) {
      throw new Error("Array is required");
    }
    return array.map((num) => num * 2);
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

//Test cases for double function
console.log("Original Array: ", myArray);
console.log("Doubled Array: ", double(myArray));
console.log(double(123));
console.log(double([]));
console.log(double(""));
console.log(double("dave is cool"));

console.log("\n--------------------------------------------------------\n");

// b. A function that filters all the even numbers in an array
const filterEven = (array) => {
    try {
    if (!Array.isArray(array)) {
      throw new Error("Input must be an array");
    }
    if (array.some((num) => typeof num !== "number")) {
        throw new Error("Array must contain only numbers");
    }
    if (array.length === 0) {
      throw new Error("Array is required");
    }
    return array.filter((num) => num % 2 === 0);
    } catch (error) {
      return `Error: ${error.message}`;
    }
};

//Test cases for filterEven function
console.log("Original Array: ", myArray);
console.log("Even Numbers: ", filterEven(myArray));
console.log(filterEven(123));
console.log(filterEven([]));
console.log(filterEven(""));
console.log(filterEven("dave is cool"));
console.log(filterEven([1, 2, 3, 4, "five"]));

console.log("\n--------------------------------------------------------\n");

// c. A function that sums all the numbers in an array manually
const sum = (array) => {
  try {
    if (!Array.isArray(array)) {
      throw new Error("Input must be an array");
    }
    if (array.length === 0) {
      throw new Error("Array is required");
    }
    let total = 0;
    for (let num of array) {
      total += num;
    }
    return total;
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

//Test cases for sum function
console.log("Original Array: ", myArray);
console.log("Sum of Numbers: ", sum(myArray));
console.log(sum(123));
console.log(sum([]));
console.log(sum(""));
console.log(sum("dave is cool"));

console.log("\n--------------------------------------------------------\n");

// d. A function that calculates the average of all the numbers in an array
const average = (array) => {
    try {
    if (!Array.isArray(array)) {
      throw new Error("Input must be an array");
    }
    if (array.length === 0) {
      throw new Error("Array is required");
    }
    if (array.some((num) => typeof num !== "number")) {
        throw new Error("Array must contain only numbers");
    }
    let total = 0;
    for (let num of array) {
      total += num;
    }
    return total / array.length;
    }
    catch (error) {
      return `Error: ${error.message}`;
    }
};

//Test cases for average function
console.log("Average of numbers in the array: ", average(myArray));
console.log(average(123));
console.log(average([]));
console.log(average(""));
console.log(average("dave is cool"));
console.log(average([1, 2, 3, 4, "five"]));
console.log("\n--------------------------------------------------------\n");
