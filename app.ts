function add(a: number, b: number) {
  return a + b;
}

function subtract(a: number, b: number) {
  return a - b;
}

function multiply(a: number, b: number) {
  return a * b;
}

function divide(a: number, b: number) {
  return a / b;
}

let mathOperator: string;
let firstOperand: number;
let secondOperand: number;

function operate(mathComputation: Map<string, Function>) {
  let operation = mathComputation.get(mathOperator);
  return operation(firstOperand, secondOperand);
}

function main() {
  let mathComputation = new Map<string, Function>();
  mathComputation.set("add", add);
  mathComputation.set("subtract", subtract);
  mathComputation.set("multiply", multiply);
  mathComputation.set("divide", divide);
}

main();

export {};
