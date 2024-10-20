const submitButton = document.querySelector('#submit');
const outPutElement = document.querySelector('#output');
const inputElement = document.querySelector('input');
const historyElement = document.querySelector('.history');
const buttonElement = document.querySelector('.new_chat');
const inputContainer = document.querySelector('.input-container');

function changeInput(value) {
    const inputElement = document.querySelector('input');
    inputElement.value = value;
}

async function getMessage(backend) {
    console.log('Clicked');
    alert('Sending Chat.......');
    const baseUrl = `${backend}/chat`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: inputElement.value }],
            max_tokens: 100
        })
    };
    fetch(baseUrl, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error: ' + response.status);
            }
        })
        .then(data => {
            outPutElement.textContent = data.choices[0].message.content
            if (data.choices[0].message.content && inputElement.value) {
                const pElement = document.createElement('p')
                pElement.textContent = inputElement.value
                pElement.addEventListener('click', () => changeInput(pElement.textContent))
                historyElement.append(pElement)
            }
        })
        .catch(error => {
            console.error(error)
        })
}

inputContainer.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        getMessage();
    }
});

submitButton.addEventListener('click', getMessage);

function clearInput() {
    inputElement.value = '';
}

buttonElement.addEventListener('click', clearInput);