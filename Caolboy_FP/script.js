document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '0';
    let operator = '';
    let firstOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.hasAttribute('data-num')) {
                handleNumber(button.getAttribute('data-num'));
            } else if (button.hasAttribute('data-operator')) {
                handleOperator(button.getAttribute('data-operator'));
            } else if (button.id === 'clear') {
                handleClear();
            } else if (button.id === 'equals') {
                handleEquals();
            }
        });
    });

    function handleNumber(num) {
        currentInput = currentInput === '0' ? num : currentInput + num;
        display.innerText = currentInput;
    }

    function handleOperator(op) {
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else {
            firstOperand = calculate(firstOperand, parseFloat(currentInput), operator);
            display.innerText = firstOperand;
        }
        operator = op;
        currentInput = '';
    }

    function handleEquals() {
        if (firstOperand !== null && operator && currentInput) {
            currentInput = calculate(firstOperand, parseFloat(currentInput), operator).toString();
            display.innerText = currentInput;
            firstOperand = null;
            operator = '';
            currentInput = '0';
        }
    }

    function handleClear() {
        currentInput = '0';
        firstOperand = null;
        operator = '';
        display.innerText = currentInput;
    }

    function calculate(first, second, operator) {
        switch (operator) {
            case '+': return first + second;
            case '-': return first - second;
            case '*': return first * second;
            case '/': return first / second;
            default: return second;
        }
    }
});