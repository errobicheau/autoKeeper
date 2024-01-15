
//Removes the time zone and stuff from the date
function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const dateParts = new Date(dateString).toLocaleDateString('en-US', options).split('/');
    return `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`;
}


document.addEventListener("DOMContentLoaded", function() {
    const overlay = document.getElementById('overlay');
    const fadeInContainer = document.getElementById('fadeInContainer');
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date().getTime();

    if (!lastVisit || now - lastVisit > oneDay) {
        // User hasn't visited in a day or it's their first visit
        fadeEffect();
        localStorage.setItem('lastVisit', now);
    } else {
        // User has visited within a day, so skip the transition
        overlay.style.display = 'none';
        fadeInContainer.style.opacity = 1;
    }
});

function fadeEffect() {
    const overlay = document.getElementById('overlay');
    const fadeInContainer = document.getElementById('fadeInContainer');

    // Fade in the overlay
    setTimeout(() => {
        overlay.style.opacity = 1;

        // Fade out the overlay after a delay
        setTimeout(() => {
            overlay.style.opacity = 0;

            // Once the fade-out completes, remove the overlay and fade in the next container
            setTimeout(() => {
                overlay.remove();
                fadeInContainer.style.opacity = 1;
            }, 750); // Match this with your fade-out duration
        }, 2000); // Duration the overlay is fully visible
    }, 250); // Delay before the overlay starts to fade in
}


// Button Logics

document.querySelector('#logService').addEventListener('click', logService)

    function logService () {
        window.location.href = '/service'
    }

document.querySelector('#expandAll').addEventListener('click', expandAll)

    function expandAll() {
        document.querySelectorAll('.accordion-collapse').forEach(function(accordion) {
            accordion.classList.add('show');
        });
    }

document.querySelector('#collapseAll').addEventListener('click', collapseAll)

    function collapseAll() {
        document.querySelectorAll('.accordion-collapse').forEach(function(accordion) {
            accordion.classList.remove('show');
        });
    }


// Dark Mode

document.getElementById('darkModeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    // Save the preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Check for saved user preferences, if any, on page load
window.onload = function() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
};
