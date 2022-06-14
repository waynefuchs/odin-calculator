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
            ? value 
            : lcdb.textContent + value;
};

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
    "divide": calculatorDivide,
    "multiply": calculatorMultiply,
    "minus": calculatorSubtract,
    "plus": calculatorAdd,
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
    console.log(operator);
    let result = operator(a, b);
    result = calculatorRound(result, 15).toString();
    setCalculatorValuesToZero();
    if(isNaN(result)) result = "lol you made mistake";
    setDisplay(lcdb, result);
};

// Wire up the JS to the HTML
const buttonPressed = (e) => {
    const buttonAction = e.target.id.includes('-') ? e.target.id.split('-')[1] : e.target.id;
    switch(buttonAction) {
        case "negative":
            negativeDisplay();
            return;
        case "percent":
            percentDisplay();
            return;
        case "divide":
        case "multiply":
        case "minus":
        case "plus":
            setOperator(buttonAction);
            break;
        case "equal":
            doOperation();
            break;
        case "allclear":
            setCalculatorValuesToZero();
            return;
        case "decimal":
            if(!hasDecimalInDisplay()) addToDisplay('.');
            return;
        default:
            if(buttonAction.match(/^[0-9]$/)) addToDisplay(buttonAction);
            return;
    }
}
const wireButtons = () => {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => button.addEventListener('click', buttonPressed));
}; wireButtons();


// Not a good rounding function, but better than nothing.
function calculatorRound(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}