import { CLEAR, CLICK_EVENT } from "./constants";
import { add, divide, multiply, operate, subtract } from "./utils";

let operator: string | undefined;
let firstOperand: number | undefined;
let secondOperand: number | undefined;
let result: number | undefined;
let screen = document.querySelector(".screen");

function resetComputationElements() {
  result = firstOperand = secondOperand = operator = undefined;
}

function addClearBtnEvent(clearBtn: HTMLButtonElement) {
  clearBtn.addEventListener(CLICK_EVENT, () => {
    if (screen != null) {
      screen.textContent = "";
    }

    resetComputationElements();
  });
}

function addNumberBtnEvent(numberBtn: HTMLButtonElement) {
  numberBtn.addEventListener(CLICK_EVENT, () => {
    if (screen == null) return;

    if (firstOperand === undefined || result !== undefined) {
      if (result !== undefined) resetComputationElements();

      screen.textContent = numberBtn.textContent;
      firstOperand = Number(screen.textContent);
      return;
    }

    if (firstOperand !== undefined && operator === undefined) {
      screen.textContent += numberBtn.textContent;
      firstOperand = Number(screen.textContent);
    }

    if (operator !== undefined) {
      if (secondOperand === undefined) {
        screen.textContent = numberBtn.textContent;
      } else {
        screen.textContent += numberBtn.textContent;
      }

      secondOperand = Number(screen.textContent);
    }
  });
}

function handleResultBtn() {
  if (firstOperand == undefined || secondOperand == undefined) {
    return;
  }

  if (
    result === undefined &&
    firstOperand !== undefined &&
    secondOperand !== undefined &&
    operator !== undefined
  ) {
    if (screen == null) return;

    result = operate(firstOperand, secondOperand, operator);
    if (secondOperand === 0 && operator === "/") {
      screen.textContent = "Cannot divide by zero";
    } else {
      screen.textContent = `${result}`;
    }

    resetComputationElements();
  }
}

function addComputationBtnEvent(computationBtn: HTMLButtonElement) {
  if (computationBtn.textContent === "=") {
    computationBtn.addEventListener(CLICK_EVENT, handleResultBtn);
    return;
  }

  computationBtn.addEventListener(CLICK_EVENT, () => {
    if (firstOperand !== undefined && secondOperand === undefined) {
      operator = computationBtn.textContent;
      return;
    }

    if (screen == null) return;

    if (Number(screen.textContent) === Infinity) {
      return;
    }

    if (
      firstOperand === undefined &&
      secondOperand === undefined &&
      operator === undefined &&
      Number(screen.textContent) !== Infinity
    ) {
      firstOperand = Number(screen.textContent);
      operator = computationBtn.textContent;
      return;
    }

    if (
      firstOperand !== undefined &&
      secondOperand !== undefined &&
      operator !== undefined
    ) {
      const tempResult = operate(firstOperand, secondOperand, operator);
      if (secondOperand === 0 && operator === "/") {
        screen.textContent = "Cannot divide by zero";
      } else {
        screen.textContent = `${tempResult}`;
      }

      resetComputationElements();
      if (tempResult === Infinity) return;

      firstOperand = tempResult;
      operator = computationBtn.textContent;
    }
  });
}

function main() {
  let mathComputation = new Map<string, Function>();
  mathComputation.set("+", add);
  mathComputation.set("-", subtract);
  mathComputation.set("*", multiply);
  mathComputation.set("/", divide);

  let btns = document.querySelectorAll("button");
  for (let i = 0; i < btns.length; i++) {
    const buttonContent = btns[i].textContent;
    if (buttonContent == CLEAR) {
      addClearBtnEvent(btns[i]);
      continue;
    }

    const parsedInt = parseInt(buttonContent);
    const isInteger = Number.isInteger(parsedInt);
    if (isInteger == true) {
      addNumberBtnEvent(btns[i]);
      continue;
    }

    addComputationBtnEvent(btns[i]);
  }
}

main();

export {};
