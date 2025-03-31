export function opInclude(str: string, opArr: string[]) {
  for (let i of opArr) {
    if (str.includes(i)) return true;
  }
  return false;
}
