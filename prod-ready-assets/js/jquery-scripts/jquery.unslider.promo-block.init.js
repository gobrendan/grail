//
// Unslider init (carousels) -- unslider.com
//

$(function(){
  
  function promoBlockCarouselInit() {
    
    $('.carousel--promo-blocks .carousel__list-wrapper').unslider({
      autoplay: true,
      delay: 3000,
      animation: "fade",
      animateHeight: true,
      nav: true,
      arrows: {
      	prev: "<a class='unslider-arrow prev' href='#'><span class='visually-hidden'>Prev</span><i class='icon-keyboard-arrow-left'></i></a>",
      	next: "<a class='unslider-arrow next' href='#'><span class='visually-hidden'>Next</span><i class='icon-keyboard-arrow-right'></i></a>"
      }
    });

  }

  promoBlockCarouselInit();
    
}());