//
// reactive.iframes init -- initalize responsive iframe script
//

function amtrakIframeResize() {

  if (document.getElementById("iframe-parent")) {

    var parentNode = document.getElementById('iframe-parent');
    new reactive.iframes.Parent(parentNode, 'frame-1');

  }

}

amtrakIframeResize();

//

// var amtrakIframeResizeTimer;
//
// $(function() {
//
//   $(window).resize(function() {
//
//     // run function
//
//     amtrakIframeResize();
//
//     // clear timeout then run it again
//
//     clearTimeout(amtrakIframeResizeTimer);
//     amtrakIframeResizeTimer = setTimeout(amtrakIframeResize, 500);
//
//   });
//
// }());
//
// $(window).trigger('resize');
