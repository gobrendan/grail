//
// Card carousel init -- requires Unslider plugin
//

$(function(){

  // jQuery plugin to change class name
  // https://stackoverflow.com/questions/317170/how-can-i-change-html-attribute-names-with-jquery

  jQuery.fn.extend({
    renameAttr: function( name, newName, removeData ) {
      var val;
      return this.each(function() {
        val = jQuery.attr( this, name );
        jQuery.attr( this, newName, val );
        jQuery.removeAttr( this, name );
      });
    }
  });

  // set timer -- when switching between slim and wide display, this delay improves display

  var socialBoxCarouselResizeTimer;

  // social block carousel init

  function socialBoxCarouselInit() {

    var socialBoxSlider = $('.carousel--social-block > .carousel__list-wrapper'),
        socialBlockCarouselBreakpoint = 768;

    // reset inline 'style' attribute

    // $(".carousel--social-block").find('.card__primary-text').attr("style","");
    // $(".carousel--social-block").find('.card__secondary-text').attr("style","");

    // implement carousel for smaller screens; otherwise, display component as regular card set

    if ($(window).width() < socialBlockCarouselBreakpoint) { // width value matches medium breakpoint

      // rename 'unslider' class when plugin should be in effect

      $(".carousel--social-block .unsliderX").attr("class", "unslider");
      
      // rename 'style' attributes back to 'style' so they take effect
      
      $(".carousel--social-block .carousel__list-wrapper").renameAttr("styleX", "style");
      $(".carousel--social-block .carousel__list-wrapper .grid").renameAttr("styleX", "style");
      $(".carousel--social-block .carousel__list-wrapper .grid__cell").renameAttr("styleX", "style");
      
      // when plugin active, remove 'u-visible' class from carousel items -- it's only needed for wider screens (when plugin is not active)

      $(".carousel--social-block .unslider-carousel").find("li").removeClass("u-visible");      

      // show elements added by plugin

      $(".carousel--social-block").find(".unslider-arrow, .unslider-nav").show();
      $(".carousel--social-block .unslider-clone").show();
     
      // for wider screens, adjust first/last card padding

      $(".carousel--social-block .unslider-carousel").find("li").not(":hidden").first().css("padding-left", ".5rem");
      $(".carousel--social-block .unslider-carousel").find("li").not(":hidden").last().css("padding-right", ".5rem");

      // init unslider

      socialBoxSlider.unslider({
        autoplay: false,
        delay: 0,
        animation: "horizontal",
        animateHeight: true,
        nav: true,
        //infinite: true, 
        noloop: true, 
        arrows: {
          prev: "<a class='unslider-arrow prev' href='javascript://'><span class='visually-hidden'>Prev</span><i class='icon-keyboard-arrow-left'></i></a>",
          next: "<a class='unslider-arrow next' href='javascript://'><span class='visually-hidden'>Next</span><i class='icon-keyboard-arrow-right'></i></a>"
        }
      });

      // Trigger 'click' event on 'next' button -- resolves display issue

      $(".carousel--social-block .unslider-arrow.next").trigger("click");
      $(".carousel--social-block .unslider-arrow.prev").trigger("click");
      
    }

    else {

      // for wider screens, rename 'unslider' class to negate it from affecting display

      $(".carousel--social-block .unslider").attr("class", "unsliderX");
      
      // for wider screens, rename 'style' attribute' to negate it from affecting display

      $(".carousel--social-block .carousel__list-wrapper").renameAttr("style", "styleX");
      $(".carousel--social-block .carousel__list-wrapper .grid").renameAttr("style", "styleX");
      $(".carousel--social-block .carousel__list-wrapper .grid__cell").renameAttr("style", "styleX");

      // for wider screens, hide elements added by plugin

      $(".carousel--social-block").find(".unslider-arrow, .unslider-nav").hide();
      $(".carousel--social-block .unslider-clone").hide();

      // for wider screens, adjust first/last card padding

      $(".carousel--social-block .unslider-carousel").find("li").not(":hidden").first().css("padding-left", "0");
      $(".carousel--social-block .unslider-carousel").find("li").not(":hidden").last().css("padding-right", "0");

      // equalize heights for 'card carousel' items on wider screens

      // $(".carousel--social-block").find('.card__primary-text').attr("style","");
      // $(".carousel--social-block").find('.card__secondary-text').attr("style","");
  
    }




    // $('.carousel--social-block').find('.card--bordered .card__primary-text').matchHeight({
      
    //   remove: true

    // });        

    // $('.carousel--social-block').find('.card--bordered .card__secondary-text').matchHeight({
      
    //   remove: true

    // });        
      



    // $('.carousel--social-block').find('.card--bordered .card__primary-text').matchHeight({
      
    //   byRow: false
      
    // });        

    // $('.carousel--social-block').find('.card--bordered .card__secondary-text').matchHeight({
      
    //   byRow: false
      
    // });  

  }

  socialBoxCarouselInit();

  $(window).resize(function() {

    clearTimeout(socialBoxCarouselResizeTimer);
    socialBoxCarouselResizeTimer = setTimeout(socialBoxCarouselInit, 500);

  });

}());