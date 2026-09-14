// constants.ts
var CLICK_EVENT = "click";
var MATH_COMPUTATIONS = ["+", "-", "*", "/", "="];
var COMPUTATIONS = new Map;
COMPUTATIONS.set("+", "add");
COMPUTATIONS.set("-", "subtract");
COMPUTATIONS.set("*", "multiply");
COMPUTATIONS.set("/", "divide");
COMPUTATIONS.set("=", "result");
var CLEAR = "C";
var NUMBERS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "siz",
  "seven",
  "eight",
  "nine"
];

// utils.ts
function add(a, b) {
  return Number((a + b).toFixed(2));
}
function subtract(a, b) {
  return Number((a - b).toFixed(2));
}
function multiply(a, b) {
  return Number((a * b).toFixed(2));
}
function divide(a, b) {
  return Number((a / b).toFixed(2));
}
function operate(firstOperand, secondOperand, operator) {
  if (operator === "+")
    return add(firstOperand, secondOperand);
  if (operator === "-")
    return subtract(firstOperand, secondOperand);
  if (operator === "*")
    return multiply(firstOperand, secondOperand);
  if (operator === "/")
    return divide(firstOperand, secondOperand);
}

// app.ts
var operator;
var firstOperand;
var secondOperand;
var result;
var screen = document.querySelector(".screen");
function resetComputationElements() {
  result = firstOperand = secondOperand = operator = undefined;
}
function addClearBtnEvent(clearBtn) {
  clearBtn.addEventListener(CLICK_EVENT, () => {
    if (screen != null) {
      screen.textContent = "";
    }
    resetComputationElements();
  });
}
function addNumberBtnEvent(numberBtn) {
  numberBtn.addEventListener(CLICK_EVENT, () => {
    if (screen == null)
      return;
    if (firstOperand === undefined || result !== undefined) {
      if (result !== undefined)
        resetComputationElements();
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
  if (result === undefined && firstOperand !== undefined && secondOperand !== undefined && operator !== undefined) {
    if (screen == null)
      return;
    result = operate(firstOperand, secondOperand, operator);
    if (secondOperand === 0 && operator === "/") {
      screen.textContent = "Cannot divide by zero";
    } else {
      screen.textContent = `${result}`;
    }
    resetComputationElements();
  }
}
function addComputationBtnEvent(computationBtn) {
  if (computationBtn.textContent === "=") {
    computationBtn.addEventListener(CLICK_EVENT, handleResultBtn);
    return;
  }
  computationBtn.addEventListener(CLICK_EVENT, () => {
    if (firstOperand !== undefined && secondOperand === undefined) {
      operator = computationBtn.textContent;
      return;
    }
    if (screen == null)
      return;
    if (Number(screen.textContent) === Infinity) {
      return;
    }
    if (firstOperand === undefined && secondOperand === undefined && operator === undefined && Number(screen.textContent) !== Infinity) {
      firstOperand = Number(screen.textContent);
      operator = computationBtn.textContent;
      return;
    }
    if (firstOperand !== undefined && secondOperand !== undefined && operator !== undefined) {
      const tempResult = operate(firstOperand, secondOperand, operator);
      if (secondOperand === 0 && operator === "/") {
        screen.textContent = "Cannot divide by zero";
      } else {
        screen.textContent = `${tempResult}`;
      }
      resetComputationElements();
      if (tempResult === Infinity)
        return;
      firstOperand = tempResult;
      operator = computationBtn.textContent;
    }
  });
}
function main() {
  let btns = document.querySelectorAll("button");
  for (let i = 0;i < btns.length; i++) {
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
  document.addEventListener("keydown", (event) => {
    const keyName = event.key;
    const fakeClick = new Event("click");
    if (keyName === "C") {
      const clearBtn = document.querySelector("button.clear");
      clearBtn?.dispatchEvent(fakeClick);
      return;
    }
    if ("0" <= keyName && keyName <= "9") {
      const num = parseInt(keyName);
      const numberBtn = document.querySelector(`button.${NUMBERS[num]}`);
      numberBtn?.dispatchEvent(fakeClick);
      return;
    }
    if (MATH_COMPUTATIONS.includes(keyName)) {
      const resultBtn = document.querySelector(`button.${COMPUTATIONS.get(keyName)}`);
      resultBtn?.dispatchEvent(fakeClick);
    }
  });
}
main();
