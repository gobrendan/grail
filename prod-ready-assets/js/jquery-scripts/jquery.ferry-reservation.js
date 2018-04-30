//
// ferry reservation
//

function ferryReservations() {

  // variables

  var reservationStartBtn = $(".reservation-btn--start"),
      reservationInitialBtn = $(".reservation-btn--initial"),
      reservationReserveBtn = $(".reservation-btn--reserve"),
      reservationAddBtn = $(".reservation-btn--add"),
      reservationCheckoutBtn = $(".reservation-btn--checkout"),
      reservationSubmitBtn = $(".reservation-btn--submit"),

      reservationSection = $(".reservation-section"),
      reservationInitialSection = $(".reservation-section--initial"),
      reservationReserveSection = $(".reservation-section--reserve"),
      reservationTripAddedSection = $(".reservation-section--trip-added"),
      reservationCheckoutSection = $(".reservation-section--checkout"),
      reservationCompleteSection = $(".reservation-section--complete");

  // hide steps, but show initial view

  reservationSection.hide();
  reservationInitialSection.show();

  // go to 'reserve' step'

  reservationStartBtn.bind("tap", reservationStartBtnHandler);

  function reservationStartBtnHandler(event) {

    reservationSection.hide();
    reservationReserveSection.show();

  }

  // go to 'reserve' step

  reservationReserveBtn.bind("tap", reservationReserveBtnHandler);

  function reservationReserveBtnHandler(event) {

    reservationSection.hide();
    reservationReserveSection.show();

  }

  // go to initial view

  reservationInitialBtn.bind("tap", reservationInitialBtnHandler);

  function reservationInitialBtnHandler(event) {

    reservationSection.hide();
    reservationInitialSection.show();

  }

  // add to cart

  reservationAddBtn.bind("tap", reservationAddBtnHandler);

  function reservationAddBtnHandler(event) {

    reservationSection.hide();
    reservationTripAddedSection.show();

  }

  // go to checkout

  reservationCheckoutBtn.bind("tap", reservationCheckoutBtnHandler);

  function reservationCheckoutBtnHandler(event) {

    reservationSection.hide();
    reservationCheckoutSection.show();

  }

  // go to confirmation page

  reservationSubmitBtn.bind("tap", reservationSubmitBtnHandler);

  function reservationSubmitBtnHandler(event) {

    reservationSection.hide();
    reservationCompleteSection.show();

  }

}

$(function() {

  ferryReservations();

}());
