document.addEventListener('DOMContentLoaded', () => {
    const zeroNumber = document.getElementById('0-calculator');
    const oneNumber = document.getElementById('1-calculator');
    const twoNumber = document.getElementById('2-calculator');
    const threeNumber = document.getElementById('3-calculator');
    const fourNumber = document.getElementById('4-calculator');
    const fiveNumber = document.getElementById('5-calculator');
    const sixNumber = document.getElementById('6-calculator');
    const sevenNumber = document.getElementById('7-calculator');
    const eightNumber = document.getElementById('8-calculator');
    const nineNumber = document.getElementById('9-calculator');
    const addButton = document.getElementById('adding-calculator');
    const subtractButton = document.getElementById('subtraction-calculator');
    const multiplyButton = document.getElementById('multiplication-calculator');
    const divideButton = document.getElementById('division-calculator');
    const equalButton = document.getElementById('equals-calculator');
    const clearButton = document.getElementById('C-calculator');
    const procentButton = document.getElementById('procent-calculator');
    const changeButton = document.getElementById('change-symbol-calculator');
    const backButton = document.getElementById('backspace-calculator');
    const dotButton = document.getElementById('point-calculator');
    const display = document.getElementById('display');

    let currentInput = '';
    let previousInput = '';
    let operation = null;

    function appendNumber(number) {
        if (number === '.' && currentInput.includes('.')) return; 
        currentInput += number;
        updateDisplay();
    }

    function chooseOperation(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operation = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculate() {
        let computation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        currentInput = computation.toString();
        operation = undefined;
        previousInput = '';
        updateDisplay();
    }

    function updateDisplay() {
        if (currentInput === '') {
            display.textContent = '0';
        } else {
            display.textContent = currentInput;
        }
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        operation = null;
        updateDisplay();
    }

    function deleteLast() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }

    function changeSign() {
        if (currentInput === '') return;
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    }

    function calculatePercentage() {
        if (currentInput === '') return;
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
    }

    zeroNumber.addEventListener('click', () => appendNumber('0'));
    oneNumber.addEventListener('click', () => appendNumber('1'));
    twoNumber.addEventListener('click', () => appendNumber('2'));
    threeNumber.addEventListener('click', () => appendNumber('3'));
    fourNumber.addEventListener('click', () => appendNumber('4'));
    fiveNumber.addEventListener('click', () => appendNumber('5'));
    sixNumber.addEventListener('click', () => appendNumber('6'));
    sevenNumber.addEventListener('click', () => appendNumber('7'));
    eightNumber.addEventListener('click', () => appendNumber('8'));
    nineNumber.addEventListener('click', () => appendNumber('9'));
    dotButton.addEventListener('click', () => appendNumber('.'));
    addButton.addEventListener('click', () => chooseOperation('+'));
    subtractButton.addEventListener('click', () => chooseOperation('-'));
    multiplyButton.addEventListener('click', () => chooseOperation('*'));
    divideButton.addEventListener('click', () => chooseOperation('/'));
    equalButton.addEventListener('click', calculate);
    clearButton.addEventListener('click', clear);
    backButton.addEventListener('click', deleteLast);
    changeButton.addEventListener('click', changeSign);
    procentButton.addEventListener('click', calculatePercentage);
});
