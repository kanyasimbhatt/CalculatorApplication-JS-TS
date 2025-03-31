export function handleMC() {
    localStorage.removeItem("calculationOutput");
}
//added to handle single memory operation
export function handleMR() {
    let val = localStorage.getItem("calculationOutput");
    if (val)
        this.calculatorInput.value += val;
}
export function handleMplusAndMinus(ref) {
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
export function handleMS() {
    let num = eval(this.resultFuncInitialEvaluation(this.calculatorInput.value));
    localStorage.setItem("calculationOutput", num);
}
