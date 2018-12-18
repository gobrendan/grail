//
// tab menu helper -- allow collapsing of tabs
//

$(function() {

  // uncheck other checkboxes when one is changed

  $(".gr-c-tab-menu__input").on('change', function() {

    $(".gr-c-tab-menu__input").not(this).prop('checked', false);  

  });
  
}());
