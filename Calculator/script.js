const displayElement = document.getElementById("display");
const historyElement = document.getElementById("history");
const buttons = Array.from(document.querySelectorAll(".btn"));
const themeToggle = document.querySelector("[data-theme-toggle]");

let currentValue = "0";
let previousValue = "";
let operation = null;
let justEvaluated = false;

function updateDisplay() {
  displayElement.textContent = currentValue || "0";
  const opSymbol = operation ? ` ${operation} ` : "";
  historyElement.textContent = previousValue ? `${previousValue}${opSymbol}` : "";
}

function clearAll() {
  currentValue = "0";
  previousValue = "";
  operation = null;
  justEvaluated = false;
  updateDisplay();
}

function deleteLast() {
  if (justEvaluated) {
    clearAll();
    return;
  }
  if (currentValue.length <= 1) {
    currentValue = "0";
  } else {
    currentValue = currentValue.slice(0, -1);
  }
  updateDisplay();
}

function appendNumber(value) {
  if (value === "." && currentValue.includes(".")) {
    return;
  }
  if (justEvaluated) {
    currentValue = value === "." ? "0." : value;
    justEvaluated = false;
    updateDisplay();
    return;
  }
  if (currentValue === "0" && value !== ".") {
    currentValue = value;
  } else {
    currentValue += value;
  }
  updateDisplay();
}

function chooseOperation(opSymbol) {
  if (currentValue === "Error") {
    return;
  }
  if (operation && !justEvaluated) {
    compute();
  }
  previousValue = currentValue;
  operation = opSymbol;
  justEvaluated = false;
  currentValue = "0";
  updateDisplay();
}

function compute() {
  if (!operation || previousValue === "") {
    return;
  }
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  if (Number.isNaN(prev) || Number.isNaN(current)) {
    return;
  }
  let result;
  if (operation === "+") {
    result = prev + current;
  } else if (operation === "−") {
    result = prev - current;
  } else if (operation === "×") {
    result = prev * current;
  } else if (operation === "÷") {
    if (current === 0) {
      result = "Error";
    } else {
      result = prev / current;
    }
  }
  if (typeof result === "number") {
    result = Number.isInteger(result) ? result.toString() : result.toFixed(6).replace(/\.?0+$/, "");
  }
  currentValue = String(result);
  previousValue = "";
  operation = null;
  justEvaluated = true;
  updateDisplay();
}

function handleButtonClick(e) {
  const button = e.currentTarget;
  const number = button.getAttribute("data-number");
  const op = button.getAttribute("data-operator");
  const action = button.getAttribute("data-action");
  if (number !== null) {
    appendNumber(number);
  } else if (op !== null) {
    chooseOperation(op);
  } else if (action === "clear") {
    clearAll();
  } else if (action === "delete") {
    deleteLast();
  } else if (action === "equals") {
    compute();
  }
}

function flashKey(button) {
  if (!button) {
    return;
  }
  button.classList.add("btn-key-highlight");
  setTimeout(() => {
    button.classList.remove("btn-key-highlight");
  }, 130);
}

function findButtonByKey(key) {
  if (key >= "0" && key <= "9") {
    return buttons.find(b => b.getAttribute("data-number") === key);
  }
  if (key === ".") {
    return buttons.find(b => b.getAttribute("data-number") === ".");
  }
  if (key === "+" || key === "-" || key === "*" || key === "/") {
    if (key === "+") {
      return buttons.find(b => b.getAttribute("data-operator") === "+");
    }
    if (key === "-") {
      return buttons.find(b => b.getAttribute("data-operator") === "−");
    }
    if (key === "*") {
      return buttons.find(b => b.getAttribute("data-operator") === "×");
    }
    if (key === "/") {
      return buttons.find(b => b.getAttribute("data-operator") === "÷");
    }
  }
  if (key === "Enter" || key === "=") {
    return buttons.find(b => b.getAttribute("data-action") === "equals");
  }
  if (key === "Backspace") {
    return buttons.find(b => b.getAttribute("data-action") === "delete");
  }
  if (key === "Escape" || key.toLowerCase() === "c") {
    return buttons.find(b => b.getAttribute("data-action") === "clear");
  }
  return null;
}

function handleKeydown(e) {
  const key = e.key;
  const button = findButtonByKey(key);
  if (!button) {
    return;
  }
  e.preventDefault();
  flashKey(button);
  const number = button.getAttribute("data-number");
  const op = button.getAttribute("data-operator");
  const action = button.getAttribute("data-action");
  if (number !== null) {
    appendNumber(number);
  } else if (op !== null) {
    chooseOperation(op);
  } else if (action === "clear") {
    clearAll();
  } else if (action === "delete") {
    deleteLast();
  } else if (action === "equals") {
    compute();
  }
}

function setInitialTheme() {
  const stored = localStorage.getItem("calculator-theme");
  if (stored === "light") {
    document.body.classList.add("light");
    themeToggle.classList.add("active");
    themeToggle.textContent = "☼";
  } else {
    document.body.classList.add("dark");
    themeToggle.textContent = "☾";
  }
}

function toggleTheme() {
  const isLight = document.body.classList.toggle("light");
  if (isLight) {
    document.body.classList.remove("dark");
    themeToggle.classList.add("active");
    themeToggle.textContent = "☼";
    localStorage.setItem("calculator-theme", "light");
  } else {
    document.body.classList.add("dark");
    themeToggle.classList.remove("active");
    themeToggle.textContent = "☾";
    localStorage.setItem("calculator-theme", "dark");
  }
}

buttons.forEach(button => {
  button.addEventListener("click", handleButtonClick);
});

document.addEventListener("keydown", handleKeydown);

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

setInitialTheme();
updateDisplay();
