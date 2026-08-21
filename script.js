const baseDateInput = document.getElementById("base-date");
const todayToggle = document.getElementById("today-toggle");
const validityInput = document.getElementById("validity-value");
const validityUnit = document.getElementById("validity-unit");
const resultDate = document.getElementById("result-date");
const dateHint = document.getElementById("date-hint");

const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDateInput(value) {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function addMonthsPreservingEndOfMonth(date, months) {
  const originalDay = date.getDate();
  const target = new Date(date);
  target.setDate(1);
  target.setMonth(target.getMonth() + months);

  const lastDayOfTargetMonth = new Date(
    target.getFullYear(),
    target.getMonth() + 1,
    0
  ).getDate();

  target.setDate(Math.min(originalDay, lastDayOfTargetMonth));
  return target;
}

function addYearsPreservingEndOfMonth(date, years) {
  const originalMonth = date.getMonth();
  const originalDay = date.getDate();
  const target = new Date(date);

  target.setDate(1);
  target.setFullYear(target.getFullYear() + years);
  target.setMonth(originalMonth);

  const lastDayOfTargetMonth = new Date(
    target.getFullYear(),
    originalMonth + 1,
    0
  ).getDate();

  target.setDate(Math.min(originalDay, lastDayOfTargetMonth));
  return target;
}

function calculateValidity(baseDate, amount, unit) {
  const result = new Date(baseDate);

  if (unit === "days") {
    result.setDate(result.getDate() + amount);
    return result;
  }

  if (unit === "months") {
    return addMonthsPreservingEndOfMonth(result, amount);
  }

  if (unit === "years") {
    return addYearsPreservingEndOfMonth(result, amount);
  }

  return result;
}

function formatResult(date) {
  return `${date.getDate()} ${monthNames[date.getMonth()]} de ${date.getFullYear()}`;
}

function getBaseDate() {
  if (todayToggle.classList.contains("is-active")) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  return parseDateInput(baseDateInput.value);
}

function updateHint() {
  if (todayToggle.classList.contains("is-active")) {
    dateHint.textContent = "A data de hoje está sendo usada como base.";
  } else {
    dateHint.textContent = "A data informada está sendo usada como base.";
  }
}

function calculate() {
  const baseDate = getBaseDate();
  const rawValue = validityInput.value.trim();

  if (!baseDate || rawValue === "") {
    resultDate.textContent = "—";
    return;
  }

  const amount = Number(rawValue);

  if (!Number.isFinite(amount) || amount < 0) {
    resultDate.textContent = "—";
    return;
  }

  const normalizedAmount = Math.floor(amount);
  const result = calculateValidity(baseDate, normalizedAmount, validityUnit.value);

  resultDate.textContent = formatResult(result);
}

function toggleTodayMode() {
  const isActive = todayToggle.classList.toggle("is-active");

  todayToggle.setAttribute("aria-pressed", String(isActive));
  baseDateInput.disabled = isActive;

  if (isActive) {
    baseDateInput.value = toDateInputValue(new Date());
  } else if (!baseDateInput.value) {
    baseDateInput.value = toDateInputValue(new Date());
  }

  updateHint();
  calculate();
}

function initialize() {
  const today = new Date();
  baseDateInput.value = toDateInputValue(today);
  baseDateInput.disabled = true;
  todayToggle.classList.add("is-active");
  todayToggle.setAttribute("aria-pressed", "true");

  updateHint();
  calculate();
}

todayToggle.addEventListener("click", toggleTodayMode);
baseDateInput.addEventListener("input", calculate);
baseDateInput.addEventListener("change", calculate);
validityInput.addEventListener("input", calculate);
validityUnit.addEventListener("change", calculate);

initialize();
