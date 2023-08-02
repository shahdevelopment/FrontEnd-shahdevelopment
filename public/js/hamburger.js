var ham2 = document.querySelector(".hamburger-menu");

var cellNum = document.getElementById("phonum");
var emailUrl = document.getElementById("email");

ham2.addEventListener("click", function () {
    const menu = document.querySelector("#menu-bar")
    menu.classList.toggle("show")
});

async function fetchData() {
    // Asynchronous operation
    const response = await emailUrl.addEventListener("click", function () {
        alert("Opening your default Email Application!")
    });
}

cellNum.addEventListener("click", function (event) {
    event.preventDefault();
    // Text to be copied
    var textToCopy = "+16043581493";

    // Use the Clipboard API to copy the text to the clipboard
    navigator.clipboard.writeText(textToCopy)
        .then(function () {
            // Text successfully copied
            alert("Phone number copied to clipboard!");
        })
        .catch(function (error) {
            // Unable to copy text
            console.error("Failed to copy text: ", error);
        });
});