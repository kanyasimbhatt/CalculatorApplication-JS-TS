export function fact(num: number) {//this
    let factOutput = 1;
    for (let i = 2; i <= num; i++) {
      factOutput *= i;
    }
    return factOutput;
  }

export function conversionBetweenDegRad(value:number) {//this
    if (
      document.getElementsByClassName("deg-rad-button")[0].textContent === "DEG"
    ) {
      return (value * Math.PI) / 180;
    } else {
      return value;
    }
  }