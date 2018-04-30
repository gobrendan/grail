/* global jQuery */

//
// card carousel init -- requires Unslider and matchHeight plugins
//

// jQuery plugin to change class name
// https://stackoverflow.com/questions/317170/how-can-i-change-html-attribute-names-with-jquery

jQuery.fn.extend({
  renameAttr: function(name, newName) {
    var val;
    return this.each(function() {
      val = jQuery.attr(this, name);
      jQuery.attr(this, newName, val);
      jQuery.removeAttr(this, name);
    });
  }
});

// set timer -- when switching between slim and wide display, this delay improves display
var cardCarouselResizeTimer;

// card carousel init
function cardCarouselInit() {

  var cardSlider = $(".carousel--cards > .carousel__list-wrapper"),
      carouselBreakpoint = 768;

  // implement carousel for smaller screens; otherwise, display component as regular card set
  if ($(window).width() < carouselBreakpoint) { // width value matches medium breakpoint

    // rename 'unslider' class when plugin should be in effect
    $(".carousel--cards .unsliderX").attr("class", "unslider");

    // rename 'style' attributes back to 'style' so they take effect     
    $(".carousel--cards .carousel__list-wrapper").renameAttr("styleX", "style");
    $(".carousel--cards .carousel__list-wrapper .grid").renameAttr("styleX", "style");
    $(".carousel--cards .carousel__list-wrapper .grid__cell").renameAttr("styleX", "style");

    // when plugin active, remove 'u-visible' class from carousel items -- it's only needed for wider screens (when plugin is not active)
    $(".carousel--cards .unslider-carousel").find("li").removeClass("u-visible");

    // show elements added by plugin
    $(".carousel--cards").find(".unslider-arrow, .unslider-nav").show();
    $(".carousel--cards .unslider-clone").show();

    // for wider screens, adjust first/last card padding
    $(".carousel--cards .unslider-carousel").find("li").not(":hidden").first().css("padding-left", ".5rem");
    $(".carousel--cards .unslider-carousel").find("li").not(":hidden").last().css("padding-right", ".5rem");

    // init unslider
    cardSlider.unslider({
      autoplay: false,
      delay: 10000,
      animation: "horizontal",
      animateHeight: true,
      nav: true,
      noloop: true,
      keys: true,
      arrows: false
    });

    // Trigger 'click' event on 'next' button -- resolves display issue
    setTimeout(function() {
      $(".carousel--cards .unslider-nav li:last-child").trigger("click");
      $(".carousel--cards .unslider-nav li:first-child").trigger("click");
    }, 1000);

    cardSlider.unslider("initSwipe");

  } 
    
  else {

    // for wider screens, rename 'unslider' class to negate it from affecting display
    $(".carousel--cards .unslider").attr("class", "unsliderX");

    // for wider screens, rename 'style' attribute' to negate it from affecting display
    $(".carousel--cards .carousel__list-wrapper").renameAttr("style", "styleX");
    $(".carousel--cards .carousel__list-wrapper .grid").renameAttr("style", "styleX");
    $(".carousel--cards .carousel__list-wrapper .grid__cell").renameAttr("style", "styleX");

    // for wider screens, hide elements added by plugin
    $(".carousel--cards").find(".unslider-arrow, .unslider-nav").hide();
    $(".carousel--cards .unslider-clone").hide();

    // for wider screens, adjust first/last card padding
    $(".carousel--cards .unslider-carousel").find("li").not(":hidden").first().css("padding-left", "0");
    $(".carousel--cards .unslider-carousel").find("li").not(":hidden").last().css("padding-right", "0");

    // equalize heights for 'card carousel' items on wider screens
    $(".carousel--cards").find(".card__primary-text").attr("style", "");
    $(".carousel--cards").find(".card__secondary-text").attr("style", "");
    $(".carousel--cards").find(".card--video .card__text-wrapper").attr("style", "");
    
  }

  // Equalize card heights

  $('.carousel--cards').each(function(){
    
    $(this).find('.card__text-wrapper').matchHeight({
      
      remove: true

    });        

    $(this).find('.card__text-wrapper').matchHeight({
      
      byRow: false

    });   

  });

}

$(function() {

  cardCarouselInit();

  $(window).resize(function() {

    clearTimeout(cardCarouselResizeTimer);
    cardCarouselResizeTimer = setTimeout(cardCarouselInit, 1000);

  });

}());
