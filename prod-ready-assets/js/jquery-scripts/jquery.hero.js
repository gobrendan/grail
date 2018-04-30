//
// Hero component
//

$(function() {

  // Hide broken images -- broken images increase component height
  //
  // Help: http://stackoverflow.com/questions/3235913/how-to-silently-hide-image-not-found-icon-when-src-source-image-is-not-found
  //       http://stackoverflow.com/questions/22051573/how-to-hide-image-broken-icon-using-only-css-html-without-js

  $(".hero img").error(function () {

    $(this).hide();

    // Use visibility technique if hiding the image will affect the layout
    // $(this).css({visibility:"hidden"});

  });

}());
