//
// Counter -- circle progress bar
// Based on: http://codepen.io/anon/pen/MKzbaw
//

(function ($){

    $.fn.counter = function(options){

        options = $.extend({
        	animate     : true,
          animateText : true
        }, options);

        var $this = $(this);
        var $progressBar = $this;
        var $progressCount = $progressBar.find('.counter__percentage');
        var $circle = $progressBar.find('.counter__circle');
        var percentageProgress = $progressBar.attr('data-progress');
        var percentageRemaining = (100 - percentageProgress);
        var percentageText = $progressCount.closest($progressBar).attr('data-progress');
        var radius = $circle.attr('r');
        var diameter = radius * 2;
        var circumference = Math.round(Math.PI * diameter);
        var percentage =  circumference * percentageRemaining / 100;

        $circle.css({
          'stroke-dasharray' : circumference,
          'stroke-dashoffset' : percentage
        })

        if(options.animate === true){
          $circle.css({
            'stroke-dashoffset' : circumference
          }).animate({
            'stroke-dashoffset' : percentage
          }, 3000 )
        }

        if(options.animateText == true){

          $({ Counter: 0 }).animate(
            { Counter: percentageText },
            { duration: 3000,
             step: function () {
               $progressCount.text( Math.ceil(this.Counter) + '%');
             }
            });

        }else{
          $progressCount.text( percentageText + '%');
        }

    };

})(jQuery);

$(document).ready(function(){

  $('.counter--animate-none').counter({
    animate : false,
    animateText : false
  });

  $('.counter--animate-circle').counter({
    animate : true,
    animateText : false
  });

  $('.counter--animate-text').counter({
    animate : false,
    animateText : true
  });

  $('.counter--animate-all').counter();

})
