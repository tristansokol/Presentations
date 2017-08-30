
Reveal.addEventListener( 'slidechanged', function( event ) {
  if(event.indexh==6){
    if(window.paymentForm){
      window.paymentForm.destroy();
      delete window.paymentForm
    }
    if(window.paymentForm8){
      window.paymentForm8.destroy();
      delete window.paymentForm8
    }
    console.log('building payment for m6')
    createForm6()
  }else if(event.indexh==5){
    if(window.paymentForm2){
      window.paymentForm2.destroy();
      delete window.paymentForm2
    }
    if(window.paymentForm8){
      window.paymentForm8.destroy();
      delete window.paymentForm8
    }
    console.log('building payment for 5')
    createForm5()
  }else if(event.indexh==9){
    document.getElementById('idem2').innerHTML = guid();
  }else if(event.indexh==8){
    if(window.paymentForm2){
      window.paymentForm2.destroy();
      delete window.paymentForm2
    }
    if(window.paymentForm){
      window.paymentForm.destroy();
      delete window.paymentForm
    }
    if(!window.paymentForm8 ){
      createForm8();
      console.log('building payment for 8')
    }
  }

  // event.previousSlide, event.currentSlide, event.indexh, event.indexv

} );
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
  s4() + '-' + s4() + s4() + s4();
}




var applicationId = 'sandbox-sq0idp-jdEW5rWHcW5HeoMDfSPfyg'; // <-- Add your application's ID here
// Initializes the payment form. See the documentation for descriptions of
// each of these parameters.
// 
function createForm5(){

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
    inputStyles: [
    {
      fontSize: '30px',
      fontWeight: 'bold',
      lineHeight: '30px',
      backgroundColor:'#eff0f1'
    }
    ],
    callbacks: {
      cardNonceResponseReceived: function(errors, nonce, cardData) {

      }
    },
  });
  window.paymentForm.build()
}

    //sldie 6
////////////////////////////////////////////////////////////////
function createForm6(){

  window.paymentForm2 = new SqPaymentForm({
    applicationId: 'sandbox-sq0idp-jdEW5rWHcW5HeoMDfSPfyg',
    inputClass: 'sq-input',
    inputStyles: [
    {
      fontSize: '30px',
      fontWeight: 'bold',
      lineHeight: '30px',
      backgroundColor:'#eff0f1'
    }
    ],
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
    callbacks: {

        // Called when the SqPaymentForm completes a request to generate a card
        // nonce, even if the request failed because of an error.
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
            document.getElementById("6-nonce").innerHTML = nonce
            document.cardNonce = nonce;
            document.getElementById("idem").innerHTML = guid()
            document.getElementById("7-nonce").innerHTML= nonce
          }
        },
      }
    });

    // This function is called when a buyer clicks the Submit button on the webpage
    // to charge their card.

    window.paymentForm2.build()
  }
  function requestCardNonce(event) {
      // This prevents the Submit button from submitting its associated form.
      // Instead, clicking the Submit button should tell the SqPaymentForm to generate
      // a card nonce, which the next line does.
      event.preventDefault();

      window.paymentForm2.requestCardNonce();
    }
    ////////////////////////slide 8///////////////////////////
    function createForm8(){

      window.paymentForm8 = new SqPaymentForm({
        applicationId: 'sandbox-sq0idp-jdEW5rWHcW5HeoMDfSPfyg',
        inputClass: 'sq-input',
        inputStyles: [
        {
          fontSize: '30px',
          fontWeight: 'bold',
          lineHeight: '30px',
          backgroundColor:'#eff0f1'
        }
        ],
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
        callbacks: {

        // Called when the SqPaymentForm completes a request to generate a card
        // nonce, even if the request failed because of an error.
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
            document.getElementById("6-nonce").innerHTML = nonce
            document.cardNonce = nonce;
            document.getElementById("8-idem").innerHTML = guid()
            document.getElementById("7-nonce").innerHTML= nonce
            document.getElementById("8-nonce").innerHTML = nonce
            document.getElementById("8-nonce1").innerHTML = nonce
          }
        },
      }
    });

    // This function is called when a buyer clicks the Submit button on the webpage
    // to charge their card.

    window.paymentForm8.build()
  }
  function requestCardNonce8(event) {
      // This prevents the Submit button from submitting its associated form.
      // Instead, clicking the Submit button should tell the SqPaymentForm to generate
      // a card nonce, which the next line does.
      event.preventDefault();

      window.paymentForm8.requestCardNonce();
    }