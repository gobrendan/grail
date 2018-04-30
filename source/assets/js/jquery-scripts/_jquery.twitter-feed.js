//
// Twitter feed customizations
//

$('.twitter-feed').on('DOMSubtreeModified propertychange',"#twitter-widget-0", function() {

  $(".twitter-timeline").contents().find(".timeline-Tweet-media").css("display", "none");
  $(".twitter-block").css("height", "100%");

});
