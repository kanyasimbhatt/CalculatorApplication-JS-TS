import { Calculator } from "../newscript";
export function handleMC() {
  localStorage.removeItem("calculationOutput");
}

//added to handle single memory operation
export function handleMR(this: Calculator): void {
  let val = localStorage.getItem("calculationOutput");
  if (val) this.calculatorInput.value += val;
}

export function handleMplusAndMinus(this: Calculator, ref: EventTarget) {
  console.log("function called");

  let previousOutput = localStorage.getItem("calculationOutput");
  let num = eval(this.resultFuncInitialEvaluation(this.calculatorInput.value));
  let classname: string = "";
  if ("className" in ref) {
    classname = ref.className as string;
  }

  let val =
    classname === "plus"
      ? `${+num + +previousOutput!}`
      : `${+num - +previousOutput!}`;

  localStorage.setItem("calculationOutput", val);
  this.calculatorInput.value = val;
}

export function handleMS(this: Calculator) {
  let num = eval(this.resultFuncInitialEvaluation(this.calculatorInput.value));
  localStorage.setItem("calculationOutput", num);
}
