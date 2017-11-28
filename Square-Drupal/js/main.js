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

function updateCustomer(id) {
  document.getElementById('8-customer').innerHTML = id.value;
  document.getElementById('8-customer1').innerHTML = id.value;
}

function updateCard(id) {
  document.getElementById('8-customer-card').innerHTML = id.value;
}
Reveal.addEventListener('form0', function() {
  // slide based events
  console.log('form0');
  destroyForm();
  window.paymentForm = new SqPaymentForm({
    applicationId: applicationId,
    inputClass: 'sq-inputs',
    cardNumber: {
      elementId: 'sq-card-number-5',
      placeholder: '•••• •••• •••• ••••'
    },
    cvv: {
      elementId: 'sq-cvv-5',
      placeholder: 'CVV'
    },
    expirationDate: {
      elementId: 'sq-expiration-date-5',
      placeholder: 'MM/YY'
    },
    postalCode: {
      elementId: 'sq-postal-code-5'
    },
    inputStyles: [{
      fontSize: '30px',
      fontWeight: 'bold',
      lineHeight: '30px',
      backgroundColor: '#eff0f1'
    }],
    callbacks: {
      cardNonceResponseReceived: function(errors, nonce, cardData) {}
    }
  });
  window.paymentForm.build();
}, false);
Reveal.addEventListener('form1', function() {
  destroyForm();
  /*
   * function: requestCardNonce
   *
   * requestCardNonce is triggered when the "Pay with credit card" button is
   * clicked
   *
   * Modifying this function is not required, but can be customized if you
   * wish to take additional action when the form button is clicked.
   */
  function requestCardNonce(event) {

    // Don't submit the form until SqPaymentForm returns with a nonce
    event.preventDefault();

    // Request a nonce from the SqPaymentForm object
    window.paymentForm.requestCardNonce();
  }

  // Create and initialize a payment form object
  window.paymentForm = new SqPaymentForm({

    // Initialize the payment form elements
    applicationId: applicationId,
    locationId: locationId,
    inputClass: 'sq-input',

    // Customize the CSS for SqPaymentForm iframe elements
    inputStyles: [{
      fontSize: '.9em'
    }],

    // Initialize Apple Pay placeholder ID
    applePay: {
      elementId: 'sq-apple-pay1'
    },

    // Initialize Masterpass placeholder ID
    masterpass: {
      elementId: 'sq-masterpass1'
    },

    // Initialize the credit card placeholders
    cardNumber: {
      elementId: 'sq-card-number1',
      placeholder: '•••• •••• •••• ••••'
    },
    cvv: {
      elementId: 'sq-cvv1',
      placeholder: 'CVV'
    },
    expirationDate: {
      elementId: 'sq-expiration-date1',
      placeholder: 'MM/YY'
    },
    postalCode: {
      elementId: 'sq-postal-code1'
    },

    // SqPaymentForm callback functions
    callbacks: {

      /*
       * callback function: methodsSupported
       * Triggered when: the page is loaded.
       */
      methodsSupported: function(methods) {

        var applePayBtn = document.getElementById('sq-apple-pay');
        var applePayLabel = document.getElementById('sq-apple-pay-label');
        var masterpassBtn = document.getElementById('sq-masterpass1');
        var masterpassLabel = document.getElementById('sq-masterpass-label');

        // Only show the button if Apple Pay for Web is enabled
        // Otherwise, display the wallet not enabled message.
        if (methods.applePay === true) {
          applePayBtn.style.display = 'inline-block';
          applePayLabel.style.display = 'none';
        }
        // Only show the button if Masterpass is enabled
        // Otherwise, display the wallet not enabled message.
        if (methods.masterpass === true) {
          masterpassBtn.style.display = 'inline-block';
          masterpassLabel.style.display = 'none';
        }
      },

      /*
       * callback function: createPaymentRequest
       * Triggered when: a digital wallet payment button is clicked.
       */
      createPaymentRequest: function() {

        var paymentRequestJson;
        /* ADD CODE TO SET/CREATE paymentRequestJson */
        return paymentRequestJson;
      },

      /*
       * callback function: cardNonceResponseReceived
       * Triggered when: SqPaymentForm completes a card nonce request
       */
      cardNonceResponseReceived: function(errors, nonce, cardData) {},

      /*
       * callback function: paymentFormLoaded
       * Triggered when: SqPaymentForm is fully loaded
       */
      paymentFormLoaded: function() {
        /* HANDLE AS DESIRED */
      }
    }
  });
  window.paymentForm.build();
}, false);

Reveal.addEventListener('card-nonce-generation-test', function() {
  // slide based events
  console.log('build form');
  window.paymentForm = new SqPaymentForm({
    applicationId: applicationId,
    inputClass: 'sq-inputs',
    cardNumber: {
      elementId: 'sq-card-number-6',
      placeholder: '•••• •••• •••• ••••'
    },
    cvv: {
      elementId: 'sq-cvv-6',
      placeholder: 'CVV'
    },
    expirationDate: {
      elementId: 'sq-expiration-date-6',
      placeholder: 'MM/YY'
    },
    postalCode: {
      elementId: 'sq-postal-code-6'
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
          document.getElementById("6-nonce").innerHTML = nonce;
          document.cardNonce = nonce;
          document.getElementById("7-nonce").innerHTML = nonce
          document.getElementById("8-nonce1").innerHTML = nonce
        }
      }
    }
  });
  window.paymentForm.build();



}, false);
Reveal.addEventListener('card-on-file', function() {
  // slide based events
  console.log('build form');
  window.paymentForm = new SqPaymentForm({
    applicationId: applicationId,
    inputClass: 'sq-inputs',
    cardNumber: {
      elementId: 'sq-card-number-8',
      placeholder: '•••• •••• •••• ••••'
    },
    cvv: {
      elementId: 'sq-cvv-8',
      placeholder: 'CVV'
    },
    expirationDate: {
      elementId: 'sq-expiration-date-8',
      placeholder: 'MM/YY'
    },
    postalCode: {
      elementId: 'sq-postal-code-8'
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
          document.getElementById("8-nonce1").innerHTML = nonce
          document.cardNonce = nonce;
          document.getElementById("8-idem").innerHTML = guid()
          document.getElementById("7-nonce").innerHTML = nonce
          document.getElementById("8-nonce").innerHTML = nonce
          document.getElementById("8-nonce1").innerHTML = nonce
        }
      }
    }
  });
  window.paymentForm.build();



}, false);

function requestCardNonce(event) {
  // This prevents the Submit button from submitting its associated form.
  // Instead, clicking the Submit button should tell the SqPaymentForm to generate
  // a card nonce, which the next line does.
  event.preventDefault();

  window.paymentForm.requestCardNonce();
}
Reveal.addEventListener('slidechanged', function(event) {
  // event.previousSlide, event.currentSlide, event.indexh, event.indexv
  // desroy all payment forms for each slide turn.
  //destroyForm();

});
document.getElementById("8-idem").innerHTML = guid();
document.getElementById("idem").innerHTML = guid();
document.getElementById("idem2").innerHTML = guid();
function destroyForm() {
  console.log('destroying form');
  if (window.paymentform) {
    window.paymentForm.destroy();
  }
}
