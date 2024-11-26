document.addEventListener("DOMContentLoaded", () => {
  const chatModal = document.getElementById("chatModal");
  const chatBox = document.getElementById("chatBox");
  const proceedChat = document.getElementById("proceedChat");
  const chatMessages = document.getElementById("chatMessages");
  const messageInput = document.getElementById("messageInput");
  const sendMessage = document.getElementById("sendMessage");
  const sendLocation = document.getElementById("sendLocation");
  const imageUpload = document.getElementById("imageUpload");
  const backButton = document.getElementById("backButton");

  chatModal.style.display = "flex";

  proceedChat.addEventListener("click", () => {
    chatModal.style.display = "none";
    chatBox.classList.remove("hidden");
  });

  backButton.addEventListener("click", () => {
    window.history.back();
  });

  sendMessage.addEventListener("click", sendMessageHandler);

  messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessageHandler();
    }
  });

  imageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        addMessage(
          `<img src="${reader.result}" alt="Image" style="max-width: 100%; border-radius: 8px;">`,
          "user"
        );
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  });

  sendLocation.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const locationMessage = `Location: <a href="https://www.google.com/maps?q=${latitude},${longitude}" target="_blank">Click here to view</a>`;
        addMessage(locationMessage, "user");
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  });

  function sendMessageHandler() {
    const message = messageInput.value.trim();
    if (message) {
      addMessage(message, "user");
      messageInput.value = "";
    }
  }

  function addMessage(content, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = content;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
