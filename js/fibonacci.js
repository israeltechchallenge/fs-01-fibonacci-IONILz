const elementOfIndex = document.getElementById("num1");
const calculateButton = document.getElementById("btn1");
const elementOfResult = document.getElementById("num2");
let chosenFibonacci;

elementOfIndex.addEventListener("input", changeFibonacciIndex);
calculateButton.addEventListener("click", putYOfFibonacci);

function getFibonacci(x) {
    if (x <= 0) {
        return 0;
    } else if (x === 1) {
        return 1;
    } else {
        let arrOfFibonacci = [0, 1];
        for (let index = 2; index < x + 2; index++) {
            arrOfFibonacci[index] = arrOfFibonacci[index - 2] + arrOfFibonacci[index - 1];
        }
        // Result of Fibonacci = arrOfFibonacci[x] = y
        return arrOfFibonacci[x];
    }
};

function changeFibonacciIndex() {
    chosenFibonacci = elementOfIndex.value;
};

function putYOfFibonacci() {
    elementOfResult.innerHTML = `<u><b>${getFibonacci(chosenFibonacci)}</b></u>`;
};