
//Removes the time zone and stuff from the date
function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const dateParts = new Date(dateString).toLocaleDateString('en-US', options).split('/');
    return `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`;
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


// Check for saved user preferences, if any, on page load
window.onload = function() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
};
