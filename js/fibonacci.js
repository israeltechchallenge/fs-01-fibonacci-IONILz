const elementOfIndex = document.getElementById("num1");
const calculateButton = document.getElementById("btn1");
const elementOfResult = document.getElementById("num2");
const loadingSpinner = document.getElementById("spinner");

calculateButton.addEventListener("click", putYOfFibonacci);

function putYOfFibonacci() {
    elementOfIndex.classList.remove("is-invalid");
    elementOfIndex.classList.remove("text-danger");
    elementOfResult.classList.remove("text-danger");
    if (elementOfIndex.value > 50) {
        elementOfResult.innerHTML = "";
        elementOfIndex.classList.add("is-invalid");
        elementOfIndex.classList.add("text-danger");
    } else {
        getFibonacciFromServer(elementOfIndex.value);
    }
};

function getFibonacciFromServer(num) {
    elementOfResult.innerHTML = "";
    loadingSpinner.classList.remove("visually-hidden");
    elementOfResult.classList.remove("fs-5");
    let FIBONACCI_URL = `http://localhost:5050/fibonacci/${num}`;
    fetch(FIBONACCI_URL)
        .then(function (response) {
            if (response.statusText === "OK") {
                return response.json();
            } else {
                elementOfResult.innerHTML = `&nbsp;Server Error: 42 is the meaning of life`;
                elementOfResult.classList.add("fs-5");
                throw response;
            }
        })
        .then(function (data) {
            if (data) {
                elementOfResult.innerHTML = `&nbsp;<u><b>${data.result}</b></u>`;
                loadingSpinner.classList.add("visually-hidden");
            }
        })
        .catch(function (error) {
            if (error) {
                elementOfResult.classList.add("text-danger");
                loadingSpinner.classList.add("visually-hidden");
            }
        })
};

// function getFibonacciFromServer(num) {
//     loadingSpinner.classList.remove("visually-hidden");
//     let FIBONACCI_URL = `http://localhost:5050/fibonacci/${num}`;
//     fetch(FIBONACCI_URL)
//         .then(function (response) {
//             console.log(response);
//             if (!response.ok) {
//                 console.log(response.value);
//                 elementOfResult.classList.add("text-danger");
//                 elementOfResult.innerHTML = `&nbsp;${response.statusText}`;
//                 loadingSpinner.classList.add("visually-hidden");
//             } else {
//                 return response.json();
//             }
//         })
//         .then(function (data) {
//             elementOfResult.innerHTML = `&nbsp;<u><b>${data.result}</b></u>`;
//             loadingSpinner.classList.add("visually-hidden");
//         })
// };