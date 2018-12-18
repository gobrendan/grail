//
// modal
//

$(function() {

  function modal() {

    // prevent page scroll when closing modal

    $(".gr-c-btn--modal").click(function(e) {

      var x = window.pageXOffset,
          y = window.pageYOffset;
      $(window).one('scroll', function () {
        window.scrollTo(x, y);
      });

    });

    // stop video when closing modal

    $(".gr-c-modal__close-btn").click(function(e) {

      // stop video 
      $('.gr-c-video__media')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');

      // pause video
      // $('.gr-c-video__media')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');

      // play video
      // $('.gr-c-video__media')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');

    });

  }

  modal();

}());
