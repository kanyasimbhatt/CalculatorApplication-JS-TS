import { htmlElement } from "./CommonElements";
function handleClosingHistorySection() {
    document.getElementsByClassName("text-box")[0].style.display = "flex";
    document.getElementsByClassName("advanced-operations")[0].style.display = "block";
    document.getElementsByClassName("calculator-buttons")[0].style.display = "grid";
    document.getElementsByClassName("close-history")[0].remove();
    document.getElementsByClassName("history-section")[0].remove();
}
//added to handle the scenario where user clicks on see history button
export function handleHistory() {
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
    showHistoryContent.call(this);
}
//added to implement feature -  user clicks on a particular history the data is automatically added to calculator input
export function handleClickOnHistoryData(value) {
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
//added to show the basic history content in the history page
function showHistoryContent() {
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
        element.addEventListener("click", () => {
            if ("id" in element)
                handleClickOnHistoryData.call(this, element.id);
        });
    });
    document
        .getElementsByClassName("clear-history-button")[0]
        .addEventListener("click", () => {
        handleClearHistory.call(this);
    });
}
//handle the scenario when user clicks on clear button in the see history page
function handleClearHistory() {
    localStorage.setItem("history-array", JSON.stringify([]));
    showHistoryContent.call(this);
}
