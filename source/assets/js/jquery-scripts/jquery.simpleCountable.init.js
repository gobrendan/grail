//
// simply countable -- character counter
// https://github.com/aaronrussell/jquery-simply-countable
//

$(function() {

  // var textareaMaxlength = $('.input-layered__textarea').data("maxlength");

  // $('.input-layered__textarea').simplyCountable({
  //
  //   counter:            '.input-layered__count-max',
  //   overClass:          'input-layered__count-max--over',
  //   maxCount:           textareaMaxlength,
  //   countDirection:     'up'
  //
  // });

  $('.input-layered').each(function(){

    var inputField = $(this).find(".input-layered__textarea"),
        inputCounter = $(this).find(".input-layered__count-max"),
        inputMaxlength = inputCounter.data("maxlength");

    $(inputField).simplyCountable({

      counter:            inputCounter,
      overClass:          'input-layered__count-max--over',
      maxCount:           inputMaxlength,
      countDirection:     'up'

      // counter:            '#counter',
      // countType:          'characters',
      // maxCount:           140,
      // strictMax:          false,
      // countDirection:     'down',
      // safeClass:          'safe',
      // overClass:          'over',
      // thousandSeparator:  ',',
      // onOverCount:        function(count, countable, counter){},
      // onSafeCount:        function(count, countable, counter){},
      // onMaxCount:         function(count, countable, counter){}

    });

  });

}());
