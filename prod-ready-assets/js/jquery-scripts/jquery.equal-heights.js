//
// equal heights -- match element heights
//
// https://github.com/liabru/jquery-match-height
//

function equalHeightsInit() {

  // equalize heights for "small grid 1 of 2" card sets at the 30em breakpoint (breakpoint at which the "1 of 2" grid kicks in)

  $('.card-set.small-grid--1of2').each(function() {

    if (window.matchMedia("(min-width: 30em)").matches) {

      // reset inline "style" attribute

      $(this).find('.card__text-wrapper').attr("style","");

      // init matchHeight plugin

      $(this).find('.card__text-wrapper').matchHeight({

        byRow: false

      });

    }

    else {

      $(this).find('.card__text-wrapper').matchHeight({

        remove: true

      });

    }

  });

  // equalize heights for "small grid 1 of 2" image gallery at the 30em breakpoint (breakpoint at which the "1 of 2" grid kicks in)

  $('.image-gallery.small-grid--1of2').each(function() {

    if (window.matchMedia("(min-width: 30em)").matches) {

      // reset inline "style" attribute

      $(this).find('.thumb__caption').attr("style","");

      // init matchHeight plugin

      $(this).find('.thumb__caption').matchHeight({

        byRow: false

      });

    }

    else {

      $(this).find('.thumb__caption').matchHeight({

        remove: true

      });

    }

  });

  // equalize heights for "cards" in card set bordered" at the 30em breakpoint (breakpoint at which the "1 of 2" grid kicks in)

  $('.card-set--bordered.small-grid--1of2').each(function() {
    
    if (window.matchMedia("(min-width: 30em)").matches) {

      // reset inline "style" attribute

      $(this).find('.card__primary-text').attr("style","");
      $(this).find('.card__secondary-text').attr("style","");
      
      // init matchHeight plugin

      $(this).find('.card__primary-text').matchHeight({

        byRow: false

      });

      $(this).find('.card__secondary-text').matchHeight({
        
        byRow: false

      });
      
    }

    else {

      $(this).find('.card__primary-text').matchHeight({

        remove: true

      });

      $(this).find('.card__secondary-text').matchHeight({

        remove: true

      });        

    }

  });

  // equalize heights for cards with "equal heights" modifier
  
  $('.card-set--bordered.card-set--medium-equal-heights').each(function() {
    
    if (window.matchMedia("(min-width: 48em)").matches) {

      // reset inline "style" attribute

      $(this).find('.card__primary-text').attr("style","");
      $(this).find('.card__secondary-text').attr("style","");
      
      // init matchHeight plugin

      $(this).find('.card__primary-text').matchHeight({

        byRow: false

      });

      $(this).find('.card__secondary-text').matchHeight({
        
        byRow: false

      });
      
    }

    else {

      $(this).find('.card__primary-text').matchHeight({

        remove: true

      });

      $(this).find('.card__secondary-text').matchHeight({

        remove: true

      });        

    }

  });

  // equalize heights for "card set mix" cards

  $('.card-set--mix').each(function() {

    //if (window.matchMedia("(min-width: 30em)").matches) {

      // un-init matchHeight plugin from child elements (needs refactoring)

      $(this).find('.card__text-wrapper').matchHeight({

        remove: true

      });

      // init matchHeight plugin

      $(this).find('.card').matchHeight({

        byRow: false

      });

      // $(this).find('.card__icon-wrapper').matchHeight({

      //   byRow: false

      // });

    // }

    // else {

    //   $(this).find('.thumb__caption').matchHeight({

    //     remove: true

    //   });

    //   $(this).find('.card').matchHeight({

    //     remove: true

    //   });

    // }

  });

};

window.addEventListener('resize', equalHeightsInit, false);

$(function() {

  // site Map -- equalize heights for cells in browsers that don't support flexbox

  $('.no-flexbox.no-flexboxtweener .site-map__grid-cell').matchHeight();

  // run equalHeightsInit

  equalHeightsInit();

}());
