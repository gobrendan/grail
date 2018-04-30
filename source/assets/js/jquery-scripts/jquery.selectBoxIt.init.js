// http://www.selectboxit.com

$(function(){

  $(".custom-select").each(function() {

    var selectDefaultText = $(this).data("default-text");

    $(this).selectBoxIt({

      defaultText: selectDefaultText

    });

  });

}());
