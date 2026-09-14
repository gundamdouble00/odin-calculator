export function add(a: number, b: number) {
  return a + b;
}

export function subtract(a: number, b: number) {
  return a - b;
}

export function multiply(a: number, b: number) {
  return a * b;
}

export function divide(a: number, b: number) {
  return Number((a / b).toFixed(2));
}

export function operate(
  firstOperand: number,
  secondOperand: number,
  operator: string,
) {
  if (operator === "+") return add(firstOperand, secondOperand);
  if (operator === "-") return subtract(firstOperand, secondOperand);
  if (operator === "*") return multiply(firstOperand, secondOperand);
  if (operator === "/") return divide(firstOperand, secondOperand);
}
