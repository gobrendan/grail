//
// sticky navs -- used for sidebar/side-nav components
//

function sideNav() {

  function resizeScreen() {

    var topNavHeight = $(".wide-nav").outerHeight(),
        sideNavBuffer = 96, // Space between top nav and side nav (height of top nav + 16px)
        totalOffset = topNavHeight + sideNavBuffer;

    if (window.matchMedia("(min-width: 1024px)").matches) {

      $(".side-nav--sticky, .sidebar--sticky").stick_in_parent({

        sticky_class: "js-is-stuck", // default is "is_stuck" -- I wanted to use a dash instead :D
        //offset_top: totalOffset
        offset_top: sideNavBuffer

      });

    }

    else {

      $(".side-nav--sticky, .sidebar--sticky").trigger("sticky_kit:detach");

    }

  };

  window.addEventListener('resize', resizeScreen, false);

  resizeScreen();

}

$(function(){

  //sideNav();

  // $(".side-nav").stick_in_parent().
  //   on("sticky_kit:stick", function(e) {
  //    console.log("has stuck!", e.target);
  //  })
  //  .on("sticky_kit:unstick", function(e) {
  //    console.log("has unstuck!", e.target);
  //  });
  //
  // console.log("it's a mystery!!!!");

}());
