const display = document.getElementById("display");

function appendValue(value) {
    if (display.value === "Error") {
        display.value = "";
    }

    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    if (display.value === "Error") {
        display.value = "";
        return;
    }

    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        if (!display.value.trim()) return;

        const result = Function('"use strict"; return (' + display.value + ')')();

        if (!Number.isFinite(result)) {
            display.value = "Error";
            return;
        }

        display.value = result;
    } catch {
        display.value = "Error";
    }
}

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if ("0123456789+-*/.%".includes(key)) {
        appendValue(key);
    } else if (key === "Enter" || key === "=") {
        calculate();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    }
});
