const rowOne = document.querySelector('#row-1');
const rowTwo = document.querySelector('#row-2');
const maximumRowOneLength = 34;
const maximumRowTwoLength = 21;
const maximumFirstTermLength = maximumRowTwoLength - 4;
const operators = /[+−×÷]/;

let answer;
let firstTerm;
let operator;
let secondTerm;
let operationCount = 0;


const buttons = document.querySelectorAll('.keypad-button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        switch(true) {
            case isButtonOfClass(button.classList, 'number'):
                if(rowTwo.textContent.length < maximumRowTwoLength) {
                    rowTwo.textContent += button.textContent;
                }
                break;
            case isButtonOfClass(button.classList, 'decimal'):
                if(isDecimalAllowed(rowTwo.textContent)) {
                    rowTwo.textContent += button.textContent;
                }
                break;
            case isButtonOfClass(button.classList, 'operator'):
                if(rowTwo.textContent.length < maximumFirstTermLength && rowTwo.textContent.length > 0) {
                    rowTwo.textContent += ` ${button.textContent} `;
                }
                break;
            case isButtonOfClass(button.classList, 'equals'):
                if(rowTwo.textContent.trim().split(' ').length == 3) {
                    firstTerm = +rowTwo.textContent.split(' ')[0]
                    operator = rowTwo.textContent.split(' ')[1];
                    secondTerm = +rowTwo.textContent.split(' ')[2];
                    answer = operate(firstTerm, operator, secondTerm);

                    rowOne.textContent = answer.toLocaleString();
                    firstTerm = answer;
                }
                break;
        }
    })
})

function isButtonOfClass(classList, targetClass) {
    return Object.values(classList).findIndex((buttonClass) => buttonClass == targetClass) > 0
}

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return (b != 0) ? a / b : 'error'
}

function operate(firstTerm, operator, secondTerm) {
    switch(operator) {
        case '+':
            return add(firstTerm, secondTerm)
        case '−':
            return subtract(firstTerm, secondTerm)
        case '×':
            return multiply(firstTerm, secondTerm)
        case '÷':
            return divide(firstTerm, secondTerm)
    }
}

function isDecimalAllowed(rowTwoText) {
    currentNumber = rowTwoText.split(' ').at(-1);
    return !currentNumber.includes('.')
}

//DONT USE ANS, DISPLAY THE ANSWER EXPLICITLY AS THE FIRST TERM