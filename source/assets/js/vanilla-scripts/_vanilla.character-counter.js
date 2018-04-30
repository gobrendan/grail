/*
 * Character counter -- vanilla JS
 */

var charCount = function(element) {

  "use strict";

  var charCount_maxlength =   element.getAttribute("maxlength");
  var charCount_characters =  element.value.length;
  var charCount_remaining =   charCount_maxlength - charCount_characters;
  var charCount_parent =      getClosest(element, '.fieldset--alt'); // getClosest is custom function
  var charCount_characterEl = charCount_parent.querySelector('.character-count__total');

  charCount_characterEl.innerHTML = charCount_characters;

};
