// Function to add two numbers
const add = (a, b) => {
  return a + b;
};

// Function to subtract two numbers
const subtract = (a, b) => {
  return a - b;
};

// Function to multiply two numbers
const multiply = (a, b) => {
  return a * b;
};

// Function to divide two numbers
const divide = (a, b) => {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
};