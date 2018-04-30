//
// Unslider init (carousels) -- unslider.com
//

$(function(){

  function alertBlockCarouselInit() {

    function alertCarouselEqualHeights() {

      // init Unslider plugin

      $(".carousel--alerts .carousel__list-wrapper").unslider({
        autoplay: true,
        delay: 4000,
        animation: "fade",
        animateHeight: true,
        nav: true,
        arrows: {
        	prev: "<a class='unslider-arrow prev' href='#'><span class='visually-hidden'>Prev</span><i class='icon-keyboard-arrow-left'></i></a>",
        	next: "<a class='unslider-arrow next' href='#'><span class='visually-hidden'>Next</span><i class='icon-keyboard-arrow-right'></i></a>"
        }
      });

      // init matchHeight plugin (equalizes heights of carousel items)

      $('.carousel--alerts .carousel__list-wrapper').each(function(){
        
        $(this).find('.alert-block__message, .unslider').matchHeight({
          
          remove: true

        });        

        $(this).find('.alert-block__message, .unslider').matchHeight({
          
          byRow: false

        });   

      });

      // Equalize height of outer wrapper 

      var alertCarouselHeight = $(".carousel--alerts").find(".unslider-active").find(".alert-block__message").height();
      
      $(".carousel--alerts").find(".unslider-arrow, .unslider__close-btn").css("height", alertCarouselHeight);
      $(".alerts-carousel-wrapper").css("height", alertCarouselHeight);

    }

    alertCarouselEqualHeights();

    var carouselResizeTimer;

    // on resize, clear timeout and run function again -- this resets some inline height declarations

    $(window).resize(function() {

      clearTimeout(carouselResizeTimer);
      carouselResizeTimer = setTimeout(alertCarouselEqualHeights, 2500);

    });

  }

  alertBlockCarouselInit();

}());
