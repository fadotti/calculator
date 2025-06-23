const rowOne = document.querySelector('#row-1');
const rowTwo = document.querySelector('#row-2');
const maximumDisplayLength = 21;

rowTwo.textContent = '';

const buttons = document.querySelectorAll('.keypad-button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonType = button.classList;
        const buttonValue = button.textContent;
        switch(true) {
            case Object.values(buttonType).findIndex((buttonClass) => buttonClass == 'number') > 0:
                if(rowTwo.textContent.length < 21) {
                    rowTwo.textContent += buttonValue;
                }
        }
    })
})