const form = document.querySelector("form"),
  fileInput = document.querySelector(".file-input"),
  progressArea = document.querySelector(".progress-area"),
  uploadedArea = document.querySelector(".uploaded-area");
submitButton = document.querySelector(".submit-button");
(loadingOverlay = document.getElementById("loading-overlay")),
  (successOverlay = document.getElementById("success-overlay")),
  (okButton = document.getElementById("ok-button"));

let uploadedFilesCount = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

form.addEventListener("click", (e) => {
  if (e.target !== submitButton) {
    fileInput.click();
  }
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
});

fileInput.onchange = ({ target }) => {
  const files = target.files;
  if (files.length > 0) {
    Array.from(files).forEach((file) => {
      let fileName = file.name;
      if (fileName.length >= 12) {
        let splitName = fileName.split(".");
        fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
      }
      uploadFile(file);
    });
  }
};

function uploadFile(file) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/document.php");

  xhr.upload.addEventListener("progress", ({ loaded, total }) => {
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1000);
    let fileSize;
    fileTotal < 1024
      ? (fileSize = fileTotal + " KB")
      : (fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB");

    let progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${file.name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;
    if (loaded === total) {
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${file.name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
      uploadedArea.classList.remove("onprogress");
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);

      uploadedFilesCount++;

      if (uploadedFilesCount >= 3) {
        submitButton.style.display = "block";
        submitButton.disabled = false;
        submitButton.classList.remove("disabled");
      }
    }
  });

  let data = new FormData();
  data.append("file", file);
  xhr.send(data);
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  loadingOverlay.style.display = "flex";

  setTimeout(() => {
    loadingOverlay.style.display = "none";
    document.getElementById("success-overlay").style.display = "flex";
  }, 3000);
});

okButton.addEventListener("click", () => {
  window.location.href = "../index.html";
});

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
