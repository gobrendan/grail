//
// primary nav
//

$(function() {

  function primaryNav() {

    // show related menu on click

    $(".gr-c-primary-nav__link").click(function(e) {

      // remove 'active' class from all links that might have it

      $(this).closest(".gr-c-primary-nav__item").siblings().find(".gr-c-primary-nav__link").removeClass("gr-c-primary-nav__link--active");

      // toggle 'active' class on this link

      if ( $(this).hasClass("gr-c-primary-nav__link--active") ) {

        $(this).removeClass("gr-c-primary-nav__link--active");

      }

      else {

        $(this).addClass("gr-c-primary-nav__link--active");

      }

      e.preventDefault();
      e.stopPropagation();

    }); 

    // clicking inside menu shouldn't close the menu

    $(".gr-c-primary-nav__menu").click(function(e) {

      e.stopPropagation();

    });

    // clicking anywhere outside of the menu should close the menu

    $(document).on('click', function(e) {

      $(".gr-c-primary-nav__link").removeClass("gr-c-primary-nav__link--active");

    });

  }

  primaryNav();
  
}());
