document
  .getElementById("add-service-button")
  .addEventListener("click", function () {
    document.getElementById("services-content").style.display = "none";

    document.getElementById("add-service-section").style.display = "block";
  });

const deleteModal = document.getElementById("delete-modal");
const confirmationModal = document.getElementById("confirmation-modal");
const reasonModal = document.getElementById("reason-modal");
const serviceDeletedModal = document.getElementById("service-deleted-modal");

const deleteReason = document.getElementById("delete-reason");
const otherReason = document.getElementById("other-reason");
const continueDeleteButton = document.getElementById("continue-delete");
const cancelDeleteButton = document.getElementById("cancel-delete");
const confirmDeleteButton = document.getElementById("confirm-delete");
const cancelConfirmationButton = document.getElementById("cancel-confirmation");
const closeReasonModalButton = document.getElementById("close-reason-modal");
const closeDeletedModalButton = document.getElementById("close-deleted-modal");

let serviceToDelete = null;

document.querySelectorAll(".fa-trash").forEach((deleteButton) => {
  deleteButton.addEventListener("click", function () {
    serviceToDelete = this.closest(".services");

    deleteReason.value = "";
    otherReason.style.display = "none";
    otherReason.value = "";
    deleteModal.style.display = "flex";
  });
});

deleteReason.addEventListener("change", () => {
  if (deleteReason.value === "Other") {
    otherReason.style.display = "block";
  } else {
    otherReason.style.display = "none";
    otherReason.value = "";
  }
});

continueDeleteButton.addEventListener("click", function () {
  const reason =
    deleteReason.value === "Other"
      ? otherReason.value.trim()
      : deleteReason.value;

  if (!reason) {
    reasonModal.style.display = "flex";
    return;
  }

  deleteModal.style.display = "none";
  confirmationModal.style.display = "flex";
});

cancelDeleteButton.addEventListener("click", function () {
  deleteModal.style.display = "none";
  serviceToDelete = null;
});

confirmDeleteButton.addEventListener("click", function () {
  if (serviceToDelete) {
    serviceToDelete.style.display = "none";
  }
  confirmationModal.style.display = "none";

  serviceDeletedModal.style.display = "flex";
});

cancelConfirmationButton.addEventListener("click", function () {
  confirmationModal.style.display = "none";
  deleteModal.style.display = "flex";
});

closeReasonModalButton.addEventListener("click", function () {
  reasonModal.style.display = "none";
});

closeDeletedModalButton.addEventListener("click", function () {
  serviceDeletedModal.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  const editModal = document.getElementById("edit-modal");
  const saveEditsButton = document.getElementById("save-edits");
  const cancelEditButton = document.getElementById("cancel-edit");
  let serviceToEdit = null;
  let originalServiceName = "";
  let originalExpertiseLevel = "";
  const validationModal = document.getElementById("validation-modal");

  document.querySelectorAll(".fa-edit").forEach((editButton) => {
    editButton.addEventListener("click", function () {
      serviceToEdit = this.closest(".services");
      const serviceName = serviceToEdit.querySelector("h2").textContent;
      const expertiseLevel =
        serviceToEdit.querySelector(".verification-section select")?.value ||
        "";

      originalServiceName = serviceName;
      originalExpertiseLevel = expertiseLevel;

      document.getElementById("edit-service-name").value = serviceName;
      document.getElementById("edit-expertise-level").value = expertiseLevel;

      editModal.style.display = "flex";
    });
  });

  saveEditsButton.addEventListener("click", function () {
    const editedServiceName =
      document.getElementById("edit-service-name").value;
    const editedExpertiseLevel = document.getElementById(
      "edit-expertise-level"
    ).value;

    if (!editedServiceName || !editedExpertiseLevel) {
      validationModal.style.display = "flex";
      return;
    } else if (
      editedServiceName !== originalServiceName ||
      editedExpertiseLevel !== originalExpertiseLevel
    ) {
      closeModal();
      serviceToEdit.querySelector("h2").textContent = editedServiceName;
      serviceToEdit.querySelector(".verification-section select").value =
        editedExpertiseLevel;
    } else {
      closeModal();
    }
  });

  cancelEditButton.addEventListener("click", function () {
    closeModal();
  });

  function closeModal() {
    document.getElementById("edit-service-name").value = "";
    document.getElementById("edit-expertise-level").value = "";

    editModal.style.display = "none";
  }

  document
    .getElementById("close-validation")
    .addEventListener("click", function () {
      validationModal.style.display = "none";
    });
});

const serviceNameInput = document.getElementById("service-name");
const saveChangesButton = document.getElementById("save-changes-button");
const verificationModal = document.getElementById("verification-modal");
const modalOkButton = document.getElementById("modal-ok-button");

serviceNameInput.addEventListener("input", function () {
  if (serviceNameInput.value.trim() === "") {
    saveChangesButton.textContent = "Cancel";
  } else {
    saveChangesButton.textContent = "Save Changes";
  }
});

saveChangesButton.addEventListener("click", function () {
  if (saveChangesButton.textContent === "Cancel") {
    document.getElementById("add-service-section").style.display = "none";
    document.getElementById("services-content").style.display = "block";
  } else if (saveChangesButton.textContent === "Save Changes") {
    document.getElementById("add-service-section").style.display = "none";
    verificationModal.style.display = "flex";
  }
});

modalOkButton.addEventListener("click", function () {
  verificationModal.style.display = "none";

  document.getElementById("add-service-section").style.display = "none";
  document.getElementById("services-content").style.display = "block";
  serviceNameInput.value = serviceNameInput.defaultValue;
});
