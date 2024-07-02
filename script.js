document.addEventListener('DOMContentLoaded', () => {
    const cardNameInput = document.getElementById('cardName');
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryMonthInput = document.getElementById('expiryMonth');
    const expiryYearInput = document.getElementById('expiryYear');
    const cvcInput = document.getElementById('cvc');

    const cardNumberDisplay = document.querySelector('.card-number');
    const cardNameDisplay = document.querySelector('.card-name');
    const cardExpiryDisplay = document.querySelector('.card-expiry');
    const cardCvcDisplay = document.querySelector('.card-cvc');

    const form = document.getElementById('cardForm');
    const thankYouSection = document.querySelector('.thank-you');
    const formContainer = document.querySelector('.container'); // Changed selector to target the correct container
    const continueButton = document.getElementById('continueButton');

    cardNameInput.addEventListener('input', () => {
        cardNameDisplay.textContent = cardNameInput.value.toUpperCase() || 'JANE APPLESEED';
    });

    cardNumberInput.addEventListener('input', () => {
        cardNumberDisplay.textContent = formatCardNumber(cardNumberInput.value) || '0000 0000 0000 0000';
    });

    expiryMonthInput.addEventListener('input', updateExpiry);
    expiryYearInput.addEventListener('input', updateExpiry);

    cvcInput.addEventListener('input', () => {
        cardCvcDisplay.textContent = cvcInput.value || '000';
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let isValid = true;

        if (!cardNameInput.value.trim()) {
            isValid = false;
            cardNameInput.classList.add('invalid');
        } else {
            cardNameInput.classList.remove('invalid');
        }

        const cardNumber = cardNumberInput.value.trim().replace(/\s+/g, '');
        if (!/^\d{16}$/.test(cardNumber)) {
            isValid = false;
            cardNumberInput.classList.add('invalid');
        } else {
            cardNumberInput.classList.remove('invalid');
        }

        const expiryMonth = expiryMonthInput.value.trim();
        const expiryYear = expiryYearInput.value.trim();
        if (!/^\d{2}$/.test(expiryMonth) || !/^\d{2}$/.test(expiryYear)) {
            isValid = false;
            expiryMonthInput.classList.add('invalid');
            expiryYearInput.classList.add('invalid');
        } else {
            expiryMonthInput.classList.remove('invalid');
            expiryYearInput.classList.remove('invalid');
        }

        const cvc = cvcInput.value.trim();
        if (!/^\d{3,4}$/.test(cvc)) {
            isValid = false;
            cvcInput.classList.add('invalid');
        } else {
            cvcInput.classList.remove('invalid');
        }

        if (isValid) {
            form.style.display = 'none';
            thankYouSection.style.display = 'flex';
        } else {
            alert('Please correct the errors and try again.');
        }
    });

    continueButton.addEventListener('click', () => {
        alert('Continue button clicked.');
    });

    function formatCardNumber(value) {
        return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    function updateExpiry() {
        const month = expiryMonthInput.value.padStart(2, '0');
        const year = expiryYearInput.value.padStart(2, '0');
        cardExpiryDisplay.textContent = `${month}/${year}` || '00/00';
    }
});
