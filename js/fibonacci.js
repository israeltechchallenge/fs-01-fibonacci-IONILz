//Deceleration of HTML Elements
const elementOfIndex = document.getElementById("num1");
const calculateButton = document.getElementById("btn1");
const elementOfResult = document.getElementById("num2");
const loadingSpinner = document.getElementById("spinner");
const validFeedback = document.getElementById("validationFeedback1");
const calcRes = document.getElementById("resultsOfCalculations");
const saveCalc = document.getElementById("save-calculation");
const sortSelectElement = document.getElementById("sort-results");

// =================================================================

//On a refresh of the page, the list of results will be displayed
getFibonacciResults().then(arrayOfResponses => sortResults(arrayOfResponses)).then(arrayOfResponses => displayResults(arrayOfResponses));

// =================================================================

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
    } else if (elementOfIndex.value < 0) {
        elementOfIndex.classList.add("is-invalid");
        validFeedback.innerText = "Can't be a negative value";
        loadingSpinner.classList.add("visually-hidden");
    } else if (elementOfIndex.value === "") {
        elementOfIndex.classList.add("is-invalid");
        validFeedback.innerText = "Can't be empty";
        loadingSpinner.classList.add("visually-hidden");
    } else {
        elementOfResult.classList.remove("fs-5");
        if (saveCalc.checked) {
            getFibonacciFromServer(elementOfIndex.value)
                .then(result => {
                    elementOfResult.innerHTML = `&nbsp;<u><b>${result}</b></u>`;
                    loadingSpinner.classList.add("visually-hidden");
                    if (parseInt(elementOfIndex.value) === 42) {
                        elementOfResult.classList.add("text-danger");
                        elementOfResult.classList.add("fs-5");
                    } else {
                        getFibonacciResults().then(arrayOfResponses => sortResults(arrayOfResponses)).then(arrayOfResponses => addFibonacciResult(arrayOfResponses));
                    }
                });
        } else {
            elementOfResult.innerHTML = `&nbsp;<u><b>${getFibonacci(elementOfIndex.value)}</b></u>`;
            loadingSpinner.classList.add("visually-hidden");
        }
    }
};

// =================================================================

//Sort menu
sortSelectElement.addEventListener("change", sortRes);
function sortRes() {
    calcRes.innerHTML = "";
    getFibonacciResults()
        .then(arrayOfResponses => sortResults(arrayOfResponses))
        .then(arrayOfResponses => displayResults(arrayOfResponses));
};

function sortResults(arrayToSort) {
    const myOption = sortSelectElement.options[sortSelectElement.selectedIndex];
    switch (myOption.value) {
        case "Number Asc":
            return arrayToSort.sort(function (firstObj, lastObj) { return firstObj.number - lastObj.number });
        case "Number Desc":
            return arrayToSort.sort(function (firstObj, lastObj) { return lastObj.number - firstObj.number });
        case "Date Asc":
            return arrayToSort.sort(function (firstObj, lastObj) { return firstObj.createdDate - lastObj.createdDate });
        case "Date Desc":
            return arrayToSort.sort(function (firstObj, lastObj) { return lastObj.createdDate - firstObj.createdDate });
    }
};

// =================================================================
async function getFibonacciFromServer(num) {
    try {
        const FIBONACCI_URL = `http://localhost:5050/fibonacci/${num}`;
        const response = await fetch(FIBONACCI_URL);
        if (response.ok) {
            const data = await response.json();
            return data.result;
        } else {
            throw response;
        }
    }
    catch (error) {
        const err = await error.text();
        return err;
    }
};

// function getFibonacciFromServer(num) {
//     let FIBONACCI_URL = `http://localhost:5050/fibonacci/${num}`;
//     return fetch(FIBONACCI_URL)
//         .then(function (response) {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 return response.text();
//             }
//         })
//         .then(function (data) {
//             if (typeof data === 'object') {
//                 return data.result;
//             }
//             return data;
//         })
//         .catch(function (error) {
//             return error.text();
//         })
// };

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
        return arrOfFibonacci[x];
    }
};

// =================================================================

async function getFibonacciResults() {
    const FIBONACCI_RESULT_URL = `http://localhost:5050/getFibonacciResults`;
    const response = await fetch(FIBONACCI_RESULT_URL);
    const data = await response.json();
    return data.results;
};

// function getFibonacciResults() {
//     const FIBONACCI_RESULT_URL = `http://localhost:5050/getFibonacciResults`;
//     return fetch(FIBONACCI_RESULT_URL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             let arrayOfResponses = data.results;
//             arrayOfResponses.sort(function (firstObj, lastObj) { return lastObj.createdDate - firstObj.createdDate });
//             return arrayOfResponses;
//         })
// };

function displayResults(array) {
    let itemDate;
    let currentItem;
    const desiredLength = 10;
    for (let i = 0; i < desiredLength; i++) {
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

// =================================================================