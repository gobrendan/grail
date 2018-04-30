//
// Photo block modal/carousel -- carousel relies on Unslider plugin
//

$(function(){

  var photoBlockCarouselTimer;

  function photoBlockCarousel() {

    var photoBlockSlider = $('.carousel--photo-blocks .carousel__list-wrapper');
    
    photoBlockSlider.on('unslider.ready', function() {

      $(".photo-block__carousel-arrow").wrapAll("<div class='photo-block__carousel-arrows'></div>");

    });

    photoBlockSlider.unslider({
      autoplay: false,
      animation: "fade",
      animateHeight: true,
      nav: true,
      arrows: {
        prev: "<a class='unslider-arrow prev photo-block__carousel-arrow' href='javascript://'><span class='visually-hidden'>Prev</span><i class='icon-keyboard-arrow-left'></i></a>",
        next: "<a class='unslider-arrow next photo-block__carousel-arrow' href='javascript://'><span class='visually-hidden'>Next</span><i class='icon-keyboard-arrow-right'></i></a>"
      }
    });

    // image gallery with photo blocks in modal

    $(".image-gallery .thumb").click(function(e) {

      var imageNumber = $(this).attr("data-image-number"), 
          firstRun = true;

      // Reset "active" class and inline style attribute for carousel list items

      $(".carousel--photo-blocks .unslider-fade .unslider-wrap li").attr("class", "").attr("style", "opacity:0");
      $(".carousel--photo-blocks .unslider-fade .unslider-wrap li:nth-child(" + imageNumber + ")").attr("class", "unslider-active").attr("style", "opacity: 1");
      
      // Trigger 'next' button click, which resolves issue where the slide height is incorrect (the height value is defaulting to the height of the first slide)
      // Only do this if the first thumb wasn't clicked -- this seems to only be necessary for all but the first thumb
      
      // Explain firstRun conditional...

      // if (firstRun = true) {

      //   if (imageNumber != 1) {

      //     $(".photo-block__carousel-arrow.next").trigger("click");

      //   }

      // }
      
      // Prevent page from "jumping" when clicking thumbnail

      // var x = window.pageXOffset,
      // y = window.pageYOffset;
      // $(window).one('scroll', function () {
      //   window.scrollTo(x, y);
      // })

      window.scrollTo(0,0);
      
    });
  
    // photoBlockSlider.on('unslider.change', function(event, index, slide) {
    //   console.log('Slide has been changed to ' + index); 
    // });

    //$('.carousel__list-wrapper').unslider('initSwipe');

  }

  // photoBlockCarousel(); 

  $(window).resize(function() {          
    
    // clearTimeout(photoBlockCarouselTimer);
    // photoBlockCarouselTimer = setTimeout(photoBlockCarousel, 1500);

    // Trigger 'click' event on 'next' button -- resolves display issue

    // $(".carousel--photo-blocks .unslider-arrow.next").trigger("click");

  });

  }());
  