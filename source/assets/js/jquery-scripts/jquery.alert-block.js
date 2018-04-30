//
// alert block -- toggle button to show/hide alert block carousels
//

function alertToggle() {

  var alertToggleBtn = $(".alert-toggle"),
      //alertToggleBtn = $("#alertToggle"),
      alertCloseBtn = $("#alertCloseBtn"),
      //alertBlock = $(".carousel--alerts"),
      alertBlock = $(".alerts-carousel-wrapper"),
      // topPixels = 30,
      animateSpeed = 600;

  // Add 'active' class to alert block

  // alertCloseBtn.addClass("active");

  alertToggleBtn.bind("click", alertToggleBtnHandler);

  // Open 'alert block'

  function alertToggleBtnHandler(event) {

    // If toggle button has 'active' class, show 'alert block' when tapped/clicked

    // if ( alertToggleBtn.hasClass("active") ) {

      // alertToggleBtn.removeClass("active");
      // alertCloseBtn.addClass("active");
      // alertBlock.slideDown("slow");
      alertBlock.show();

    // }
    
  }

  // Close 'alert block'

  alertCloseBtn.bind("click", alertCloseBtnHandler);

  function alertCloseBtnHandler(event) {

    // if (alertCloseBtn.hasClass("active")) {

      // alertCloseBtn.removeClass("active");

      // $(this).closest(alertBlock).slideUp("slow", function() {
      // alertBlock.slideUp("slow", function() {
          
      //   alertToggleBtn.addClass("active");

      // });

      // alertBlock.hide().addClass("active");
      alertBlock.hide();
      
    // }

  }

}

$(function() {

  alertToggle();

}());
