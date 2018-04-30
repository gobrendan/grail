//
// Button toggle -- swap modifier class for buttons in button group
//

$(function() {

  var btnToggleButton = $(".btn-group--toggle a");

  btnToggleButton.bind("tap click", toggleBtnHandler);

  function toggleBtnHandler(event) {

    $(this).removeClass("btn--ghost");
    $(this).siblings().addClass("btn--ghost");

  }

  btnToggleButton.bind("tap click", resultsLayoutHandler);

  function resultsLayoutHandler(event) {

    if ( $(this).data("layout") == "list" ) {

      $(".results-grid").addClass("results-grid--column");
      $(".results-grid").find(".grid__cell").removeClass("grid__cell--1of3");

    }

    if ( $(this).data("layout") == "grid" ) {

      $(".results-grid").removeClass("results-grid--column");
      $(".results-grid").find(".grid__cell").addClass("grid__cell--1of3");

    }

  }

}());
