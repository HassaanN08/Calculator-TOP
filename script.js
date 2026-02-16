const input = document.querySelector('input');
const operatorBtns = document.querySelectorAll('.operator');
const numberBtnWrapper = document.querySelector('.numbers');
const equalButton = document.querySelector('.equal');
const answer = document.querySelector('.answer');
const clearBtn = document.querySelector('.clear');
const delBtn = document.querySelector('.backspace');

let firstNumber;
let operator;
let lastNumber;
let operatorClicked = false;
let equalSignClicked = false;

clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    firstNumber = null;
    lastNumber = null;
    operatorClicked = false;
    equalSignClicked = false;
    answer.textContent = '0';
    input.value = null;
})

delBtn.addEventListener('click', (e) => {
    e.preventDefault();
    input.value = input.value
        .split('')
        .slice(0, -1)
        .join('');
    
    console.log(input.value);
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
        return divide(a, b);
    }
}

const numberClickEventHandler = (e) => {
    e.preventDefault();
    if (!operatorClicked) {
        input.value += e.target.value;
        firstNumber = input.value;
        console.log(firstNumber);
    } else {
        input.value += e.target.value;
        const lastNumberArr = input.value.split(' ');
        lastNumber = lastNumberArr[lastNumberArr.length - 1];
        console.log(lastNumber);
        firstNumber = String(operate(operator, firstNumber, lastNumber));
        equalButton.addEventListener('click', equalToClickEventHandler);
    }
}

const operatorClickEventHandler = (e) => {
    e.preventDefault();
    if (firstNumber) {
        operatorClicked = true;
    }
    input.value += ` ${e.target.value} `;
    operator = e.target.value;
    console.log(operator);
}

const equalToClickEventHandler = (e) => {
    e.preventDefault;
    let value = firstNumber;
    answer.textContent = String(firstNumber);
    console.log(operate(operator, firstNumber, lastNumber));
    console.log(firstNumber);
    console.log(operator);
    console.log(lastNumber);
    input.value = value;
    equalButton.removeEventListener('click', equalToClickEventHandler);
}

numberBtns.forEach((numberBtn) => {
    numberBtn.addEventListener('click', numberClickEventHandler);
})

operatorBtns.forEach((operatorBtn) => {
    operatorBtn.addEventListener('click', operatorClickEventHandler);
})