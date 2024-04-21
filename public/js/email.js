
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const formData = new FormData(this); // Get form data

    // Convert form data to object
    const formDataObject = {};
    formData.forEach(function(value, key) {
        formDataObject[key] = value;
    });

    console.log(formDataObject)
    console.log('Clicked');
    alert('Sending email.......');
    const baseUrl = 'http://kubernetes.shahsportfolio.online/email'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({formDataObject})
    };
    fetch(baseUrl, options)
        .then(response => {
            if (response.ok) {
                alert("Appointment Booking Request Sent!")
            } else {
                throw new Error('Error: ' + response.status);
            }
        })
});
