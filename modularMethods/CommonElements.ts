export const htmlElement = {
  calculatorButtons: document.getElementsByClassName(
    "calculator-buttons"
  )[0] as HTMLElement,
  removeDataButton: document.getElementsByClassName("remove-data")[0],
  secondButtonOperation: document.getElementsByClassName("2nd-button")[0],
  trignometrySelectButton: document.getElementsByClassName("trig-func")[0],
  advanceSelectButton: document.getElementsByClassName("advance-func")[0],
  degRadButton: document.getElementsByClassName("deg-rad-button")[0],
  FEButton: document.getElementsByClassName("f-e-button")[0],
  viewHistoryButton: document.getElementsByClassName("view-history")[0],
  darkLightButton: document.getElementsByClassName("dark-light-button")[0],
  squareOperationButton: document.getElementsByClassName("square-button")[0],
  squareRootOperationButton:
    document.getElementsByClassName("square-root-button")[0],
  textBoxInput: document.getElementsByClassName("text-box")[0],
  advanceOperationsSection: document.getElementsByClassName(
    "advanced-operations"
  )[0],
  enclosingCalculatorDiv: document.getElementsByClassName(
    "enclosing-calculator"
  )[0],
  iconToRemoveData: document.getElementsByClassName("remove-data-icon")[0],
  iconForTrignometryFunction: document.getElementsByClassName(
    "trignometry-function-icon"
  )[0],
};
