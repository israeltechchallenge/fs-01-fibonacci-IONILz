const elementOfIndex = document.getElementById("num1");
const elementOfResult = document.getElementById("num2");
let chosenFibonacci = 13;

// Another function
// function getFibonacci(x) {
//     if (x === 0) {
//         return 0;
//     } else if (x === 1) {
//         return 1;
//     } else {
//         let arrOfFibonacci = [0, 1];
//         for (let index = 0; index < x - 1; index++) {
//             arrOfFibonacci[arrOfFibonacci.length] = arrOfFibonacci[arrOfFibonacci.length - 2] + arrOfFibonacci[arrOfFibonacci.length - 1];
//         }
//         return arrOfFibonacci[x];
//     }
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
        // Result of Fibonacci = arrOfFibonacci[x] = y
        return arrOfFibonacci[x];
    }
};

elementOfIndex.innerText = chosenFibonacci;
elementOfResult.innerText = getFibonacci(chosenFibonacci);