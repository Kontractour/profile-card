
function updateTime() {
  const currentTime = Date.now(); // current time in milliseconds
  document.querySelector('[data-testid="test-user-time"]').textContent = currentTime;
}

// update once when the page loads
updateTime();

//update every second for live accuracy
setInterval(updateTime, 1000);
