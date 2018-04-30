//
// Filter
//

$(function() {

  var filterLocationBtnInitial = $(".filter__btn--initial"),
      filterLocationBtnClose = $(".filter__btn--close"),
      filterInitial = $(""),
      filterLocations = $(".filter__locations"),
      filterLocationList = $(".filter__location-list");

  filterLocationBtnInitial.bind("click", filterBtnInitialHandler);
  filterLocationBtnClose.bind("click", filterBtnCloseHandler);

  function filterBtnInitialHandler(event) {

    filterLocations.fadeIn("fast");

  }

  function filterBtnCloseHandler(event) {

    filterLocations.fadeOut("fast");

  }

}());
