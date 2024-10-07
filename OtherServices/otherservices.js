
const searchBox = document.querySelector('.search-box');
const serviceCategories = document.querySelectorAll('.service-category');
const noResultsMessage = document.querySelector('.no-results');

// Initially hide the no results message
noResultsMessage.style.display = 'none';

searchBox.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    let hasResults = false;

    serviceCategories.forEach(category => {
        const items = category.querySelectorAll('.service-item');
        const serviceTitle = category.querySelector('.service-title');
        let categoryHasResults = false;

        // Show or hide the service title based on search term
        if (searchTerm === "") {
            serviceTitle.style.display = ''; // Show title if search is empty
            items.forEach(item => {
                item.style.display = ''; // Show all items if search is empty
            });
            categoryHasResults = true; // Mark this category as having results
        } else {
            // Check if the service title matches the search term
            if (serviceTitle.textContent.toLowerCase().includes(searchTerm)) {
                serviceTitle.style.display = ''; // Show title if it matches
                categoryHasResults = true; // Mark that this category has results
            } else {
                serviceTitle.style.display = 'none'; // Hide title if it doesn't match
            }

            // Check each service item for matches
            items.forEach(item => {
                const itemName = item.textContent.toLowerCase();
                if (itemName.includes(searchTerm)) {
                    item.style.display = ''; // Show item if it matches
                    categoryHasResults = true; // Mark that this category has results
                } else {
                    item.style.display = 'none'; // Hide item if it doesn't match
                }
            });
        }

        // Show or hide the service title based on visibility of items
        if (categoryHasResults) {
            hasResults = true; // Mark overall results
        }
    });

    // Show or hide the no results message
    if (hasResults) {
        noResultsMessage.style.display = 'none'; // Hide message if results found
    } else {
        noResultsMessage.style.display = ''; // Show message if no results
    }
});

