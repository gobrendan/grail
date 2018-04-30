//
// breadcrumbs toggle
//

function breadcrumbsToggle() {

  var breadcrumbs = $(".breadcrumbs-wrapper"),
      breadcrumbsLinks = $(".breadcrumbs__item:not(':last-child')"),
      breadcrumbsToggleBtn = $(".breadcrumbs__toggle-btn"),
      breadcrumbsToggleBtnIcon = breadcrumbsToggleBtn.find("i");

  breadcrumbsToggleBtn.bind("tap", breadcrumbsToggleBtnHandler);

  function breadcrumbsToggleBtnHandler(event) {

    if (breadcrumbs.hasClass("open")) {

      breadcrumbs.removeClass("open");
      breadcrumbsLinks.hide();
      breadcrumbsToggleBtnIcon.removeClass("icon-remove").addClass("icon-add");

    }

    else {

      breadcrumbs.addClass("open");
      breadcrumbsLinks.show();
      breadcrumbsToggleBtnIcon.removeClass("icon-add").addClass("icon-remove");

    }

  }

}

$(function() {

  breadcrumbsToggle();

}());
