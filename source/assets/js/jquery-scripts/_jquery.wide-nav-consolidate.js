//
// legacy solution for consolidating nav items -- when screesn isn't wide enough to display all items on one line, consolidate to new menu
//

$(function() {

  //Consolidate nav items when there's not enough space to display them all

  function wideNav() {

    var navWidth = 0;
    var primaryListWrapper = $(".wide-nav__inner-wrapper");
    var primaryList = $(".wide-nav__list");
    var primaryListItem = $(".wide-nav__list-item:not(.wide-nav__more-container)");
    var primaryListItems = primaryList.find("> li:not(.wide-nav__more-container)");
    var moreContainer = $(".wide-nav__more-container");

    var moreListItems = moreList.find("> li");
    var moreWidth = primaryList.find('.wide-nav__more-container').outerWidth(true);

    var primaryListDropdownTitle = $(".wide-nav-sub__title");

    primaryListItems.each(function() {

      navWidth += $(this).outerWidth( true );

    });

    var availablespace = primaryListWrapper.outerWidth(true) - moreWidth;

    if ((navWidth+moreWidth) > availablespace) {

     var lastItem = primaryListItems.last();
     addToMore(lastItem);

      wideNav();

      if ((lastItem.position().left + lastItem.outerWidth(true)) >= moreContainer.position().left) {
         var lastItem = primaryListItems.last();
         addToMore(lastItem);
      }

    }

    else {

      var firstMoreElement = moreListItems.first();

      if (navWidth + firstMoreElement.data('width') < availablespace) {

        // Reset primary nav URL to be hash
        firstMoreElement.find(".wide-nav__link--with-menu").attr("href", "#");

        firstMoreElement.insertBefore(moreContainer);

      }

    }

    if ($(".wide-nav__more-container > ul > li").length > 0) {

      moreContainer.css('display','inline-block');


    }

    else {

      moreContainer.css('display','none');

    }

  }

  $(window).on('load',function(){

  });

  function addToMore(whichNavItem) {

      var lastItemTitleURL = whichNavItem.find(".wide-nav-sub__title").attr("href");
      whichNavItem.attr('data-width', whichNavItem.outerWidth(true));

      whichNavItem.prependTo(moreList);

      // Temporarily replace hash with URL of title link from dropdown
      whichNavItem.find(".wide-nav__link").attr("href",lastItemTitleURL);
  }

  Throttle resize event
  https://gomakethings.com/javascript-resize-performance/

  var resizeTimer; // Set resizeTimer to empty so it resets on page load

  function resizeFunction() {

    // Stuff that should happen on resize

    //wideNav();

  }

  On resize, run the function and reset the timeout
  Delay is in milliseconds. Change as you see fit.

  $(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeFunction, 300);
  });

  Show/hide consolidated menu

  function showConsolidatedNav() {

    var showMoreBtn = $(".wide-nav__more-btn");
    var showMoreList = $(".wide-nav__more-btn + ul");

    showMoreBtn.bind("tap click", showMoreBtnHandler);

    function showMoreBtnHandler(event) {

      $(this).next().toggleClass("active");

    }

    // Reset menu when clicking outside of it

    $(document).bind('tap click', function() {

      showMoreList.removeClass("active");

    });

    showMoreBtn.bind('tap click', function(event) {

      var menuBtn = $(".wide-nav__link--with-menu");
      menuBtn.removeClass("active");
      menuBtn.next().removeClass("active");

      event.stopPropagation();

    });

  }

  showConsolidatedNav();

}());
