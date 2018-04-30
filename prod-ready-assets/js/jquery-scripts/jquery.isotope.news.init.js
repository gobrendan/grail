//
// Isotope init for NCDOT component
// https://github.com/metafizzy/isotope
//

$(function() {

  function isotopeInit() {

    // NOTE: We're initilizing the plugin differently for IE 9 since that browser doesn't support transitions

    var isotopeItemGroup = $('.isotope__item-group--news'),                                   // IE 10+ and modern browsers
        isotopeItemGroup__noTransitions = $('.no-csstransitions .isotope__item-group--news'); // IE 9

    // init Isotope for IE 10+ and modern browsers
    var $isotopeItems = isotopeItemGroup.isotope({
      percentPosition: true,
      itemSelector: '.isotope__item',
      layoutMode: 'masonry'
    });

    // init Isotope for IE 9
    var $isotopeItems__noTransitions = isotopeItemGroup__noTransitions.isotope({
      percentPosition: true,
      itemSelector: '.isotope__item',
      layoutMode: 'masonry',
      transitionDuration: 0
    });

    // filter functions
    var filterFns = {};

    // bind filter button click
    $('.isotope__filters-btn-group').on( 'click', 'button', function() {
      var filterValue = $( this ).attr('data-filter');
      // use filterFn if matches value
      filterValue = filterFns[ filterValue ] || filterValue;
      isotopeItemGroup.isotope({ filter: filterValue });
      isotopeItemGroup__noTransitions.isotope({ filter: filterValue });

      // "No results" message
      // http://stackoverflow.com/questions/8008014/isotope-no-results-message
      if ( !isotopeItemGroup.data('isotope').filteredItems.length ) {
        $(".isotope__no-results").addClass("isotope__no-results--visible");
      }
      else {
        $(".isotope__no-results").removeClass("isotope__no-results--visible");
      }

    });

    // change is-checked class on buttons
    $('.isotope__btn-group').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $( this ).addClass('is-checked');
      });
    });

  }

  isotopeInit();

}());
