//
// slick -- carousels
// http://kenwheeler.github.io/slick/
// https://github.com/kenwheeler/slick/
//

$(function() {

  function slickCarouselInit() {

    // init plugin

    $(".slick-carousel").slick({

      infinite: false,
      dots: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: true,
      centerMode: true,
      centerPadding: '0', 
      arrows: false, 
      touchThreshold : 20

    });

    // equalize card heights -- uses matchHeight plugin

    $('.slick-carousel').each(function(){
      
      $(this).find('.card__text-wrapper').matchHeight({
        
        byRow: false

      });   

    });

  }

  slickCarouselInit();

  // run everything again on resize

  var slickCarouselResizeTimer;

  $(window).resize(function() {

    clearTimeout(slickCarouselResizeTimer);
    slickCarouselResizeTimer = setTimeout(slickCarouselInit, 1000);

  });

}());
