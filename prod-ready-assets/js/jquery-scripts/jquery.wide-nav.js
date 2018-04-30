//
// wide nav -- desktop navigation
//

$(function() {

  function wideNav() {

    var menuBtn = $(".wide-nav__link--with-menu"),
        expandedMenu = $(".wide-nav-sub"),
        showMoreList = $(".wide-nav__more-btn + ul"),
        moreList = $(".wide-nav__more-list"),
        headerHeight = $(".site-header").height(),
        desktopNav = $(".page-wrapper").find(".wide-nav"); // target element when viewed within a template/page (not in component's standalone demo)

    menuBtn.bind("click", menuBtnHandler);

    function menuBtnHandler(event) {

      //
      // update 'active' classes
      //

      $(this).toggleClass("active");
      $(this).next().toggleClass("active"); // this is referring to the sibling ".wide-nav-sub" element (the menu that gets displayed when clicking the menu button)
      showMoreList.removeClass("active");   // hide consolidated nav menu
      menuBtn.not(this).removeClass("active");
      menuBtn.not(this).next().removeClass("active");

      //
      // update button ARIA attributes
      //

      menuBtn.attr("aria-selected", ""); // reset all button 'aria-selected' attributes

      if ($(this).hasClass("active") ) {

        $(this).attr("aria-selected", "true");

      }

      //
      // update expanded menu ARIA attributes
      //

      if ( $(this).next().hasClass("active") ) {

        $(this).next().attr("aria-hidden", "false")
        $(this).next().attr("aria-expanded", "true")

      }

      else {

        $(this).next().attr("aria-hidden", "true")
        $(this).next().attr("aria-expanded", "false")

      }

      //
      // update tabindex
      //

      /* in progress */

      //
      // prevent page from scrolling to top
      //

      event.stopPropagation();

    }

    //
    // reset menu when clicking outside of it
    //

    $('.page-wrapper').bind('tap click', function(e) {

      var menuBtn = $(".wide-nav__link--with-menu");

      if(!$(e.target.offsetParent).is('.wide-nav-sub__title, .wide-nav, .wide-nav-sub__link, .wide-nav-sub-sub__link, .wide-nav-sub') ) {

        menuBtn.removeClass("active");
        menuBtn.next().removeClass("active");
        menuBtn.attr("aria-selected", "false");

      }

    });

    //
    // close menu when clicking anything but a link
    //

    $('.page-wrapper').click(function(e) {

      if(!$(e.target.offsetParent).is('.wide-nav-sub__title, .wide-nav, .wide-nav-sub__link, .wide-nav-sub-sub__link, .wide-nav-sub') ) {

        menuBtn.removeClass("active");
        menuBtn.next().removeClass("active");

      }

    });

    //
    // stick nav to top of viewport on scroll
    //

    $(window).scroll(function() {

      if ($(window).scrollTop() > headerHeight) {

        $(desktopNav).addClass("wide-nav--stuck")

      }

      else {

        $(desktopNav).removeClass("wide-nav--stuck")

      }

    });

    //
    // keyboard navigation (left, right, up, down buttons)
    //

    /* in progress */

  }

  wideNav();

}());
