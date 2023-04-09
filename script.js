// definisanje varijable inputs koja sadrži sve input elemente na stranici
let inputs = document.querySelectorAll('input');
// definisanje objekta errors koji sadrži nizove za greške za svaki input
let errors = {
    "ime_prezime": [],
    "korisnicko_ime": [],
    "email": [],
    "lozinka": [],
    "ponovi_lozinku": []
};

// dodavanje event listenera za svaki input element koji će pokrenuti funkciju za provjeru validnosti inputa
inputs.forEach((element) => {
    element.addEventListener('change', e => {
        // uzimanje trenutnog inputa
        let currentInput = e.target;
        // uzimanje vrijednosti trenutnog inputa
        let inputValue = currentInput.value;
        // uzimanje atributa name trenutnog inputa
        let inputName = currentInput.getAttribute('name');

        // provjera da li je input duži od 4 karaktera
        if (inputValue.length > 4) {
            // ako je duži od 4, brišu se prethodne greške za taj input
            errors[inputName] = [];

            // switch statement za provjeru validnosti različitih inputa
            switch (inputName) {
                case 'ime_prezime':
                    let validation = inputValue.trim();
                    validation = validation.split(" ");
                    if (validation.length < 2) {
                        errors[inputName].push('Morate napisati i ime i prezime');
                    }
                break;

                case 'email':
                    if (!validateEmail(inputValue)) {
                        errors[inputName].push('Nije ispravna email adresa');
                    }
                break;

                case 'ponovi_lozinku':
                    let lozinka = document.querySelector('input[name="lozinka"]').value;
                    if (inputValue !== lozinka) {
                        errors[inputName].push('Lozinke se ne poklapaju');
                    }
                break;
            }

        } else {
            // ako je input kraći od 5 karaktera, dodaje se greška
            errors[inputName] = ['Polje ne moze imati manje od 5 karaktera'];
        }
        // pozivanje funkcije za popunjavanje div elementa sa greškama
        populateErrors();
    });
});

// funkcija koja popunjava div elemente sa greškama
const populateErrors = () => {

    // brisanje svih postojećih div elemenata za prikaz grešaka
    for (let elem of document.querySelectorAll('ul')) {
        elem.remove();
    }

    // prolazak kroz sve ključeve u objektu errors i kreiranje novog div elementa za prikaz grešaka za svaki input
    for (let key of Object.keys(errors)) {
        let input = document.querySelector(`input[name="${key}"]`);
        let parentElement = input.parentElement;
        let errorsElement = document.createElement('ul');
        parentElement.appendChild(errorsElement);

        // prolazak kroz niz grešaka za trenutni input i kreiranje novog li elementa za svaku grešku
        errors[key].forEach(error => {
            let li = document.createElement('li');
            li.innerText = error;

            errorsElement.appendChild(li);
        })
    }
};

// funkcija za validaciju email adrese (REGEX)
const validateEmail = email => {
    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
        return true;
    }
    return false;
}