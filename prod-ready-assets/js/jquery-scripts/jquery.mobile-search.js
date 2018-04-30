//
// Mobile search
//

$(function(){

  var mobileSeachBtn = $(".mobile-header__search-btn"),
      mobileSearchContainer = $(".mobile-search-box");

  mobileSeachBtn.bind("tap", searchBtnHandler);

  function searchBtnHandler(event) {

    mobileSearchContainer.toggleClass("active");

  }

}());
