//
// datepicker init
//

$(function() {

  $(".input-text--datepicker").datepicker({

    selectOtherMonths: true,

    // Adjust space between input and modal

    beforeShow: function (input, inst) {
      setTimeout(function () {
        inst.dpDiv.css({
          top: $(".input-text--datepicker").offset().top + 17,
          left: $(".input-text--datepicker").offset().left
        });
      }, 0);
    }

  });

}());
