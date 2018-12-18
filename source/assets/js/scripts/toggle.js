//
// toggle
//

$(function() {

  // general toggle function

  function toggle() {

    $(".gr-c-toggle__link").click(function(e) {

      // if element doesn't have active class, give it active class and remove it from sibling

      if (!$(this).hasClass("gr-c-toggle__link--active") ) {

        $(this).addClass("gr-c-toggle__link--active");
        $(this).siblings().removeClass("gr-c-toggle__link--active");

      }

      e.preventDefault();

    });

  }

  toggle();


  // list/calendar toggle

  function calendarToggle() {

    $(".gr-c-calendar__toggle").find(".gr-c-toggle__link").click(function(e) {

      // if element doesn't have active class, give it active class and remove it from sibling

      if ($(this).hasClass("gr-c-toggle__link--list") ) {

        $(".calendar-list").show();
        $(".fc-view-container").hide();

      }

      if ($(this).hasClass("gr-c-toggle__link--grid") ) {

        $(".calendar-list").hide();
        $(".fc-view-container").show();

      }

      e.preventDefault();

    });

  }

  calendarToggle();

}());
