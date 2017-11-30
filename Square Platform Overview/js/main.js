'use strict';
var applicationId = 'sandbox-sq0idp-jdEW5rWHcW5HeoMDfSPfyg';
var locationId = 'BB4PDGY9EX5RA';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
document.getElementById("charge-idem").innerHTML = guid();
document.getElementById("recurring-idem").innerHTML = guid();
function updateCustomer(id) {
  document.getElementById('8-customer').innerHTML = id.value;
  document.getElementById('8-customer1').innerHTML = id.value;
}

function updateCard(id) {
  document.getElementById('8-customer-card').innerHTML = id.value;
}

function destroyForm() {
  console.log('destroying form');
  if (window.paymentform) {
    window.paymentForm.destroy();
  }
}

function requestCardNonce(event) {
  // This prevents the Submit button from submitting its associated form.
  // Instead, clicking the Submit button should tell the SqPaymentForm to generate
  // a card nonce, which the next line does.
  event.preventDefault();

  window.paymentForm.requestCardNonce();
}

function loadFormExample() {
  window.paymentForm = new SqPaymentForm({
    applicationId: applicationId,
    inputClass: 'sq-inputs',
    cardNumber: {
      elementId: 'sq-card-number-example',
      placeholder: '•••• •••• •••• ••••'
    },
    cvv: {
      elementId: 'sq-cvv-example',
      placeholder: 'CVV'
    },
    expirationDate: {
      elementId: 'sq-expiration-date-example',
      placeholder: 'MM/YY'
    },
    postalCode: {
      elementId: 'sq-postal-code-example'
    },
    inputStyles: [{
      fontSize: '30px',
      fontWeight: 'bold',
      lineHeight: '30px',
      backgroundColor: '#eff0f1'
    }],
    callbacks: {
      cardNonceResponseReceived: function(errors, nonce, cardData) {
        if (errors) {
          console.log("Encountered errors:");

          // This logs all errors encountered during nonce generation to the
          // Javascript console.
          errors.forEach(function(error) {
            console.log('  ' + error.message);
          });

          // No errors occurred. Extract the card nonce.
        } else {

          // Delete this line and uncomment the lines below when you're ready
          // to start submitting nonces to your server.
          //alert('Nonce received: ' + nonce);
          document.getElementById("card-nonce-generation-test-nonce").innerHTML = nonce;
          document.getElementById("charge-nonce").innerHTML = nonce

        }
      }
    }
  });
  window.paymentForm.build();
}

function loadCardNonceGenerationTest() {
  // slide based events
  destroyForm();
  window.paymentForm = new SqPaymentForm({
    applicationId: applicationId,
    inputClass: 'sq-inputs',
    cardNumber: {
      elementId: 'sq-card-number-card-nonce-generation-test',
      placeholder: '•••• •••• •••• ••••'
    },
    cvv: {
      elementId: 'sq-cvv-card-nonce-generation-test',
      placeholder: 'CVV'
    },
    expirationDate: {
      elementId: 'sq-expiration-date-card-nonce-generation-test',
      placeholder: 'MM/YY'
    },
    postalCode: {
      elementId: 'sq-postal-code-card-nonce-generation-test'
    },
    inputStyles: [{
      fontSize: '30px',
      fontWeight: 'bold',
      lineHeight: '30px',
      backgroundColor: '#eff0f1'
    }],
    callbacks: {
      cardNonceResponseReceived: function(errors, nonce, cardData) {
        if (errors) {
          console.log("Encountered errors:");

          // This logs all errors encountered during nonce generation to the
          // Javascript console.
          errors.forEach(function(error) {
            console.log('  ' + error.message);
          });

          // No errors occurred. Extract the card nonce.
        } else {

          // Delete this line and uncomment the lines below when you're ready
          // to start submitting nonces to your server.
          //alert('Nonce received: ' + nonce);
          document.getElementById("card-nonce-generation-test-nonce").innerHTML = nonce;
          document.getElementById("recurring-nonce").innerHTML = nonce;

          document.cardNonce = nonce;
        }
      }
    }
  });
  window.paymentForm.build();
}
// Reveal.addEventListener('card-nonce-generation-test', function() {
//   var fragment = document.createDocumentFragment();
//   fragment.appendChild(document.getElementById('payment-form'));
//   document.getElementById('card-nonce-generation-test-form').appendChild(fragment);
// }, false);
// Reveal.addEventListener('recurring-card', function() {
//   var fragment = document.createDocumentFragment();
//   fragment.appendChild(document.getElementById('payment-form'));
//   document.getElementById('recurring-card-form').appendChild(fragment);
// }, false);

Reveal.addEventListener('form-example', console.log, false);
loadFormExample();
