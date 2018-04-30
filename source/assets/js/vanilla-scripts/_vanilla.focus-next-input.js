//
// Focus next input
// Inspired by: http://stackoverflow.com/questions/15595652/focus-next-input-once-reaching-maxlength-value
//

var container = document.getElementsByClassName("input-set")[0];
container.onkeyup = function(e) {
  var target = e.srcElement;
  var maxLength = parseInt(target.attributes["maxlength"].value, 10);
  var myLength = target.value.length;
  if (myLength >= maxLength) {
    var next = target;
    while (next = next.nextElementSibling) {
      if (next == null)
        break;
      if (next.tagName.toLowerCase() == "input") {
        next.focus();
        break;
      }
    }
  }
}
