const searchBox = document.querySelector('.search-box');
const serviceCategories = document.querySelectorAll('.service-category');
const noResultsMessage = document.querySelector('.no-results');
const noResultsDropdown = document.querySelector('.no-results-dropdown');
const postcodeWarning = document.querySelector('.postcode-warning');

function filterServices(searchTerm) {
    let hasResults = false;

    serviceCategories.forEach(category => {
        const items = category.querySelectorAll('.service-item');
        const serviceTitle = category.querySelector('.service-title');
        let categoryHasResults = false;

        if (serviceTitle.textContent.toLowerCase().includes(searchTerm)) {
            serviceTitle.style.display = '';
            items.forEach(item => {
                item.style.display = '';
            });
            categoryHasResults = true;
        } else {
            items.forEach(item => {
                const itemName = item.textContent.toLowerCase();
                if (itemName.includes(searchTerm)) {
                    item.style.display = '';
                    categoryHasResults = true;
                } else {
                    item.style.display = 'none';
                }
            });

            serviceTitle.style.display = categoryHasResults ? '' : 'none';
        }

        category.style.display = categoryHasResults ? '' : 'none';

        if (categoryHasResults) {
            hasResults = true;
        }
    });

    noResultsMessage.style.display = hasResults ? 'none' : '';
	noResultsDropdown.style.display = hasResults ? 'none' : '';
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
	const postcode = urlParams.get('postcode');
	const origin = urlParams.get('origin');
	const backButton = document.querySelector('.back-button');

	if (origin === 'section-one') {
        backButton.href = '../index.html#section-one';
    } else if (origin === 'section-two') {
        backButton.href = '../index.html#section-two';
    } else {
        backButton.href = '../index.html';
    }	

    if (postcode !== '6000') {
        serviceCategories.forEach(category => (category.style.display = 'none'));
        noResultsMessage.style.display = 'none';
        noResultsDropdown.style.display = 'none';
        postcodeWarning.style.display = 'block';
        return;
    }

    if (searchTerm) {
        searchBox.value = searchTerm;
        filterServices(searchTerm.toLowerCase());
    }
});

searchBox.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    filterServices(searchTerm);
});
