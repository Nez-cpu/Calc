function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return "Error: Cannot divide by 0!";
    return a / b;
}

// Function that calls the above based on operator
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch(operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return null;
    }
}

// Test in console
console.log(operate('+', 12, 7)); // 19
console.log(operate('/', 5, 0));  // "Error: Cannot divide by 0!"


const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');

let firstNum = null;
let secondNum = null;
let currentOperator = null;
let shouldResetDisplay = false;

// Update display when number is clicked
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (display.textContent === "0" || shouldResetDisplay) {
            display.textContent = button.textContent;
            shouldResetDisplay = false;
        } else {
            display.textContent += button.textContent;
        }
    });
});

// Operator button clicked
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperator !== null && !shouldResetDisplay) {
            // Evaluate previous operation if user clicks another operator
            secondNum = display.textContent;
            const result = operate(currentOperator, firstNum, secondNum);
            display.textContent = roundResult(result);
            firstNum = result;
        } else {
            firstNum = display.textContent;
        }
        currentOperator = button.textContent;
        shouldResetDisplay = true;
    });
});

// Equals button clicked
equalsButton.addEventListener('click', () => {
    if (currentOperator === null || shouldResetDisplay) return;
    secondNum = display.textContent;
    const result = operate(currentOperator, firstNum, secondNum);
    display.textContent = roundResult(result);
    firstNum = result;
    currentOperator = null;
    shouldResetDisplay = true;
});

// Clear button
clearButton.addEventListener('click', () => {
    display.textContent = '0';
    firstNum = null;
    secondNum = null;
    currentOperator = null;
    shouldResetDisplay = false;
});

// Helper to round long decimals
function roundResult(number) {
    if (typeof number === "number") return Math.round(number * 100000) / 100000;
    return number; // for error messages
}
