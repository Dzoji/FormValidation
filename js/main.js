// Select all input fields on the page
let inputs = document.querySelectorAll('input');

// An object to store error messages for each input field
let errors = {
    "ime_prezime": [],
    "telefon": [],
    "adresa_stanovanja": [],
    "kucni_broj": [],
    "postanski_broj": [],
    "mjesto": [],
    "email": []
};

// Add a change event listener to each input field
inputs.forEach((element) => {
    element.addEventListener('change', e => {
        // Get the current input field and its value and name
        let currentInput = e.target;
        let inputValue = currentInput.value;
        let inputName = currentInput.getAttribute('name');

        // If the input field has a value
        if (inputValue.length > 0) {
            // Reset the errors array for the input field
            errors[inputName] = [];

            // Check the input field based on its name
            switch (inputName) {
                case 'ime_prezime':
                    // Split the input value into first and last name
                    let ime_prezime = inputValue.trim();
                    ime_prezime = ime_prezime.split(" ");

                    // If there are not at least two names, add an error message
                    if (ime_prezime.length < 2) {
                        errors[inputName].push('Morate napisati i ime i prezime');
                    }
                    // If the name contains any non-alphabetic characters, add an error message
                    if (!/^[a-zA-Zčćžšđ\s]+$/.test(ime_prezime.join(" "))) {
                        errors[inputName].push('Morate unijeti samo slova');
                    }
                    break;

                case 'telefon':
                    // Get the value of the 'telefon' input field
                    let telefon = document.querySelector('input[name="telefon"]').value;
                    // If the phone number has fewer than 9 or more than 15 digits, add an error message
                    if (telefon.replace(/\s+/g, '').length < 9 || telefon.replace(/\s+/g, '').length > 15) {
                        errors[inputName].push('Broj telefona mora imati najmanje 9 a najviše 15 cifara');
                    }
                    // If the phone number does not match the required pattern, add an error message
                    let telefonPattern = /^(\d{3}\s){2,4}\d{3}$/;
                    if (!telefon.match(telefonPattern) && telefon.replace(/\s+/g, '').length > 0) {
                        errors[inputName].push('Unesite broj telefona u formatu 000 111 222 koristeći samo brojeve!');
                    }
                    break;

                case 'adresa_stanovanja':
                    // Get the value of the 'adresa_stanovanja' input field
                    let adresa_stanovanja = document.querySelector('input[name="adresa_stanovanja"]').value;
                    if (!/^[a-zA-Zčćžšđ\s\d]+$/.test(adresa_stanovanja)) {
                        errors[inputName].push('Morate unijeti ispravnu adresu stanovanja');
                    }

                    break;

                case 'kucni_broj':
                    // Get the value of the 'kucni_broj' input field
                    let kucni_broj = document.querySelector('input[name="kucni_broj"]').value;
                    if (!/^[a-zA-Z\s\d]*$/.test(kucni_broj)) {
                        errors[inputName].push('Morate unijeti ispravan kućni broj');
                    }
                    break;

                case 'postanski_broj':
                    // Get the value of the 'postanski_broj' input field
                    let postanski_broj = document.querySelector('input[name="postanski_broj"]').value;
                    if (!/^\d+$/.test(postanski_broj)) {
                        errors[inputName].push('Unesite brojeve za poštanski broj');
                    }
                    break;

                case 'mjesto':
                    // Get the value of the 'mjesto' input field
                    let mjesto = document.querySelector('input[name="mjesto"]').value;
                    if (!/^[a-zA-Zčćžšđ\s\d]+$/.test(mjesto)) {
                        errors[inputName].push('Unesite naziv mjesta');
                    }
                    break;

                case 'email':
                    // Check if the email is valid
                    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputValue)) {
                        errors[inputName].push('Unesite ispravnu email adresu');
                    }
                    break;

                default:
                    break;
            }

        } else {
            // If the input is empty, add an error message
            errors[inputName] = ['Polje ne može biti prazno'];
        }
        populateErrors();
    });
});

// Function to populate the error messages
const populateErrors = () => {

    // Remove all existing error lists from the document
    for (let elem of document.querySelectorAll('ul')) {
        elem.remove();
    }

    // Loop through each input field with an error and create an error list to display the messages
    for (let key of Object.keys(errors)) {
        let input = document.querySelector(`input[name="${key}"]`);
        let parentElement = input.parentElement;
        let errorsElement = document.createElement('ul');
        parentElement.appendChild(errorsElement);

        // Loop through each error message for the input field and create a list item to display the message
        errors[key].forEach(error => {
            let li = document.createElement('li');
            li.innerText = error;

            errorsElement.appendChild(li);
        })
    }
};

// Add event listener to 'naruci' button and prevent default form submission
document.getElementById('naruci').addEventListener('click', function (event) {
    event.preventDefault();

    let imePrezime = document.getElementById('ime_prezime').value;
    let telefon = document.getElementById('telefon').value;
    let adresaStanovanja = document.getElementById('adresa_stanovanja').value;
    let kucniBroj = document.getElementById('kucni_broj').value;
    let postanskiBroj = document.getElementById('postanski_broj').value;
    let mjesto = document.getElementById('mjesto').value;
    let email = document.getElementById('email').value;
    let posebneNapomene = document.getElementById('posebne_napomene').value;

    // Ime, prezime
    let imePrezimePattern = /^[a-zA-Zčćžšđ\s]+$/;
    if (!imePrezime.match(imePrezimePattern)) {
        populateErrors();
        return;
    }

    // Broj telefona
    let telefonPattern = /^(\d{3}\s){2,4}\d{3}$/;
    if (!telefon.match(telefonPattern)) {
        populateErrors();
        return;
    }


    // Adresa stanovanja
    let adresaStanovanjaPattern = /^[a-zA-Zčćžšđ\s\d]+$/;
    if (!adresaStanovanja.match(adresaStanovanjaPattern)) {
        populateErrors();
        return;
    }

    // Kucni broj
    let kucniBrojPattern = /^[a-zA-Z\s\d]+$/;
    if (!kucniBroj.match(kucniBrojPattern)) {
        populateErrors();
        return;
    }

    // Postanski broj
    let postanskiBrojPattern = /^\d+$/;
    if (!postanskiBroj.match(postanskiBrojPattern)) {
        populateErrors();
        return;
    }

    // Mjesto
    let mjestoPattern = /^[a-zA-Zčćžšđ\s\d]+$/;
    if (!mjesto.match(mjestoPattern)) {
        populateErrors();
        return;
    }

    // Email
    let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email.match(emailPattern)) {
        populateErrors();
        return;
    }

    console.log({
        'imePrezime': imePrezime,
        'telefon': telefon,
        'adresaStanovanja': adresaStanovanja,
        'kucniBroj': kucniBroj,
        'postanskiBroj': postanskiBroj,
        'mjesto': mjesto,
        'email': email,
        'posebneNapomene': posebneNapomene
    });


    // Reset the form
    document.getElementById('orderForm').reset();
});