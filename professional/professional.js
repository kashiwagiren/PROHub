document.getElementById('add-service-button').addEventListener('click', function() {
    // Hide the entire Services-content
    document.getElementById('services-content').style.display = 'none';
    
    // Show the add service section
    document.getElementById('add-service-section').style.display = 'block';
});




// Select modal elements
const deleteModal = document.getElementById('delete-modal');
const confirmationModal = document.getElementById('confirmation-modal');
const reasonModal = document.getElementById('reason-modal');
const serviceDeletedModal = document.getElementById('service-deleted-modal');

const deleteReason = document.getElementById('delete-reason');
const otherReason = document.getElementById('other-reason');
const continueDeleteButton = document.getElementById('continue-delete');
const cancelDeleteButton = document.getElementById('cancel-delete');
const confirmDeleteButton = document.getElementById('confirm-delete');
const cancelConfirmationButton = document.getElementById('cancel-confirmation');
const closeReasonModalButton = document.getElementById('close-reason-modal');
const closeDeletedModalButton = document.getElementById('close-deleted-modal');

// Track the service container to delete
let serviceToDelete = null;

// Handle trash icon clicks
document.querySelectorAll('.fa-trash').forEach((deleteButton) => {
    deleteButton.addEventListener('click', function () {
        // Save the service container for deletion later
        serviceToDelete = this.closest('.services');

        // Reset the modal state
        deleteReason.value = '';
        otherReason.style.display = 'none';
        otherReason.value = '';
        deleteModal.style.display = 'flex';
    });
});

// Handle reason dropdown changes
deleteReason.addEventListener('change', () => {
    if (deleteReason.value === 'Other') {
        otherReason.style.display = 'block';
    } else {
        otherReason.style.display = 'none';
        otherReason.value = ''; // Clear "Other" input if not used
    }
});

// Handle "Continue" button (Step 1)
continueDeleteButton.addEventListener('click', function () {
    const reason = deleteReason.value === 'Other' ? otherReason.value.trim() : deleteReason.value;

    if (!reason) {
        // Show modal if reason is not specified
        reasonModal.style.display = 'flex';
        return;
    }

    // Hide the first modal and show the confirmation modal
    deleteModal.style.display = 'none';
    confirmationModal.style.display = 'flex';
});

// Handle "Cancel" button in Delete Modal
cancelDeleteButton.addEventListener('click', function () {
    deleteModal.style.display = 'none';
    serviceToDelete = null; // Reset tracked service container
});

// Handle "Yes" button in Confirmation Modal (Step 2)
confirmDeleteButton.addEventListener('click', function () {
    if (serviceToDelete) {
        serviceToDelete.style.display = 'none'; // Hide the service container
    }
    confirmationModal.style.display = 'none'; // Hide the confirmation modal

    // Show "Service Deleted" modal
    serviceDeletedModal.style.display = 'flex';
});

// Handle "No" button in Confirmation Modal
cancelConfirmationButton.addEventListener('click', function () {
    confirmationModal.style.display = 'none'; // Hide the confirmation modal
    deleteModal.style.display = 'flex'; // Show the original delete modal again
});

// Handle "Close" button in Reason Modal
closeReasonModalButton.addEventListener('click', function () {
    reasonModal.style.display = 'none';
});

// Handle "Close" button in Service Deleted Modal
closeDeletedModalButton.addEventListener('click', function () {
    serviceDeletedModal.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function () {

    const editModal = document.getElementById('edit-modal');
    const saveEditsButton = document.getElementById('save-edits');
    const cancelEditButton = document.getElementById('cancel-edit');
    let serviceToEdit = null;
    let originalServiceName = '';
    let originalExpertiseLevel = '';
    const validationModal = document.getElementById('validation-modal');

    // Handle click on edit icon
    document.querySelectorAll('.fa-edit').forEach((editButton) => {
        editButton.addEventListener('click', function () {
            // Get the service container (closest parent with class "services")
            serviceToEdit = this.closest('.services');
            const serviceName = serviceToEdit.querySelector('h2').textContent;
            const expertiseLevel = serviceToEdit.querySelector('.verification-section select')?.value || "";

            // Save the original values before editing
            originalServiceName = serviceName;
            originalExpertiseLevel = expertiseLevel;

            // Fill modal inputs with existing service data
            document.getElementById('edit-service-name').value = serviceName;
            document.getElementById('edit-expertise-level').value = expertiseLevel;

            // Show the modal
            editModal.style.display = 'flex';  // Ensure the modal is shown
        });
    });

    // Save the changes in the modal
    saveEditsButton.addEventListener('click', function () {
        const editedServiceName = document.getElementById('edit-service-name').value;
        const editedExpertiseLevel = document.getElementById('edit-expertise-level').value;

        // Validation: Check if all required fields are filled
        if (!editedServiceName || !editedExpertiseLevel) {
            // Show validation modal if fields are not filled
            validationModal.style.display = 'flex';
            return;  // Don't proceed with saving if fields are incomplete
        }
        // Only proceed with closing the modal if there are actual changes
        else if (editedServiceName !== originalServiceName || editedExpertiseLevel !== originalExpertiseLevel) {
            // Update the service data on the page
            closeModal();
            serviceToEdit.querySelector('h2').textContent = editedServiceName;
            serviceToEdit.querySelector('.verification-section select').value = editedExpertiseLevel;

        } else {
            // If no changes were made, just close the modal without saving
            closeModal();
        }
    });

    // Cancel the editing
    cancelEditButton.addEventListener('click', function () {
        closeModal();  // Close the modal without saving
    });

    // Close modal helper function
    function closeModal() {
        // Clear the input fields for the next time the modal is used
        document.getElementById('edit-service-name').value = '';
        document.getElementById('edit-expertise-level').value = '';

        // Close the modal
        editModal.style.display = 'none';  // Close the modal by hiding it
    }

    // Handle the "Close" button on the validation modal
    document.getElementById('close-validation').addEventListener('click', function () {
        validationModal.style.display = 'none';
    });

});

// Elements
const serviceNameInput = document.getElementById('service-name');
const saveChangesButton = document.getElementById('save-changes-button');
const verificationModal = document.getElementById('verification-modal');
const modalOkButton = document.getElementById('modal-ok-button');

// Monitor input field for changes
serviceNameInput.addEventListener('input', function () {
    // Check if the input is either empty or contains only spaces
    if (serviceNameInput.value.trim() === '') {
        saveChangesButton.textContent = 'Cancel';  // Change button text to "Cancel"
    } else {
        saveChangesButton.textContent = 'Save Changes';  // Change button text to "Save Changes"
    }
});


// Handle Save Changes or Cancel button click
saveChangesButton.addEventListener('click', function () {
    if (saveChangesButton.textContent === 'Cancel') {
        // Hide Add Service Section and show Offered Services
        document.getElementById('add-service-section').style.display = 'none';
        document.getElementById('services-content').style.display = 'block';
    } else if (saveChangesButton.textContent === 'Save Changes') {
        // Show the modal
        document.getElementById('add-service-section').style.display = 'none';
        verificationModal.style.display = 'flex';
    }
});

// Handle Modal OK button click
modalOkButton.addEventListener('click', function () {
    // Close the modal
    verificationModal.style.display = 'none';

    // Hide Add Service Section and show Offered Services
    document.getElementById('add-service-section').style.display = 'none';
    document.getElementById('services-content').style.display = 'block';
    serviceNameInput.value = serviceNameInput.defaultValue; 
});

