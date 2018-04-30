//
// feedback form toggle
//

$(function() {

  /*
    Rely on CSS transition property for expand/condense animation.
    For browsers that don't support CSS transitions (IE 9), simply show/hide feedback form.
    We might be able to refactor this to use jQuery's animate method (supported in IE 9), if needed.
  */

  var feedbackForm = $(".csstransitions .feedback-form"),
      feedbackFormNoTransitions = $(".no-csstransitions .feedback-form"),
      feedbackFormToggleBtn = $(".back-up__text-link, .feedback-form__cancel-btn");

  feedbackFormToggleBtn.bind("click", feedbackFormToggleBtnHandler);

  function feedbackFormToggleBtnHandler(event) {

    feedbackForm.toggleClass("feedback-form--open");
    feedbackFormNoTransitions.toggle();

    return false;

  }

}());
