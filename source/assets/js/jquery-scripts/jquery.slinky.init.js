/*
 * Slinky -- responsive navigation
 * https://github.com/alizahid/slinky
 */

$(function(){

  // Initalize plugin

  var slinkyMenu = $('.slinky-menu'),
      slinkyMenuWrapper = $('.slinky-menu-wrapper');;

  slinkyMenu.slinky({

    title: true,
    speed: 150

  });

  // Tap/click button to animate up/down

  var slinkyBtn = $(".js-slinky-btn, .js-slinky-close-btn");

  slinkyBtn.bind("tap", slinkyBtnHandler);

  function slinkyBtnHandler(event) {

    if (!slinkyMenuWrapper.hasClass("active")) {

      slinkyMenuWrapper.css("top","0");
      slinkyMenuWrapper.addClass("active");

    }

    else {

      slinkyMenuWrapper.css("top","100%");
      slinkyMenuWrapper.removeClass("active");

      /* Reset plugin -- removing inline styles basically resets DOM to original state */

      slinkyMenu.find("*").removeAttr('style');

    }

  }

  /*

  Option   | Default value | Description
  -------- | ------------- | -----------
  `label`  | 'Back'        | Label for the back button. Set to `true` to use the link's own label
  `title`  | `false`       | Set to `true` to show title of current menu level
  `speed`  | `300`         | Animation speed in milliseconds
  `resize` | `true`        | Resize menu height to match content

  */

  // Change z-index of .page-wrapper depending on viewport width, which covers (hides) mobile nav on wider screens
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia

  function resizeScreen() {

    if (window.matchMedia("(min-width: 1024px)").matches) {

      //$(".page-wrapper").css("z-index","10");

    }

    else {

      //$(".page-wrapper").css("z-index","1");

    }

  };

  window.addEventListener('resize', resizeScreen, false);

  resizeScreen();

}());
