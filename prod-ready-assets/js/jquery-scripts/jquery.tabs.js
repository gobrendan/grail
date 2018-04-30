//
// tabs -- jQuery solution based on: https://24ways.org/2015/how-tabs-should-work/
//

// a temp value to cache *what* we're about to show
var target = null;

// collect all the tabs
var tabs = $('.tabs__btn').on('click', function () {
  //console.log('click')
  target = $(this.hash).removeAttr('id');
  if (location.hash === this.hash) {
    setTimeout(update);
  }
}).attr('tabindex', '0');

// get an array of the panel ids (from the anchor hash)
var targets = tabs.map(function () {
  return this.hash;
}).get();

// use those ids to get a jQuery collection of panels
var panels = $(targets.join(',')).each(function () {
  // keep a copy of what the original el.id was
  $(this).data('old-id', this.id);
});

function update() {
  //console.log('update')
  if (target) {
    target.attr('id', target.data('old-id'));
    target = null;
  }

  var hash = window.location.hash;
  if (targets.indexOf(hash) !== -1) {
    return show(hash);
  }

  // NOTE: this was added after the article was written
  // to fix going "back" on the browser nav to an empty state
  if (!hash) {
    show();
  }

  $(window).trigger('resize');
  //console.log("this work?");

}

function show(id) {
  // if no value was given, let's take the first panel
  if (!id) {
    id = targets[0];
  }
  // remove the selected class from the tabs,
  // and add it back to the one the user selected
  tabs.removeClass('tabs__btn--selected').attr('aria-selected', 'false').filter(function () {
    return (this.hash === id);
  }).addClass('tabs__btn--selected').attr('aria-selected', 'true');

  // now hide all the panels, then filter to
  // the one we're interested in, and show it

  panels.hide().attr('aria-hidden', 'true').filter(id).show().attr('aria-hidden', 'false');

}

window.addEventListener('hashchange', update);

// initialise
if (targets.indexOf(window.location.hash) !== -1) {
  update();
} else {
  show();
}

// Key control; was included via a separate JS file in Remy's final demo
//
// (function () {
//   var keys = {
//     left: 37,
//     right: 39,
//   };
//
//   var tabs = $('[role="tab"]');
//   $('body').on('keydown', '[role="tab"]', function (e) {
//     var i;
//     i = tabs.index(this);
//
//     if (e.which === keys.left) i--;
//     if (e.which === keys.right) i++;
//
//
//     if (i === 0) i = tabs.length - 1;
//     if (i >= tabs.length) i = 0;
//
//     $(tabs[i]).click();
//   });
//
// })();
