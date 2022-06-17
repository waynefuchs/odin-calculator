// arrow functions to do the actual calculation
const calculatorAdd = (a, b) => a + b;
const calculatorSubtract = (a, b) => a - b;
const calculatorMultiply = (a, b) => a * b;
const calculatorDivide = (a, b) => a / b;
const calculatorOperate = (f, a, b) => f(a, b);  // I decided to use a different method

const lcda = document.querySelector('#lcd-a');
const lcdb = document.querySelector('#lcd-b');
const hideDisplay = (display) => display.style.visibility = "hidden";
const showDisplay = (display) => display.style.visibility = "visible";
const isDisplayHidden = (display) => display.style.visibility === "hidden";
const setDisplay = (display, value) => display.textContent = value;
const getDisplay = (display, value) => display.textContent;
const hasDecimalInDisplay = () => lcdb.textContent.includes('.');
const negativeDisplay = () => lcdb.textContent = String(Number(lcdb.textContent) * -1);
const percentDisplay = () => lcdb.textContent = String(Number(lcdb.textContent) * 0.01);
const addToDisplay = (value) => {
    if(lcdb.textContent.length + 1 > 16) return;
    const conversion = Number(lcdb.textContent);
    if(isNaN(conversion)) {
        console.error(`Input display contained value that was not a number: ${lcdb.textContent}`);
        lcdb.textContent = "";
        return;
    }
    // I'm not supporting numbers > 64 bit
    if(conversion > 9007199254740991) return;
    lcdb.textContent = 
        (lcdb.textContent === "0") 
            ? (value === ".") ? '0.' : value 
            : lcdb.textContent + value;
};
const removeFromDisplay = () => {
    if(lcdb.textContent.length >= 1) lcdb.textContent = lcdb.textContent.slice(0, -1);
    if(lcdb.textContent.length == 0) lcdb.textContent = "0";
}

// Handle Keyboard Input
const validNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const validOperators = ["*", "/", "+", "-"];
const handleKeyboardInput = (e) => {
    parseInput(e.key);
};
const parseInput = (key) => {
    if(key in validNumbers) addToDisplay(key);
    else if(validOperators.includes(key)) setOperator(key);
    else if(key === "Escape") setCalculatorValuesToZero();
    else if(key === "Enter" || key === "=") doOperation();
    else if(key === ".") addToDisplay('.');
    else if(key === "%") percentDisplay();
    else if(key === "n") negativeDisplay();
    else if(key === "Backspace") removeFromDisplay();
    // else console.log(key);
};
window.addEventListener('keydown', handleKeyboardInput);

// Variables holding the calculator stuff
let isOperatorActive;
let operandA;
let operandB;
let operator;
let result;
let memory;
const operatorButtons = document.querySelectorAll('.operator');
const setCalculatorValuesToZero = (includeMemory=false) => {
    operandA = 0;
    operandB = 0;
    operator = undefined;
    result = undefined;
    if(includeMemory) memory = [];
    setDisplay(lcda, 0);
    setDisplay(lcdb, 0);
    hideDisplay(lcda);
    isOperatorActive = false;
}; setCalculatorValuesToZero();

// 5.2. Make the operators work
const operators = {
    "/": calculatorDivide,
    "*": calculatorMultiply,
    "-": calculatorSubtract,
    "+": calculatorAdd,
};
const setOperator = (op) => {
    if(isOperatorActive) {
        doOperation();
        isOperatorActive = false;
    }

    operator = operators[op];
    setDisplay(lcda, getDisplay(lcdb));
    setDisplay(lcdb, 0);
    showDisplay(lcda);
    isOperatorActive = true;
};
function doOperation() {
    const a = Number(getDisplay(lcda));
    const b = Number(getDisplay(lcdb));
    if(isNaN(a) || isNaN(b)) {
        console.error(`Not a number! (${getDisplay(lcda)})::(${getDisplay(lcdb)})`);
        return;
    }

    let result = operator(Number(a), Number(b));
    console.log(`a:'${a}' b:'${b}' result:'${result}'`);
    result = calculatorRound(result, 15).toString();
    setCalculatorValuesToZero();
    if(isNaN(result)) result = "divide by zero?";
    setDisplay(lcdb, result);
};

// Wire up the JS to the HTML
// (Button Click)
const buttonPressed = (e) => {
    const key = e.target.id.includes('_') ? e.target.id.split('_')[1] : e.target.id;
    parseInput(key);
}
const wireButtons = () => {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => button.addEventListener('click', buttonPressed));
}; wireButtons();


// Not a good rounding function, but better than nothing.
function calculatorRound(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}