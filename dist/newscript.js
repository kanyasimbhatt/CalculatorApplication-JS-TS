import { fact } from "./modularMethods/MathematicalConversionOperations.js";
import { htmlElement } from "./modularMethods/CommonElements.js";
import { opInclude } from "./modularMethods/booleanOperation.js";
import { handleMC, handleClosingHistorySection, } from "./modularMethods/OperationsRelatedToMemory.js";
import { replaceAll, degreeRadianChange, } from "./modularMethods/ReplacingStringOperation.js";
class Calculator {
    constructor() {
        this.validKeyboardCharacters = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "+",
            "-",
            "/",
            "X",
            "%",
            "e",
            "^",
            ".",
            "(",
            ")",
        ];
        this.calculatorInput = document.querySelector(`.calculator-input`);
        this.secondOperationToggle = 0;
        this.calculatorInput.value = ``;
        this.regex = /d/;
        this.darkLightFlag = 0;
        htmlElement.calculatorButtons.addEventListener("click", (event) => {
            this.handleClickOnCalculator(event);
        });
        htmlElement.removeDataButton.addEventListener("click", () => {
            this.removeDataFromInput();
        });
        htmlElement.secondButtonOperation.addEventListener("click", (event) => {
            this.handleSecondSetOfOperations(event);
        });
        htmlElement.trignometrySelectButton.addEventListener("change", (event) => {
            if ("value" in event.target)
                this.handleTrignometryFunction(event.target.value);
        });
        htmlElement.advanceSelectButton.addEventListener("change", (event) => {
            if ("value" in event.target)
                this.handleAdvancedFunction(event.target.value);
        });
        htmlElement.degRadButton.addEventListener("click", (event) => {
            degreeRadianChange(event.target);
        });
        htmlElement.FEButton.addEventListener("click", (event) => {
            this.handleFractionToExponential(event);
        });
        document.getElementById("mc-button").addEventListener("click", () => {
            handleMC();
        });
        document.getElementById("mr-button").addEventListener("click", () => {
            this.handleMR();
        });
        document.querySelectorAll("#M-plus-minus-button").forEach((element) => {
            element.addEventListener("click", (event) => {
                this.handleMplusAndMinus(event.target);
            });
        });
        document.getElementById("ms-button").addEventListener("click", () => {
            this.handleMS();
        });
        htmlElement.viewHistoryButton.addEventListener("click", () => {
            this.handleHistory();
        });
        htmlElement.darkLightButton.addEventListener("click", () => {
            this.handleDarkLightMode();
        });
        document.addEventListener("keyup", (event) => {
            this.handleKeyboardInput(event);
        });
    }
    removeDataFromInput() {
        let inputVal = this.calculatorInput.value;
        if (inputVal === `ERROR`) {
            this.calculatorInput.value = ``;
        }
        else if (inputVal != ``) {
            this.calculatorInput.value = inputVal.slice(0, -1);
        }
    }
    //added to event delegate click event for all buttons
    handleClickOnCalculator(event) {
        let e = event.target;
        if (e.classList.value === "calculator-buttons")
            return;
        let val = e.textContent;
        if (e.className === "remove-data") {
            return;
        }
        val = val.trim(); //it automatically added some white space so had to add it to remove them
        switch (val) {
            case "=":
                this.resultFunc();
                break;
            case "C":
                this.calculatorInput.value = "";
                break;
            case `|x|`:
                this.calculatorInput.value += `|`;
                break;
            case `+/-`:
                this.signDegToggleFlagFunc();
                break;
            case `1/x`:
                this.handleDivisionToOne();
                break;
            case `x2`:
                this.calculatorInput.value += "^2";
                break;
            case `x3`:
                this.calculatorInput.value += `^3`;
                break;
            case "n!":
                this.calculatorInput.value += "!";
                break;
            case `10x`:
                this.handleTenRaiseToX();
                break;
            case "2nd":
                break;
            case `xy`:
                this.calculatorInput.value += "^";
                break;
            case `3√x`:
                this.handleRoot();
                break;
            case `2√x`:
                this.handleRoot();
                break;
            default:
                if (this.calculatorInput.value === "ERROR")
                    return;
                this.calculatorInput.value += val;
                if (val == `ln` || val == `log`)
                    this.calculatorInput.value += `(`;
        }
    }
    //added to handle the operation 1/x
    handleDivisionToOne() {
        this.regex = /(\d+)\.?(\d*)$/g;
        if (this.regex.test(this.calculatorInput.value)) {
            this.calculatorInput.value = this.calculatorInput.value.replace(this.regex, (match, num1, num2) => {
                if (num2)
                    return `1/${num1}.${num2}`;
                else
                    return `1/${num1}`;
            });
        }
        else
            this.calculatorInput.value += `1/`;
    }
    //added to handle operation 10^x
    handleTenRaiseToX() {
        this.regex = /(\d+)\.?(\d*)$/g;
        if (this.regex.test(this.calculatorInput.value)) {
            this.calculatorInput.value = this.calculatorInput.value.replace(this.regex, (match, num1, num2) => {
                if (num2)
                    return `10^${num1}.${num2}`;
                else
                    return `10^${num1}`;
            });
        }
        else {
            this.calculatorInput.value += "10^";
        }
    }
    //added to handle square root and cube root operation
    handleRoot() {
        this.regex = /(\d+)$/;
        if (this.regex.test(this.calculatorInput.value)) {
            this.calculatorInput.value = this.calculatorInput.value.replace(this.regex, (match, num) => {
                return `${num}X√(`;
            });
        }
        else {
            this.calculatorInput.value += "√(";
        }
    }
    //added as we have to switch the keyboard content from x2 - x3 and square root to cube root
    handleSecondSetOfOperations(e) {
        htmlElement.secondButtonOperation.classList.toggle("selected");
        if (this.secondOperationToggle === 0) {
            htmlElement.squareOperationButton.innerHTML = `x<sup>3</sup>`;
            htmlElement.squareRootOperationButton.innerHTML = `<sup>3</sup>&Sqrt;x`;
            this.secondOperationToggle = 1;
        }
        else {
            htmlElement.squareOperationButton.innerHTML = `x<sup>2</sup>`;
            htmlElement.squareRootOperationButton.innerHTML = `<sup>2</sup>&Sqrt;x`;
            this.secondOperationToggle = 0;
        }
    }
    //common result evaluation required for result operation
    resultFuncInitialEvaluation(newStr) {
        newStr = replaceAll(newStr, this.secondOperationToggle);
        if (this.calculatorInput.value.includes(`!`)) {
            this.regex = /(\d+)!/g;
            newStr = newStr.replace(this.regex, (_, num) => `${fact(+num)}`);
        }
        this.regex = /\|([^|]+)\|/;
        newStr = newStr.replace(this.regex, (match, num) => {
            let val = +eval(num);
            if (val < 0) {
                val = val * -1;
            }
            return `${val}`;
        });
        return newStr;
    }
    //added to induce the evaluation using eval function
    resultFunc() {
        try {
            let calculatorInputVal = this.calculatorInput.value;
            if (calculatorInputVal == ``)
                return;
            let newStr = this.resultFuncInitialEvaluation(calculatorInputVal);
            this.calculatorInput.value = eval(newStr);
            if (!localStorage.getItem("history-array")) {
                localStorage.setItem("history-array", JSON.stringify([]));
            }
            let arr = JSON.parse(localStorage.getItem("history-array"));
            arr.push([`${calculatorInputVal}`, `${this.calculatorInput.value}`]);
            localStorage.setItem("history-array", JSON.stringify(arr));
        }
        catch (err) {
            console.log(err);
            this.calculatorInput.value = `ERROR`;
        }
    }
    //used to handle the +/- operation
    signDegToggleFlagFunc() {
        let str = this.calculatorInput.value;
        if (str === "")
            return;
        let input = [];
        for (let a of str) {
            input.push(a);
        }
        let opArr = [`+`, `-`, `÷`, `X`];
        if (opInclude(str, opArr)) {
            let i;
            for (i = input.length - 1; i >= 0; i--) {
                if (opInclude(input[i], opArr)) {
                    break;
                }
            }
            if (input[i] == `-` && input[i - 1] == `(`) {
                input.splice(i - 1, 2);
                input.pop();
            }
            else {
                i++;
                input.splice(i, 0, `(`, `-`);
                input.push(`)`);
            }
        }
        else if (input[0] == `(` && input[1] == `-`) {
            input.splice(0, 2);
            input.splice(input.length - 1, 1);
        }
        else if (input[0] == `-`) {
            input.splice(0, 1);
        }
        else {
            input.unshift(`-`);
            input.unshift(`(`);
            input.push(`)`);
        }
        str = ``;
        for (let a of input) {
            str += a;
        }
        this.calculatorInput.value = str;
    }
    //added to handle the input status when a particular trignometry function is clicked on
    handleTrignometryFunction(funcName) {
        if (funcName === "Trignometry")
            return;
        this.regex = /(\d+)$/;
        if (this.regex.test(this.calculatorInput.value)) {
            this.calculatorInput.value += `X${funcName}(`;
        }
        else {
            this.calculatorInput.value += `${funcName}(`;
        }
        const trigElement = htmlElement.trignometrySelectButton;
        if ("value" in trigElement)
            trigElement.value = "Trignometry";
    }
    //added to handle the input status when a particular advanced function is clicked on
    handleAdvancedFunction(funcName) {
        if (funcName === "Function")
            return;
        this.regex = /(\d+)$/;
        if (this.regex.test(this.calculatorInput.value)) {
            this.calculatorInput.value += `X${funcName}(`;
        }
        else {
            this.calculatorInput.value += `${funcName}(`;
        }
        const functionElement = htmlElement.advanceSelectButton;
        if ("value" in functionElement)
            functionElement.value = "Function";
    }
    //added to handle f-e operation
    handleFractionToExponential(ref) {
        let newRegex = /(\d+)$/g;
        if (newRegex.test(this.calculatorInput.value)) {
            this.regex = /(\d+)\.?(\d*)$/g;
            this.calculatorInput.value = this.calculatorInput.value.replace(this.regex, (match, num1, num2) => {
                console.log(num1, " ", num2);
                if (num1 === "0" && num2 !== "0") {
                    return `${num2.replace(/^0+/, "") || "0"}X10^-${num2.length}`;
                }
                else {
                    if (num2 === "") {
                        let firstDigit = num1[0];
                        let remainingDigits = num1.slice(1, num1.length);
                        if (+remainingDigits === 0)
                            remainingDigits = "0";
                        return `${firstDigit}.${remainingDigits}X10^${num1.length - 1}`;
                    }
                    else
                        return `${num1}${num2}X10^-${num2.length}`;
                }
            });
        }
        else {
            return;
        }
    }
    //added to handle single memory operation
    handleMR() {
        let val = localStorage.getItem("calculationOutput");
        if (val)
            this.calculatorInput.value += val;
    }
    handleMplusAndMinus(ref) {
        console.log("function called");
        let previousOutput = localStorage.getItem("calculationOutput");
        let num = eval(this.resultFuncInitialEvaluation(this.calculatorInput.value));
        let classname = "";
        if ("className" in ref) {
            classname = ref.className;
        }
        let val = classname === "plus"
            ? `${+num + +previousOutput}`
            : `${+num - +previousOutput}`;
        localStorage.setItem("calculationOutput", val);
        this.calculatorInput.value = val;
    }
    handleMS() {
        let num = eval(this.resultFuncInitialEvaluation(this.calculatorInput.value));
        localStorage.setItem("calculationOutput", num);
    }
    //added to handle the scenario where user clicks on see history button
    handleHistory() {
        htmlElement.textBoxInput.style.display = "none";
        htmlElement.advanceOperationsSection.style.display =
            "none";
        htmlElement.calculatorButtons.style.display = "none";
        let closingHistoryButton = document.createElement("img");
        closingHistoryButton.setAttribute("class", "imageHW hamburger-menu close-history");
        if (this.darkLightFlag === 1) {
            closingHistoryButton.setAttribute("src", "../images/cross.png");
        }
        else {
            closingHistoryButton.setAttribute("src", "../images/x.png");
        }
        closingHistoryButton.setAttribute("alt", "closing history section button");
        closingHistoryButton.addEventListener("click", () => {
            handleClosingHistorySection();
        });
        htmlElement.enclosingCalculatorDiv.appendChild(closingHistoryButton);
        let newElement = document.createElement("div");
        newElement.setAttribute("class", "history-section");
        htmlElement.enclosingCalculatorDiv.appendChild(newElement);
        this.showHistoryContent();
    }
    //added to handle the scenario when user clicks on dark to light mode
    handleDarkLightMode() {
        htmlElement.darkLightButton.classList.toggle("selected");
        this.calculatorInput.classList.toggle("dark-calculator-input");
        document.body.classList.toggle("dark-body");
        htmlElement.enclosingCalculatorDiv.classList.toggle("dark-enclosing-calculator");
        htmlElement.darkLightButton.classList.toggle("selected");
        if (this.darkLightFlag === 0) {
            this.darkLightFlag = 1;
            htmlElement.viewHistoryButton.setAttribute("src", "../images/history1.png");
            htmlElement.darkLightButton.setAttribute("src", "../images/brightness-and-contrast1.png");
            htmlElement.iconToRemoveData.setAttribute("src", "../images/delete1.png");
            htmlElement.iconForTrignometryFunction.setAttribute("src", "../images/right-triangle1.png");
            document.querySelectorAll(".calculator-buttons > div").forEach((e) => {
                e.style.backgroundColor = "rgb(31, 32, 33)";
            });
            document.querySelectorAll("#calculator-buttons-numbers").forEach((e) => {
                e.style.backgroundColor = "black";
            });
            document
                .querySelectorAll(".trignometry-functions > div > select")
                .forEach((e) => {
                e.style.color = "white";
            });
        }
        else {
            this.darkLightFlag = 0;
            htmlElement.viewHistoryButton.setAttribute("src", "../images/history.png");
            htmlElement.darkLightButton.setAttribute("src", "../images/brightness-and-contrast.png");
            htmlElement.iconToRemoveData.setAttribute("src", "./images/delete.png");
            htmlElement.iconForTrignometryFunction.setAttribute("src", "../images/right-triangle.png");
            document.querySelectorAll(".calculator-buttons > div").forEach((e) => {
                e.style.backgroundColor = "rgb(248, 249, 250)";
            });
            document.querySelectorAll("#calculator-buttons-numbers").forEach((e) => {
                e.style.backgroundColor = "white";
            });
            document
                .querySelectorAll(".trignometry-functions > div > select")
                .forEach((e) => {
                e.style.color = "black";
            });
        }
    }
    //added to show the basic history content in the history page
    showHistoryContent() {
        document.getElementsByClassName("history-section")[0].innerHTML = `<div class = "history-title-clear-button">
          <div class = "history-title">History</div>
          <div class = "clear-history-button">
          
          <button class = "clear-history-button">Clear</button>
          </div>
          </div>`;
        let arr = JSON.parse(localStorage.getItem("history-array"));
        let historyHtmlCode = "";
        for (let i = arr.length - 1; i >= 0; i--) {
            historyHtmlCode += `<div class = "history-data" id = "${arr[i][1]}">
              <div>${arr[i][0]} &nbsp;= &nbsp;</div>
              <div>${arr[i][1]} </div>
          </div>`;
        }
        document.getElementsByClassName("history-section")[0].innerHTML +=
            historyHtmlCode;
        document.querySelectorAll(".history-data").forEach((element) => {
            element.addEventListener("click", (event) => {
                if ("id" in event.target)
                    this.handleClickOnHistoryData(event.target.id);
            });
        });
        document
            .getElementsByClassName("clear-history-button")[0]
            .addEventListener("click", () => {
            this.handleClearHistory();
        });
    }
    //handle the scenario when user clicks on clear button in the see history page
    handleClearHistory() {
        localStorage.setItem("history-array", JSON.stringify([]));
        this.showHistoryContent();
    }
    //added to implement feature -  user clicks on a particular history the data is automatically added to calculator input
    handleClickOnHistoryData(value) {
        handleClosingHistorySection();
        this.regex = /(\d+)$/;
        if (this.regex.test(this.calculatorInput.value)) {
            this.calculatorInput.value += `X`;
            this.calculatorInput.value += `${value}`;
        }
        else {
            this.calculatorInput.value += `${value}`;
        }
    }
    //added to induce keyboard input feature
    handleKeyboardInput(event) {
        let keyValue = "";
        if ("key" in event) {
            keyValue = event.key;
        }
        if (keyValue === "Backspace" || keyValue === "Delete") {
            this.calculatorInput.value = this.calculatorInput.value.slice(0, -1);
        }
        if (keyValue === "=" || keyValue === "Enter") {
            this.resultFunc();
        }
        if (this.validKeyboardCharacters.indexOf(keyValue) !== -1) {
            this.calculatorInput.value += keyValue;
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new Calculator();
});
