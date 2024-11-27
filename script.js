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

const surveyLink = document.getElementById("choose-survey-link");
const popUp = document.getElementById("pop-up-survey-id");

surveyLink.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent default link behavior

  // Toggle visibility and opacity
  if (popUp.style.opacity === "0" || popUp.style.opacity === "") {
    popUp.style.opacity = "1";
    popUp.style.visibility = "visible";
  } else {
    popUp.style.opacity = "0";
    popUp.style.visibility = "hidden";
  }
});

// Close pop-up if clicking outside
document.addEventListener("click", (event) => {
  if (!surveyLink.contains(event.target) && !popUp.contains(event.target)) {
    popUp.style.opacity = "0";
    popUp.style.visibility = "hidden";
  }
});
/*
document.getElementById("choose-survey-link").addEventListener("click", function () {
  document.getElementById("pop-up-survey-id").style.opacity = '1';
});
*/
