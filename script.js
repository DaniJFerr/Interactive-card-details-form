
document.addEventListener('DOMContentLoaded', function() {
  const confirmButton = document.querySelector('button');

  confirmButton.addEventListener('click', function(event) {
    event.preventDefault();

    const cardNumberInput = document.querySelector('.card-number input');
    const cardNameInput = document.querySelector('.card-name input');
    const dateCardCvcInputs = document.querySelectorAll('.date-card-cvc input');

    const cardNumberValue = cardNumberInput.value.trim().replace(/\s+/g, '');
    const formattedCardNumber = cardNumberValue.replace(/(.{4})/g, ' $1 ');

    const isValidCardName = cardNameInput.value !== '';
    const isValidCardNumber = /^\d{16}$/.test(cardNumberValue);
    const isValidMonth = dateCardCvcInputs[0].value !== '';
    const isValidYear = dateCardCvcInputs[1].value !== '';
    const isValidCVC = /^\d{3}$/.test(dateCardCvcInputs[2].value);

    if (!isValidCardName || !isValidCardNumber || !isValidMonth || !isValidYear || !isValidCVC) {
      handleInputError(cardNameInput, 'Please fill your name on card.');
      handleInputError(cardNumberInput, 'Please fill the card number.');
      handleInputError(dateCardCvcInputs[0], 'Please fill in a month.');
      handleInputError(dateCardCvcInputs[1], 'Please fill in a year.');
      handleInputError(dateCardCvcInputs[2], 'Please fill in the CVC or insert max 3 digits.');
      return;
    }else{  
      restoreOriginalStyle(cardNameInput);
      restoreOriginalStyle(cardNumberInput);
      restoreOriginalStyle(dateCardCvcInputs[0]);
      restoreOriginalStyle(dateCardCvcInputs[1]);
      restoreOriginalStyle(dateCardCvcInputs[2]);
    }

    const errorMessages = document.querySelectorAll('.error');
    errorMessages.forEach(msg => msg.remove());

    const cardNumberElement = document.querySelector('#Card-front h1');
    const cardNameElement = document.querySelector('#Card-front h2');
    const cardDateElement = document.querySelector('#Card-front p');
    const cardCvcElement = document.querySelector('#Card-back .cardCvc');
    const confirmEvent = document.querySelector('.confirmation');
    const formEvent = document.querySelector('.formEvent');

    const cardDate = `${dateCardCvcInputs[0].value}/${dateCardCvcInputs[1].value}`;

    cardNumberElement.innerText = formattedCardNumber;
    cardNameElement.innerText = cardNameInput.value;
    cardDateElement.innerText = cardDate;
    cardCvcElement.innerText = dateCardCvcInputs[2].value;
    confirmEvent.removeAttribute('hidden');
    formEvent.setAttribute('hidden', '');
    document.getElementById('cardholder').style.height = "100px";
    document.querySelector('.button').classList.add('onclic');

    setTimeout(function() {
      document.querySelector('.button').classList.remove('onclic');
      document.querySelector('.button').classList.add('validate');
      setTimeout(function() {
        document.querySelector('.button').classList.remove('validate');
      }, 1250);
    }, 1250);
  });

  function handleInputError(input, message) {
    if (!input.parentElement.querySelector('.error')) {
      const error = document.createElement('p');
      error.classList.add('error');
      error.textContent = message;
      error.style.color = 'red';
      input.parentElement.appendChild(error);
      input.style.border='2px solid red';
      input.classList.add('error-input');
    }
  }

  function restoreOriginalStyle(input) {
    const errorMessage = input.parentElement.querySelector('.error');
    if (errorMessage) {
      errorMessage.remove();
    }
    input.classList.remove('error-input');
  }
});
