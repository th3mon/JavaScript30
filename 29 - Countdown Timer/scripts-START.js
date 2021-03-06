let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);

      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

const padZero = value => (value < 10 ? '0' + value : value);

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainSeconds = seconds % 60;
  const display = `${padZero(minutes)}:${padZero(remainSeconds)}`;

  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();

  endTime.textContent = `Be back at ${padZero(hours)}:${padZero(minutes)}`;
}

function startTimer() {
  const seconds = Number(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const minutes = this.minutes.value;
  timer(minutes * 60);

  this.reset();
});
