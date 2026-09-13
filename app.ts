import { CLEAR, CLICK_EVENT } from "./constants";
import { add, divide, multiply, subtract } from "./utils";

let mathOperator: string | undefined;
let firstOperand, secondOperand: number | undefined;
let screen = document.querySelector(".screen");

function addClearBtnEvent(clearBtn: HTMLButtonElement) {
  clearBtn.addEventListener(CLICK_EVENT, () => {
    if (screen != null) {
      screen.textContent = "";
    }

    mathOperator = firstOperand = secondOperand = undefined;
  });
}

function addNumberBtnEvent(numberBtn: HTMLButtonElement) {
  numberBtn.addEventListener(CLICK_EVENT, () => {
    if (screen != null) {
      screen.textContent += numberBtn.textContent;
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
  }
}

main();

export {};
