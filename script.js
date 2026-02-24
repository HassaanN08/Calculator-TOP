const input = document.querySelector('.input');
const operatorBtns = document.querySelectorAll('.operator');
const numberBtnWrapper = document.querySelector('.numbers');
const decimalBtn = document.querySelector('.decimal')
const equalButton = document.querySelector('.equal');
const answer = document.querySelector('.answer');
const clearBtn = document.querySelector('.clear');
const delBtn = document.querySelector('.backspace');

let decimalClicked = false;

clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    answer.textContent = '0';
    input.textContent = null;
    decimalClicked = false;
})

delBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const currentVal = Array.from(input.textContent);
    
    if (currentVal.at(-2) == '+' || currentVal.at(-2) == '-' || currentVal.at(-2) == '*' || currentVal.at(-2) == '/') {
        input.textContent = currentVal
            .slice(0, -3)
            .join('');
        
        if (input.textContent.split(' ').at(-1).split('').includes('.')) {
            decimalClicked = true;
        } else {
            decimalClicked = false;
        }
    } else {
        if (currentVal.at(-1) == '.') {
            decimalClicked = false;
        }
        input.textContent = currentVal
            .slice(0, -1)
            .join('');
    }
})

for (let i = 9; i >=0; i--) {
    const numberBtn = document.createElement('button');
    numberBtn.setAttribute('value', i);
    numberBtn.classList.add(`button-${i}`, 'number-button');
    numberBtn.textContent = i;
    numberBtnWrapper.appendChild(numberBtn);
}

const numberBtns = document.querySelectorAll('.number-button');

const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    return a / b;
}

const operate = (ope, aStr, bStr) => {
    let a = parseFloat(aStr);
    let b = parseFloat(bStr);
    if (ope == '+') {
        return add(a, b);
    } else if (ope == '-') {
        return subtract(a, b);
    } else if (ope == '*') {
        return multiply(a, b);
    } else if (ope == '/') {
        if (b == 0) {
            return 'Yeah no.'
        } else {
            return divide(a, b);
        }
    }
}

const numberClickEventHandler = (e) => {
    e.preventDefault();
    if (input.textContent == 'NaN' || input.textContent == 'Yeah no.') {
        input.textContent = e.target.value;
    }

    input.textContent += e.target.value;
}

const decimalClickEventHandler = (e) => {
    e.preventDefault();
    if (input.textContent == 'NaN' || input.textContent == 'Yeah no.') {
        input.textContent = e.target.value;
    } else if (!decimalClicked) {
        input.textContent += e.target.value;
    }
    
    decimalClicked = true;
}

const operatorClickEventHandler = (e) => {
    e.preventDefault();
    let currentVal = input.textContent.split(' ');

    if (input.textContent == 'NaN' || input.textContent == 'Yeah no.') {
        input.textContent = ` ${e.target.value} `;
    } else if (['+', '-', '*', '/'].includes(currentVal.at(-2)) && !currentVal.at(-1)) {
        currentVal.splice(-2, 1, `${e.target.value}`);
        input.textContent = currentVal.join(' ');
    } else {
        input.textContent += ` ${e.target.value} `;
    }
    
    decimalClicked = false;
}

const equalToClickEventHandler = (e) => {
    e.preventDefault();

    const inputArr = input.textContent
        .split(' ')
        .map(item => (item || '0'));
    let prevNum;
    let nextNum;

    if (!['+', '-', '*', '/'].includes(inputArr[0])) {
        prevNum = inputArr[0];
    } else {
        prevNum = '0';
    }

    if (inputArr.length > 1) {
        for (let i = 0; i <= inputArr.length - 1; i++) {
            if (['+', '-', '*', '/'].includes(inputArr[i])) {
                if (i == inputArr.length - 1) {
                    nextNum = '0';
                } else {
                    nextNum = inputArr[i + 1];
                }
                let newNum = operate(inputArr[i], prevNum, nextNum);
                prevNum = newNum;
                console.log(prevNum);
            }
        }
    }

    input.textContent = prevNum;
    answer.textContent = prevNum;

    if (input.textContent.split('').includes('.')) {
            decimalClicked = true;
        } else {
            decimalClicked = false;
        }
}

numberBtns.forEach((numberBtn) => {
    numberBtn.addEventListener('click', numberClickEventHandler);
})

operatorBtns.forEach((operatorBtn) => {
    operatorBtn.addEventListener('click', operatorClickEventHandler);
})

equalButton.addEventListener('click', equalToClickEventHandler);

decimalBtn.addEventListener('click', decimalClickEventHandler);

const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Enter', 'Backspace', '.', 'Escape', '*', '+', '/', '-'];
const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

document.addEventListener('keydown', (e) => {

    if(allowedKeys.includes(e.key)) {
        e.preventDefault();
        if (numberKeys.includes(e.key)) {
            if (input.textContent == 'NaN' || input.textContent == 'Yeah no.') {
                input.textContent = e.key;
            }
            input.textContent += e.key;
        }

        if (e.key == '.') {
            if (input.textContent == 'NaN' || input.textContent == 'Yeah no.') {
                input.textContent = e.key;
            } else if (!decimalClicked) {
                input.textContent += e.key;
            }
            
            decimalClicked = true;
        }

        if (['*', '+', '/', '-'].includes(e.key)) {
            let currentVal = input.textContent.split(' ');

            if (input.textContent == 'NaN' || input.textContent == 'Yeah no.') {
                input.textContent = ` ${e.key} `;
            } else if (['+', '-', '*', '/'].includes(currentVal.at(-2)) && !currentVal.at(-1)) {
                currentVal.splice(-2, 1, `${e.key}`);
                input.textContent = currentVal.join(' ');
            } else {
                input.textContent += ` ${e.key} `;
            }
            
            decimalClicked = false;
        }

        if (e.key == 'Enter') {
            const inputArr = input.textContent
                .split(' ')
                .map(item => (item || '0'));
            let prevNum;
            let nextNum;

            if (!['+', '-', '*', '/'].includes(inputArr[0])) {
                prevNum = inputArr[0];
            } else {
                prevNum = '0';
            }

            if (inputArr.length > 1) {
                for (let i = 0; i <= inputArr.length - 1; i++) {
                    if (['+', '-', '*', '/'].includes(inputArr[i])) {
                        if (i == inputArr.length - 1) {
                            nextNum = '0';
                        } else {
                            nextNum = inputArr[i + 1];
                        }
                        let newNum = operate(inputArr[i], prevNum, nextNum);
                        prevNum = newNum;
                        console.log(prevNum);
                    }
                }
            }

            input.textContent = prevNum;
            answer.textContent = prevNum;

            if (input.textContent.split('').includes('.')) {
                decimalClicked = true;
            } else {
                decimalClicked = false;
            }
        }

        if (e.key == 'Backspace') {
            const currentVal = Array.from(input.textContent);

            if (currentVal.at(-2) == '+' || currentVal.at(-2) == '-' || currentVal.at(-2) == '*' || currentVal.at(-2) == '/') {
                input.textContent = currentVal
                    .slice(0, -3)
                    .join('');
                
                if (input.textContent.split(' ').at(-1).split('').includes('.')) {
                    decimalClicked = true;
                } else {
                    decimalClicked = false;
                }
            } else {
                if (currentVal.at(-1) == '.') {
                    decimalClicked = false;
                }
                input.textContent = currentVal
                    .slice(0, -1)
                    .join('');
            }
        }

        if (e.key == 'Escape') {
            answer.textContent = '0';
            input.textContent = null;
            decimalClicked = false;
        }
    }
})