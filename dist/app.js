// constants.ts
var CLICK_EVENT = "click";
var CLEAR = "C";

// utils.ts
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

// app.ts
var screen = document.querySelector(".screen");
function addClearBtnEvent(clearBtn) {
  clearBtn.addEventListener(CLICK_EVENT, () => {
    if (screen != null) {
      screen.textContent = "";
    }
  });
}
function addNumberBtnEvent(numberBtn) {
  numberBtn.addEventListener(CLICK_EVENT, () => {
    if (screen != null) {
      screen.textContent += numberBtn.textContent;
    }
  });
}
function main() {
  let mathComputation = new Map;
  mathComputation.set("+", add);
  mathComputation.set("-", subtract);
  mathComputation.set("*", multiply);
  mathComputation.set("/", divide);
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
    btns[i].addEventListener("click", () => {
      console.log(btns[i].textContent);
    });
  }
}
main();
