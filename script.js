// Selecting Elements
const numberKeys = document.querySelectorAll('[data-number]');
const operatorKeys = document.querySelectorAll('[data-operator]');
const deleteKey = document.querySelector('[data-delete]');
const resetKey = document.querySelector('[data-reset]');
const equalKey = document.querySelector('[data-equal]');
const numberDisplay = document.querySelector('[data-number-display]');
const calculationDisplay = document.querySelector('[data-calculation-display]');

// Varibles for calculation
let firstNumber = '';
let secondNumber = '';
let result = '';
let operator = undefined;

// Functions for basic math operations
const add = (a,b) => a + b;
const subtract = (a,b) => b - a;
const multiply = (a,b) => a * b;
const divide = (a,b) => b / a;

// Event listeners for number keys
numberKeys.forEach(button => {
    button.addEventListener('click', () =>{
        appendNumber(button.innerText);
        updateDisplay();
    })
});

const appendNumber = ((num) => {
    if(num === '.' && firstNumber.includes('.')) return;
    firstNumber = firstNumber.toString() + num.toString();
});

//Operator keys
operatorKeys.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperator(button.innerText);
        updateDisplay();
    })
});

const chooseOperator = ((op) => {
    if(firstNumber === '') return;
    if(secondNumber !== ''){
        operate()
    }
    operator = op;
    secondNumber = firstNumber;
    firstNumber = '';
});

//Reset key
resetKey.addEventListener('click', button => {
    reset();
    updateDisplay()
});
const reset = (() => {
    firstNumber = '';
    secondNumber = '';
    result = '';
    operator = undefined;
});

//Delete Key
deleteKey.addEventListener('click', button => {
    deleteLastDigit();
    updateDisplay();
});
const deleteLastDigit = (() => firstNumber = firstNumber.toString().slice(0, -1));

//Equal Key
equalKey.addEventListener('click', button => {
    operate();
    updateDisplay();
});

const roundResult = (num => Math.round(num * 1000) / 1000);

function operate(){
    const firstNum = parseFloat(firstNumber);
    const secondNum = parseFloat(secondNumber);
    if(isNaN(firstNum) || isNaN(secondNum)) return;
    switch(operator){
        case '+':
            result = add(firstNum,secondNum);
            break;
        case '-':
            result = subtract(firstNum,secondNum);
            break;
        case '*':
            result = multiply(firstNum,secondNum);
            break;
        case '/':
            if(firstNum == '0' && secondNum == '0'){
                alert("0 can't be divided");
                clear();
            };
            result = divide(firstNum, secondNum);
            break;
        default:
            return null;
    }
    firstNumber = roundResult(result);
    secondNumber = '';
    operator = undefined;
};

function updateDisplay(){
    numberDisplay.innerText = firstNumber;
    if(operator != null){
        calculationDisplay.innerHTML = `${secondNumber}<span class='operator'>${operator}</span>${firstNumber}`;
    }else{
        calculationDisplay.innerText = '';
    }
};

//Keyboard inputclearInterval()
window.addEventListener('keydown', function keyboardData(e){
    switch(e.key){
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
            appendNumber(e.key);
            updateDisplay();
            break;
        case '+':
        case '*':
        case '/':
        case '-':
            chooseOperator(e.key);
            updateDisplay();
            break;
        case '=':
        case 'Enter':
            operate();
            updateDisplay();
            break;
        case 'Backspace':
            deleteLastDigit();
            updateDisplay();
            break;
        case 'Escape':
            reset();
            updateDisplay();
            break;
        default:
            alert('Invalid Input')
            break;
    }
});

