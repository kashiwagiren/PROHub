let lastScrollTop = 0; // Keep track of last scroll position
const header = document.getElementById('header'); // Get the header

// Show header when at the top of the page
window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Check if at the top of the page
    if (currentScroll === 0) {
        header.classList.remove('hidden'); // Show header if at the top
    } else if (currentScroll > lastScrollTop) {
        // Scrolling down
        header.classList.add('hidden'); // Hide header
    } else {
        // Scrolling up
        header.classList.remove('hidden'); // Show header
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});
