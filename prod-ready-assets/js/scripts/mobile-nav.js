//
// mobile nav -- toggle visibility of menu and search box
//

$(function() {

  function mobileNav() {

    var primaryMenuBtn = $(".gr-c-mobile-nav__btn--menu"), 
        primarySearchBtn = $(".gr-c-mobile-nav__btn--search"), 
        menu = $(".gr-c-mobile-nav__menu"), 
        search = $(".gr-c-mobile-nav__search-box"), 
        searchInput = search.find(".gr-c-search-box__text-input");

    primaryMenuBtn.click(function() {

      // For the menu, we're toggling an "active" class instead of changing visibility (show/hide) because the Slinky component needs to be technically visible in order to display properly. We display the menu off screen and use the "active" class brings it into view. 

      menu.toggleClass("active");
      search.hide();

    });

    primarySearchBtn.click(function(e) {

      search.toggle(); 
      menu.removeClass("active"); 
      searchInput.focus();

    });

  }

  mobileNav();

}());