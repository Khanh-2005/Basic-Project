function calculate() {
  try {
    calcForm.display.value = math.evaluate(calcForm.display.value);
  } catch (error) {
    calcForm.display.value = "Error";
  }
}
