// 1. Create functions for: add, subtract, multiply, divide
const calculatorAdd = (a, b) => a + b;
const calculatorSubtract = (a, b) => a - b;
const calculatorMultiply = (a, b) => a * b;
const calculatorDivide = (a, b) => a / b;

// 2. Create `operate` function
const calculatorOperate = (f, a, b) => f(a, b);

// 3. See: `index.html`

// 4. Update the display
const lcda = document.querySelector('#lcd-a');
const lcdb = document.querySelector('#lcd-b');
const setDisplay = (display, value) => display.textContent = value;
const displayHasDecimal = () => lcdb.textContent.includes('.');
const addToDisplay = (value) => lcdb.textContent = 
    (lcdb.textContent === "0") 
        ? value 
        : lcdb.textContent + value;

// 5.0.1. Figure out where to store everything
let operandA;
let operandB;
let operator;
let result;
let memory;
const setCalculatorValuesToZero = (includeMemory=false) => {
    operandA = 0;
    operandB = 0;
    operator = undefined;
    result = undefined;
    if(includeMemory) memory = [];
    setDisplay(lcda, 0);
    setDisplay(lcdb, 0);
}; setCalculatorValuesToZero();

// 5.0.2. Wire up the JS to the HTML
const buttonPressed = (e) => {
    //console.log(e.target);
    const buttonAction = e.target.id.includes('-') ? e.target.id.split('-')[1] : e.target.id;
    switch(buttonAction) {
        case "allclear":
            setCalculatorValuesToZero();
            break;
        case "negative":
            break;
        case "percent":
            break;
        case "divide":
            break;
        case "multiply":
            break;
        case "subtract":
            break;
        case "add":
            break;
        case "equal":
            break;
        case "decimal":
            if(!displayHasDecimal()) addToDisplay('.');
            break;
        default:
            if(buttonAction.match(/^[0-9]$/)) addToDisplay(buttonAction);
            break;
    }
}
const wireButtons = () => {
    const buttons = document.querySelectorAll('.button');
    console.table(buttons);
    buttons.forEach(button => button.addEventListener('click', buttonPressed));
}; wireButtons();