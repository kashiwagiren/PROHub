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

document.addEventListener("DOMContentLoaded", function () {
  const introOverlay = document.getElementById("intro-overlay");
  const proceedButton = document.getElementById("proceed-button");
  const countrySelect = document.querySelector(".country-select");
  const introMessage = document.querySelector(".intro-message");
  const startButton = document.getElementById("start-button");

  const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");

  if (hasSeenIntro) {
    introOverlay.parentNode.removeChild(introOverlay);
  } else {
    introOverlay.classList.remove("hidden");
    introOverlay.style.opacity = "1";
    proceedButton.addEventListener("click", function () {
      introMessage.classList.add("hidden");
      countrySelect.classList.remove("hidden");
    });

    startButton.addEventListener("click", function () {
      introOverlay.classList.add("hidden");

      sessionStorage.setItem("hasSeenIntro", "true");

      setTimeout(() => {
        introOverlay.style.display = "none";
        introOverlay.style.transition = "0.5s ease-in-out";
      }, 500);
    });
  }

  const footer = document.getElementById("footer");
  const sectionThree = document.querySelector(".three");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footer.style.display = "flex";
        } else {
          footer.style.display = "none";
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
    }
  );

  observer.observe(sectionThree);
});
