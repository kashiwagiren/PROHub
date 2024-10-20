const searchBox = document.querySelector('.search-box');
const serviceCategories = document.querySelectorAll('.service-category');
const noResultsMessage = document.querySelector('.no-results');

noResultsMessage.style.display = 'none';

searchBox.addEventListener('input', function() {
	const searchTerm = this.value.toLowerCase();
	let hasResults = false;

	serviceCategories.forEach(category => {
		const items = category.querySelectorAll('.service-item');
		const serviceTitle = category.querySelector('.service-title');
		let categoryHasResults = false;

		if (searchTerm === "") {
			serviceTitle.style.display = '';
			items.forEach(item => {
				item.style.display = '';
			});
			categoryHasResults = true;
		} else {
			if (serviceTitle.textContent.toLowerCase().includes(searchTerm)) {
				serviceTitle.style.display = '';
				categoryHasResults = true;
			} else {
				serviceTitle.style.display = 'none';
			}

			items.forEach(item => {
				const itemName = item.textContent.toLowerCase();
				if (itemName.includes(searchTerm)) {
					item.style.display = '';
					categoryHasResults = true;
				} else {
					item.style.display = 'none';
				}
			});
		}

		if (categoryHasResults) {
			hasResults = true;
		}
	});

	// Show or hide the no results message
	if (hasResults) {
		noResultsMessage.style.display = 'none';
	} else {
		noResultsMessage.style.display = '';
	}
});