function checkOrientation() {
    const orientationLock = document.getElementById('orientation-lock');
    
    if (window.innerWidth <= 1220) {
        if (window.innerHeight < window.innerWidth) {
            orientationLock.style.display = 'flex';
        } else {
            orientationLock.style.display = 'none';
        }
    } else {
        if (document.body.classList.contains('mobile-view')) {
            if (window.innerHeight < window.innerWidth) {
                orientationLock.style.display = 'flex';
            } else {
                orientationLock.style.display = 'none';
            }
        } else {
            orientationLock.style.display = 'none';
        }
    }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('DOMContentLoaded', checkOrientation);

document.addEventListener('DOMContentLoaded', function () {
    const footer = document.getElementById('footer');
    const sectionThree = document.querySelector('.three');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    footer.style.display = 'flex';
                } else {
                    footer.style.display = 'none';
                }
            });
        },
        {
            root: null,
            threshold: 0.1,
        }
    );

    observer.observe(sectionThree);
});
