document.getElementById('add-service-button').addEventListener('click', function() {
    // Hide the entire Services-content
    document.getElementById('services-content').style.display = 'none';
    
    // Show the add service section
    document.getElementById('add-service-section').style.display = 'block';
});

document.getElementById('save-changes-button').addEventListener('click', function() {
    // Hide the add service section
    document.getElementById('add-service-section').style.display = 'none';
    
    // Show the entire Services-content again
    document.getElementById('services-content').style.display = 'block';
});