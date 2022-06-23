const elementOfIndex = document.getElementById("num1");
const calculateButton = document.getElementById("btn1");
const elementOfResult = document.getElementById("num2");

calculateButton.addEventListener("click", putYOfFibonacci);

function putYOfFibonacci() {
    getFibonacciFromServer(elementOfIndex.value);
};

function getFibonacciFromServer(num) {
    let FIBONACCI_URL = `http://localhost:5050/fibonacci/${num}`;
    fetch(FIBONACCI_URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            elementOfResult.innerHTML = `<u><b>${data.result}</b></u>`;
        });
};


