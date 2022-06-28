//Deceleration of HTML Elements
const elementOfIndex = document.getElementById("num1");
const calculateButton = document.getElementById("btn1");
const elementOfResult = document.getElementById("num2");
const loadingSpinner = document.getElementById("spinner");
const validFeedback = document.getElementById("validationFeedback1");
const calcRes = document.getElementById("resultsOfCalculations");

//On a refresh of the page, the list of results will be displayed
getFibonacciResults().then(arrayOfResponses => displayResults(arrayOfResponses));

//Calculation button
calculateButton.addEventListener("click", putResults);

function putResults() {
    loadingSpinner.classList.remove("visually-hidden");
    elementOfIndex.classList.remove("is-invalid");
    elementOfIndex.classList.remove("text-danger");
    elementOfResult.classList.remove("text-danger");
    elementOfResult.innerHTML = "";
    if (elementOfIndex.value > 50) {
        elementOfIndex.classList.add("is-invalid");
        elementOfIndex.classList.add("text-danger");
        validFeedback.innerText = "Can't be larger than 50";
        loadingSpinner.classList.add("visually-hidden");
    } else if (elementOfIndex.value === "") {
        elementOfIndex.classList.add("is-invalid");
        validFeedback.innerText = "Can't be empty";
        loadingSpinner.classList.add("visually-hidden");
    } else {
        elementOfResult.classList.remove("fs-5");
        getFibonacciFromServer(elementOfIndex.value)
            .then(result => {
                if (parseInt(elementOfIndex.value) === 42) {
                    elementOfResult.classList.add("text-danger");
                    elementOfResult.classList.add("fs-5");
                }
                elementOfResult.innerHTML = `&nbsp;<u><b>${result}</b></u>`;
                loadingSpinner.classList.add("visually-hidden");
            });
        getFibonacciResults().then(arrayOfResponses => addFibonacciResult(arrayOfResponses));
    }
};

function getFibonacciFromServer(num) {
    let FIBONACCI_URL = `http://localhost:5050/fibonacci/${num}`;
    return fetch(FIBONACCI_URL)
        .then(function (response) {
            if (response.status === 200) {
                return response.json();
            } else {
                return response.text();
            }
        })
        .then(function (data) {
            if (typeof data === 'object') {
                return data.result;
            }
            return data;
        })
        .catch(function (error) {
            return error;
        })
};

function getFibonacciResults() {
    const FIBONACCI_RESULT_URL = `http://localhost:5050/getFibonacciResults`;
    return fetch(FIBONACCI_RESULT_URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let arrayOfResponses = data.results;
            arrayOfResponses.sort(function (firstObj, lastObj) { return lastObj.createdDate - firstObj.createdDate });
            return arrayOfResponses;
        })
};

function displayResults(array) {
    let itemDate;
    let currentItem;
    for (let i = 0; i < 10; i++) {
        itemDate = new Date(array[i].createdDate);
        currentItem = array[i];
        calcRes.innerHTML += `<span class="fs-5 border-bottom pb-3 border-secondary">&nbsp;The Fibonacci of <b>${currentItem.number}</b> is <b>${currentItem.result}</b>. Calculated at: ${itemDate}</span>`;
    }
};

function addFibonacciResult(array) {
    let itemDate = new Date(array[0].createdDate);
    let currentItem = array[0];
    calcRes.innerHTML = `<span class="fs-5 border-bottom pb-3 border-secondary">&nbsp;The Fibonacci of <b>${currentItem.number}</b> is <b>${currentItem.result}</b>. Calculated at: ${itemDate}</span>` + calcRes.innerHTML;
};