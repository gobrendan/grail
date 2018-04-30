//
// modal -- show/hide interactivity handled using only HTML/CSS
//

$(function() {

  // This function prevents scrolling the page when clicking modal links

  $(".a-modal").click(function (e) {

    var x = window.pageXOffset,
        y = window.pageYOffset;
    $(window).one('scroll', function () {
      window.scrollTo(x, y);
    })

  });

}());
