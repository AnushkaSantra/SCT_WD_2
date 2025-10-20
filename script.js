let startTime = 0;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.getElementById("laps");

function formatTime(ms) {
  const time = new Date(ms);
  const minutes = String(time.getUTCMinutes()).padStart(2, "0");
  const seconds = String(time.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, "0");
  return `${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener("click", () => {
  startBtn.classList.add("active");
  pauseBtn.classList.remove("active");
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateDisplay, 10);
  startBtn.disabled = true;
});

pauseBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  pauseBtn.classList.add("active");
  startBtn.classList.remove("active");
  startBtn.disabled = false;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  display.textContent = "00:00:00.00";
  lapsList.innerHTML = "";
  startBtn.disabled = false;
  startBtn.classList.remove("active");
  pauseBtn.classList.remove("active");
});

lapBtn.addEventListener("click", () => {
  if (elapsedTime > 0) {
    const li = document.createElement("li");
    li.textContent = `Lap ${lapsList.children.length + 1}: ${formatTime(elapsedTime)}`;
    lapsList.prepend(li);
    lapBtn.classList.add("active");
    setTimeout(() => lapBtn.classList.remove("active"), 500);
  }
});
