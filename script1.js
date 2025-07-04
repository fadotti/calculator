const rowOne = document.querySelector('#row-1');
const rowTwo = document.querySelector('#row-2');
const maximumRowTwoLength = 21;
const maximumFirstTermLength = maximumRowTwoLength - 4
const maximumIntegerPartLength = 13;

let answer;
let firstTerm;
let operator;
let secondTerm;

const buttons = document.querySelectorAll('.keypad-button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        switch(true) {
            case isButtonOfClass(button.classList, 'number'):
                if(rowTwo.textContent.length < maximumRowTwoLength && isIntegerPartBounded(rowTwo.textContent)) {
                    rowTwo.textContent += button.textContent;
                }
                break;
            case isButtonOfClass(button.classList, 'decimal'):
                if(isDecimalAllowed(rowTwo.textContent)) {
                    rowTwo.textContent += button.textContent;
                }
                break;
            case isButtonOfClass(button.classList, 'operator'):
                switch(button.textContent) {
                    case '−':
                        if(rowTwo.textContent.length == 0) {
                            rowTwo.textContent += '-';
                        } else if(numberOfSpacesInDisplay(rowTwo.textContent) == 2 && numberOfDigitsInSecondTerm(rowTwo.textContent) == 0) {
                            rowTwo.textContent += '-';
                        } else if(!isSecondTermEqualTo('-', rowTwo.textContent)) {
                            if(rowTwo.textContent.length < maximumFirstTermLength && rowTwo.textContent.length > 0 
                                && numberOfSpacesInDisplay(rowTwo.textContent) < 2) {
                                rowTwo.textContent += ` ${button.textContent} `;
                            } else if(rowTwo.textContent.length > 0 && numberOfSpacesInDisplay(rowTwo.textContent) == 2) {
                                firstTerm = +rowTwo.textContent.split(' ')[0]
                                operator = rowTwo.textContent.split(' ')[1];
                                secondTerm = +rowTwo.textContent.split(' ')[2];
                                answer = operate(firstTerm, operator, secondTerm);
                                
                                if(!isNaN(answer)) {
                                    if(isIntegerPartOfAnswerBounded(`${answer}`)) {
                                        answer = parseFloat(answer.toFixed(3));
                                        rowOne.textContent = answer.toLocaleString();
                                        rowTwo.textContent = `${answer} ${button.textContent} `;
                                    } else {
                                        rowOne.textContent = (answer < 0) ? '-Inf' : 'Inf';
                                    }
                                } else {
                                    rowOne.textContent = answer;
                                }
                            }                           
                        }
                        break;
                    default:
                        if(rowTwo.textContent.length < maximumFirstTermLength && rowTwo.textContent.length > 0 
                            && numberOfSpacesInDisplay(rowTwo.textContent) < 2) {
                            rowTwo.textContent += (isButtonTextEqualTo('EXP', button.textContent)) ? ' ^ ' : ` ${button.textContent} `;
                        } else if(rowTwo.textContent.length > 0 && numberOfSpacesInDisplay(rowTwo.textContent) == 2) {
                            firstTerm = +rowTwo.textContent.split(' ')[0]
                            operator = rowTwo.textContent.split(' ')[1];
                            secondTerm = +rowTwo.textContent.split(' ')[2];
                            answer = operate(firstTerm, operator, secondTerm);
                            
                            if(!isNaN(answer)) {
                                if(isIntegerPartOfAnswerBounded(`${answer}`)) {
                                    answer = parseFloat(answer.toFixed(3));
                                    rowOne.textContent = answer.toLocaleString();
                                    rowTwo.textContent = (isButtonTextEqualTo('EXP', button.textContent)) ? `${answer} ^ ` : `${answer} ${button.textContent} `;
                                } else {
                                    rowOne.textContent = (answer < 0) ? '-Inf' : 'Inf';
                                }
                            } else {
                                rowOne.textContent = answer;
                            }
                        }
                        break;
                }
                break;
            case isButtonOfClass(button.classList, 'equals'):
                if(rowTwo.textContent.trim().split(' ').length == 3) {
                    firstTerm = +rowTwo.textContent.split(' ')[0]
                    operator = rowTwo.textContent.split(' ')[1];
                    secondTerm = +rowTwo.textContent.split(' ')[2];
                    answer = operate(firstTerm, operator, secondTerm);

                    if(!isNaN(answer)) {
                        if(isIntegerPartOfAnswerBounded(`${answer}`)) {
                            answer = parseFloat(answer.toFixed(3));
                            rowOne.textContent = answer.toLocaleString();
                        } else {
                            rowOne.textContent = (answer < 0) ? '-Inf' : 'Inf';
                        }
                    } else {
                        rowOne.textContent = answer;
                    }
                }
                break;
            case isButtonOfClass(button.classList, 'all-clear'):
                rowOne.textContent = '0';
                rowTwo.textContent = '';
                break;
        }
    })
})

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
    return (b != 0) ? a / b : 'Undefined, please clear the display'
}

function exponentiate(a, b) {
    return (!isNaN((a) ** (b)) && (a) ** (b) != Infinity && (a) ** (b) != -Infinity) ? (a) ** (b) : 'Undefined, please clear the display'
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
        case '^':
            return exponentiate(firstTerm, secondTerm)
    }
}

function isButtonOfClass(classList, targetClass) {
    return Object.values(classList).findIndex((buttonClass) => buttonClass == targetClass) > 0
}

function isDecimalAllowed(rowTwoText) {
    currentNumber = rowTwoText.split(' ').at(-1);
    return (!currentNumber.includes('.')) && (rowTwoText.length < maximumRowTwoLength - 1)
}

function numberOfSpacesInDisplay(rowTwoText) {
    return [...rowTwoText.matchAll(/ /g)].length
}

function isIntegerPartBounded(rowTwoText) {
    const integerPartOfCurrentNumber = rowTwoText.split(' ').at(-1).split('.')[0];
    return integerPartOfCurrentNumber.length < maximumIntegerPartLength
}

function isIntegerPartOfAnswerBounded(answer) {
    const integerPartOfCurrentNumber = answer.split(' ').at(-1).split('.')[0];
    return integerPartOfCurrentNumber.length <= maximumIntegerPartLength
}

function numberOfDigitsInSecondTerm(rowTwoText) {
    return rowTwoText.split(' ').at(-1).length
}

function isSecondTermEqualTo(symbol, rowTwoText) {
    return symbol == rowTwoText.split(' ').at(-1)
}

function isButtonTextEqualTo(symbol, buttonText) {
    return symbol == buttonText
}