/**
 * Real-time Clock Display
 * Updates the current time in milliseconds every second
 * Displays with clock icon and formatted number
 */

/**
 * Updates the time display element with current timestamp
 * Adds clock icon and formats the number with locale separators
 */
function updateTime() {
  const currentTime = Date.now();
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  
  if (timeElement) {
    // Add clock icon and format with ms label
    timeElement.innerHTML = `
      <i class="fas fa-clock"></i> 
      <span>${currentTime.toLocaleString()} ms</span>
    `;
  }
}

// Initialize time display on page load
updateTime();

// Update every second for live accuracy
setInterval(updateTime, 1000);