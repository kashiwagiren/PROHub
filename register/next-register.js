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

function preventValidation(event) {
  event.preventDefault();
  window.history.back();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  const submitButton = document.getElementById("submit-button");
  form.addEventListener("input", validateForm);
  function validateForm() {
    const allFilled = Array.from(form.elements).every((input) => {
      if (input.type === "radio") {
        return (
          document.querySelector(`input[name="${input.name}"]:checked`) !== null
        );
      }
      return input.value.trim() !== "";
    });
    submitButton.disabled = !allFilled;
    submitButton.style.cursor = submitButton.disabled
      ? "not-allowed"
      : "pointer";
  }
  window.preventValidation = function (event) {
    event.preventDefault();
    window.location.href = "document.html";
  };
});
