function checkOrientation() {
  const orientationLock = document.getElementById("orientation-lock");

  if (window.innerWidth <= 1220) {
    if (window.innerHeight < window.innerWidth) {
      orientationLock.style.display = "flex";
    } else {
      orientationLock.style.display = "none";
    }
  } else {
    if (document.body.classList.contains("mobile-view")) {
      if (window.innerHeight < window.innerWidth) {
        orientationLock.style.display = "flex";
      } else {
        orientationLock.style.display = "none";
      }
    } else {
      orientationLock.style.display = "none";
    }
  }
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("DOMContentLoaded", checkOrientation);

const passwordInput = document.querySelector('input[type="password"]');
const confirmPasswordInput = document.getElementById("confirm-password");
const feedbackElement = document.getElementById("password-feedback");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  const submitButton = document.getElementById("submit-button");

  if (form && submitButton) {
    form.addEventListener("input", validateForm);
    form.addEventListener("change", validateForm);
    validateForm();
  } else {
    console.error("Form or Submit Button not found");
  }

  function validateForm() {
    const allFilled = Array.from(form.elements).every((input) => {
      if (input.type === "radio") {
        return (
          document.querySelector(`input[name="${input.name}"]:checked`) !== null
        );
      }
      return input.value.trim() !== "";
    });
    submitButton.disabled = !allFilled || !validatePassword();
    submitButton.style.cursor = submitButton.disabled
      ? "not-allowed"
      : "pointer";
  }

  function validatePassword() {
    const passwordsMatch = passwordInput.value === confirmPasswordInput.value;

    if (passwordInput.value || confirmPasswordInput.value) {
      feedbackElement.textContent = passwordsMatch
        ? "Passwords match!"
        : "Passwords do not match!";
      feedbackElement.style.color = passwordsMatch ? "green" : "red";
      feedbackElement.classList.add("visible");
    } else {
      feedbackElement.classList.remove("visible");
    }
    return passwordsMatch;
  }
});
