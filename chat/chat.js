const contacts = [
  { id: 1, name: "Client 1" },
  { id: 2, name: "Client 2" },
  { id: 3, name: "Client 3" },
];

const backButton = document.getElementById("backButton");

backButton.addEventListener("click", () => {
  window.location.href = "../professional/professional.html"; // Replace "index.html" with the target HTML file.
});

const messages = {
  1: [
    { text: "Boss, mo offer mo roadside assistance?", type: "received" },
    { text: "oo boss", type: "sent" },
    { image: "../images/dev1.jpg", type: "sent" },
    { text: "nice ka boss", type: "received" },
  ],
  2: [
    { text: "Boss?", type: "sent" },
    { text: "Bossing", type: "received" },
  ],
  3: [{ text: "pila pa quota?", type: "sent" }],
};

let selectedContactId = null;
const contactList = document.querySelector(".contact-list");
const chatTitle = document.querySelector(".chat-title");
const messagesContainer = document.querySelector(".messages");
const messageInput = document.getElementById("messageInput");
const sendMessageBtn = document.getElementById("sendMessageBtn");

contacts.forEach((contact) => {
  const li = document.createElement("li");
  li.textContent = contact.name;
  li.addEventListener("click", () => loadChat(contact.id, contact.name));
  contactList.appendChild(li);
});

function loadChat(contactId, contactName) {
  selectedContactId = contactId;
  chatTitle.textContent = `Chat with ${contactName}`;
  messagesContainer.innerHTML = "";

  if (messages[contactId]) {
    messages[contactId].forEach((msg) => {
      if (msg.image) {
        addMessage(msg.image, msg.type, true);
      } else if (msg.link) {
        addMessage(msg.link, msg.type, false, true);
      } else {
        addMessage(msg.text, msg.type);
      }
    });
  }
}

function addMessage(content, type, isImage = false, isLink = false) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${type}`;

  if (isImage) {
    const img = document.createElement("img");
    img.src = content;
    img.classList.add("zoomable-image");
    img.addEventListener("click", () => openImageModal(content));
    messageDiv.appendChild(img);
  } else if (isLink) {
    const anchor = document.createElement("a");
    anchor.href = content;
    anchor.textContent = content;
    anchor.target = "_blank";
    anchor.classList.add("link-message");
    messageDiv.appendChild(anchor);
  } else {
    messageDiv.textContent = content;
  }

  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

sendMessageBtn.addEventListener("click", () => {
  const messageText = messageInput.value.trim();
  if (messageText && selectedContactId) {
    addMessage(messageText, "sent");

    if (!messages[selectedContactId]) messages[selectedContactId] = [];
    messages[selectedContactId].push({ text: messageText, type: "sent" });

    messageInput.value = "";
  }
});

const imageInput = document.getElementById("imageInput");
const imageButton = document.getElementById("imageButton");

imageButton.addEventListener("click", () => imageInput.click());

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      addImageMessage(reader.result, "sent");

      if (!messages[selectedContactId]) messages[selectedContactId] = [];
      messages[selectedContactId].push({ image: reader.result, type: "sent" });

      imageInput.value = "";
    };
    reader.readAsDataURL(file);
  }
});

function addImageMessage(imageData, type) {
  addMessage(imageData, type, true);
}

function openImageModal(imageSrc) {
  const modal = document.createElement("div");
  modal.className = "image-modal";

  const modalImage = document.createElement("img");
  modalImage.src = imageSrc;
  modalImage.className = "modal-content";

  modal.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modal.appendChild(modalImage);
  document.body.appendChild(modal);
}
