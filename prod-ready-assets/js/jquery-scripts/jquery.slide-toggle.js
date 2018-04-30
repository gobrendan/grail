//
// slide toggle
//

$(function() {

  var list = $('.list-toggle'),
      listToggleBtn = list.find('.list-toggle__btn'),
      listToggleDetails = list.find('.list-toggle__details'),
      listToggleBtnActiveClass = "list-toggle__btn--active";

  listToggleDetails.hide();

  listToggleBtn.click(function() {

    if ( $(this).hasClass(listToggleBtnActiveClass) ) {

      listToggleBtn.removeClass(listToggleBtnActiveClass);
      listToggleDetails.slideUp();

    }

    else {

      listToggleBtn.removeClass(listToggleBtnActiveClass);
      listToggleDetails.slideUp();

      $(this).addClass(listToggleBtnActiveClass);
      $(this).next(listToggleDetails).slideToggle();

    }

    return false;

  });

}());
