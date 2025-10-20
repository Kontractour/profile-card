/**
 * Contact Form Validation and Submission Handler
 * Implements real-time validation, character counting, and accessible error handling
 * 
 * @requires Font Awesome for icons
 */

const form = document.getElementById("contactForm");
const successMessage = document.querySelector(".success");
const messageField = document.getElementById("message");
const charCounter = document.getElementById("char-count");

// Character counter for message field
messageField.addEventListener("input", () => {
  const length = messageField.value.length;
  charCounter.textContent = `${length} / 10 characters`;
  
  // Change color based on validity
  if (length >= 10) {
    charCounter.style.color = "green";
  } else {
    charCounter.style.color = "#666";
  }
});

// Real-time field validation
const inputs = [
  { field: form.name, error: document.getElementById("error-name") },
  { field: form.email, error: document.getElementById("error-email") },
  { field: form.subject, error: document.getElementById("error-subject") },
  { field: messageField, error: document.getElementById("error-message") }
];

inputs.forEach(({ field, error }) => {
  // Validate on blur (when user leaves field)
  field.addEventListener("blur", () => {
    validateField(field, error);
  });
  
  // Validate on input if field was previously invalid
  field.addEventListener("input", () => {
    if (field.classList.contains("invalid")) {
      validateField(field, error);
    }
  });
});

/**
 * Validates a single form field and displays appropriate error message
 * @param {HTMLElement} field - The input field to validate
 * @param {HTMLElement} errorElement - The error message element
 * @returns {boolean} - True if field is valid, false otherwise
 */
function validateField(field, errorElement) {
  let isValid = true;
  let errorMsg = "";
  
  if (field.name === "name" && !field.value.trim()) {
    errorMsg = "Full name is required.";
    isValid = false;
  } else if (field.name === "email") {
    if (!field.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      errorMsg = "Enter a valid email address.";
      isValid = false;
    }
  } else if (field.name === "subject" && !field.value.trim()) {
    errorMsg = "Subject is required.";
    isValid = false;
  } else if (field.name === "message" && field.value.length < 10) {
    errorMsg = "Message must be at least 10 characters.";
    isValid = false;
  }
  
  if (isValid) {
    field.classList.remove("invalid");
    field.classList.add("valid");
    errorElement.textContent = "";
  } else {
    field.classList.remove("valid");
    field.classList.add("invalid");
    errorElement.textContent = errorMsg;
  }
  
  return isValid;
}

/**
 * Handles form submission with full validation
 * @param {Event} e - Form submit event
 */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Clear old messages
  document.querySelectorAll("small").forEach(el => {
    if (!el.classList.contains("char-counter")) {
      el.textContent = "";
    }
  });
  successMessage.textContent = "";

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  let isValid = true;

  if (!name) {
    document.getElementById("error-name").textContent = "Full name is required.";
    form.name.classList.add("invalid");
    isValid = false;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById("error-email").textContent = "Enter a valid email address.";
    form.email.classList.add("invalid");
    isValid = false;
  }

  if (!subject) {
    document.getElementById("error-subject").textContent = "Subject is required.";
    form.subject.classList.add("invalid");
    isValid = false;
  }

  if (message.length < 10) {
    document.getElementById("error-message").textContent = "Message must be at least 10 characters.";
    messageField.classList.add("invalid");
    isValid = false;
  }

  if (isValid) {
    // Show success message
    successMessage.textContent = "✅ Your message has been sent successfully!";
    successMessage.classList.add("fade-in");
    
    // Add success animation to form
    form.style.transform = "scale(0.98)";
    
    setTimeout(() => {
      form.style.transform = "scale(1)";
    }, 200);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      form.reset();
      
      // Reset character counter
      charCounter.textContent = "0 / 10 characters";
      charCounter.style.color = "#666";
      
      // Remove all validation classes
      inputs.forEach(({ field }) => {
        field.classList.remove("valid", "invalid");
      });
      
      // Fade out success message
      successMessage.classList.remove("fade-in");
      setTimeout(() => {
        successMessage.textContent = "";
      }, 800);
    }, 3000);
  }
});