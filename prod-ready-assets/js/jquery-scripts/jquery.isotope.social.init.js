//
// Isotope init for NCDOT component
// https://github.com/metafizzy/isotope
//

var isotopeSocialResizeTimer;

function isotopeSocialInit() {

  var isotopeSocialBreakpoint = 640,
      isotopeItemGroup = $('.isotope__item-group--social'),                                   // IE 10+ and modern browsers
      isotopeItemGroup__noTransitions = $('.no-csstransitions .isotope__item-group--social'); // IE 9

  if ($(window).width() >= isotopeSocialBreakpoint) {

    // init Isotope for IE 10+ and modern browsers
    var $isotopeItems = isotopeItemGroup.isotope({

      // percentPosition: true,
      // itemSelector: '.isotope__item',
      // layoutMode: 'masonry', 

      itemSelector: '.isotope__item',
      percentPosition: true,
      masonry: {
        columnWidth: '.isotope__grid-sizer'
      }

    });

    // init Isotope for IE 9
    var $isotopeItems__noTransitions = isotopeItemGroup__noTransitions.isotope({

      // percentPosition: true,
      // itemSelector: '.isotope__item',
      // layoutMode: 'masonry',
      // transitionDuration: 0

      itemSelector: '.isotope__item',
      percentPosition: true,
      masonry: {
        columnWidth: '.isotope__grid-sizer'
      }, 
      transitionDuration: 0

    });

  }

  else {

    // if Isotope is initalized, destroy it (without this conditional, there's an error)

    var iso = isotopeItemGroup.data('isotope'), 
        iso__noTransitions = isotopeItemGroup__noTransitions.data('isotope');

    if (iso) {
      
      isotopeItemGroup.isotope('destroy');

    }

    if (iso__noTransitions) {
    
      isotopeItemGroup__noTransitions.isotope('destroy');

    }
    
  }

}

$(function() {

  isotopeSocialInit();

  $(window).resize(function() {

    clearTimeout(isotopeSocialResizeTimer);
    isotopeSocialResizeTimer = setTimeout(isotopeSocialInit, 10);

  });
  
}());
