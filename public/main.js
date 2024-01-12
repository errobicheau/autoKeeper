
//Removes the time zone and stuff from the date
function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const dateParts = new Date(dateString).toLocaleDateString('en-US', options).split('/');
    return `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`;
}
