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

// 5.0.1. Figure out where to store everything
let operandA;
let operandB;
let operator;
let result;
let memory;
const setOperator = (op) => {
    console.log("???");
    operator = op;
    setDisplay(lcda, getDisplay(lcdb));
    setDisplay(lcdb, 0);
};
const setCalculatorValuesToZero = (includeMemory=false) => {
    operandA = 0;
    operandB = 0;
    operator = undefined;
    result = undefined;
    if(includeMemory) memory = [];
    setDisplay(lcda, 0);
    setDisplay(lcdb, 0);
}; setCalculatorValuesToZero();

// 5.2. Make the operators work
const operators = {
    divide: 0,
    multiply: 0,
    minus: 0,
    plus: 0,
};


// 5.0.2. Wire up the JS to the HTML
const buttonPressed = (e) => {
    const buttonAction = e.target.id.includes('-') ? e.target.id.split('-')[1] : e.target.id;
    console.log(buttonAction);
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
            console.log("???!!!");
            setOperator(buttonAction);
            break;
        case "equal":
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