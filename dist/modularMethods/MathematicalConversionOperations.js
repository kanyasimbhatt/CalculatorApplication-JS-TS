export function fact(num) {
    let factOutput = 1;
    for (let i = 2; i <= num; i++) {
        factOutput *= i;
    }
    return factOutput;
}
export function conversionBetweenDegRad(value) {
    if (document.getElementsByClassName("deg-rad-button")[0].textContent === "DEG") {
        return (value * Math.PI) / 180;
    }
    else {
        return value;
    }
}
