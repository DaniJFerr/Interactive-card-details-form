document.addEventListener('DOMContentLoaded', function() {
    const confirmButton = document.querySelector('button');
    const cardNumberInput = document.querySelector('.card-number input');
    const cardNameInput = document.querySelector('.card-name input');
    const dateCardCvcInputs = document.querySelectorAll('.date-card-cvc input');
    const confirmEvent = document.querySelector('.confirmation');
    const formEvent = document.querySelector('.formEvent');
    const cardNumberElement = document.querySelector('#Card-front h1');
    const cardNameElement = document.querySelector('#Card-front h2');
    const cardDateElement = document.querySelector('#Card-front p');
    const cardCvcElement = document.querySelector('#Card-back .cardCvc');
  
    confirmButton.addEventListener('click', function(event) {
      event.preventDefault();
      
  
      // Check if all fields are filled in  
      if (cardNameInput.value === '') {
        handleInputError(cardNameInput, 'Please fill your name on card.');
        return;
      } else {
        restoreOriginalStyle(cardNameInput);
      }
      if (cardNumberInput.value === '') {
        handleInputError(cardNumberInput, 'Please fill the card number.');
        return;
      }else if( cardNumberInput.value.length !== 16 || isNaN(cardNumberInput.value)){
        handleInputError(cardNumberInput, 'Please enter a valid 16 digit card number.');
        return;
      } else {
        restoreOriginalStyle(cardNumberInput);
      }
  
      // Insert spaces between every four characters of the card number.
      const cardNumberValue = cardNumberInput.value.trim().replace(/\s+/g, '');
      const formattedCardNumber = cardNumberValue.replace(/(.{4})/g, '$1 ');
  
      const isCardDateFilledIn = [...dateCardCvcInputs].every(input => input.value !== '');
      if (!isCardDateFilledIn) {
        handleInputError(dateCardCvcInputs[0], 'Please fill in a month.');
        handleInputError(dateCardCvcInputs[1], 'Please fill in a year.');
        return;
      } else {
        restoreOriginalStyle(dateCardCvcInputs[0]);
        restoreOriginalStyle(dateCardCvcInputs[1]);
      }
  
      if (dateCardCvcInputs[2].value === '') {
        handleInputError(dateCardCvcInputs[2], 'Please fill in the CVC.');
        return;
      }else if(dateCardCvcInputs[2].value.length !== 3) {
        handleInputError(dateCardCvcInputs[2], 'Please insert max 3 digits.');
        return;
      } else {
        restoreOriginalStyle(dateCardCvcInputs[2]);
      }
  
      // All fields are filled in, remove error messages
      const errorMessages = document.querySelectorAll('.error');
      errorMessages.forEach(msg => msg.remove());
  
      // Update card elements with input values
      const cardDate =`${dateCardCvcInputs[0].value}/${dateCardCvcInputs[1].value}`;
  
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
        setTimeout( function() {  
          document.querySelector('.button').classList.remove('validate');
        }, 1250);
      }, 1250);
  
    });
  
    function handleInputError(input, message) {
      if (!input.parentElement.querySelector('.error')) {
        const error = document.createElement('p');
        error.classList.add('error')      
        error.textContent = message;
        error.style.color = 'red';
        input.parentElement.appendChild(error);
        input.style.border='2px solid red';
      }
    }
  
    function restoreOriginalStyle(input) {
      const errorMessage = input.parentElement.querySelector('.error');
      if (errorMessage) {
        errorMessage.remove();
      }
      input.style.border= '';
    }
  });
  