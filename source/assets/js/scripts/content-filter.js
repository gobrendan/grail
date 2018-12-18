//
// content filter
//

$(function() {

  function contentFilter() {

    var filterBtn = $(".gr-c-article-header__filter-btn, .gr-c-article-block__filter-btn"), 
        sideBar =   $(".gr-l-main__side"), 
        content =   $(".gr-l-main__content");

    // click button to display filter

    filterBtn.click(function(e) { 

      sideBar.addClass("gr-l-main__side--active");
      content.addClass("gr-l-main__content--inactive");
      
      e.stopPropagation();

      // prevent page scroll when closing modal
      
      var x = window.pageXOffset,
          y = window.pageYOffset;
      $(window).one('scroll', function () {
        window.scrollTo(x, y);
      });

    });

    // swipe filter to close
    
    sideBar.on("swipeleft", swipeleftHandler); // bind swipeleftHandler callback function to the swipe event

    function swipeleftHandler(event) { // callback function for swipeleftHandler

      sideBar.removeClass("gr-l-main__side--active");
      content.removeClass("gr-l-main__content--inactive");

    }

    // click main content to close filter

    content.click(function(e) { 

      sideBar.removeClass("gr-l-main__side--active");
      content.removeClass("gr-l-main__content--inactive");
      
    });

  }

  contentFilter();

}());
