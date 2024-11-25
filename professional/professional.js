// Add service button event listener
document.getElementById('add-service-button').addEventListener('click', function () {
    // Get the elements
    const servicesContent = document.getElementById('services-content');
    const addServiceSection = document.getElementById('add-service-section');

    // Hide the Services-content and show the Add Service section
    if (servicesContent && addServiceSection) {
        servicesContent.style.display = 'none';
        addServiceSection.style.display = 'block';
    } else {
        console.error('Services-content or Add-service-section element not found.');
    }
});

// Save changes button event listener
document.getElementById('save-changes-button').addEventListener('click', function () {
    // Get the elements
    const servicesContent = document.getElementById('services-content');
    const addServiceSection = document.getElementById('add-service-section');

    // Hide the Add Service section and show the Services-content
    if (servicesContent && addServiceSection) {
        addServiceSection.style.display = 'none';
        servicesContent.style.display = 'block';
    } else {
        console.error('Services-content or Add-service-section element not found.');
    }
});
