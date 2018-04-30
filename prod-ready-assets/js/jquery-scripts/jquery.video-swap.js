//
// video swap
//

function videoSwap() {

  var maxBreakpoint = "1023px", 
      minBreakpoint = "1024px", 
      videoItem = $(".video-list__item"), 
      videoSwapComponent = $(".feature-block--video"), 
      videoThumb = $(".video-list__img-wrapper"), 
      videoTitle = $(".video-list__item-heading a");

  if (window.matchMedia("(min-width: 0) and (max-width: " + maxBreakpoint + ")").matches) {
    
    //

  }

  else if (window.matchMedia("(min-width: " + minBreakpoint + ")").matches) { // NOTE: In our project, 1024px = 64em

    videoThumb.click(function() {
      
      var videoCurrentCaption = $(".feature-block__video-caption");
      var videoNewCaption = $(this).closest(".video-list__item ").find(".video-list__item-details").text();
      var videoTempCaption = $(".feature-block__video-caption").text();

      var videoCurrentHeading = $(".feature-block--video").find(".feature-block__video-heading");
      var videoNewHeading = $(this).closest(".video-list__item ").find(".video-list__item-heading").find("a").text();
      var videoTempHeading = $(".feature-block--video").find(".feature-block__video-heading").text();

      var videoCurrentURL = $(".video-wrapper__video").attr("src"); 
      var videoNewURL = $(this).closest(videoItem).attr("data-video"); 
      var videoTempURL = $(".video-wrapper__video").attr("src");

      var videoCurrentThumb = $(".video-wrapper").find("img").attr("src");
      var videoNewThumb = $(this).find("img").attr("src");
      var videoTempThumb = $(".video-wrapper").find("img");

      var videoNewVideo = $(this).attr("href"); 
      var videoTempVideo = $(".video-wrapper__video").attr("data-video");

      // swap thumb

      $(this).find("img").attr("src", videoCurrentThumb);
      $(".video-wrapper").find("img").attr("src", videoNewThumb)

      // swap heading

      videoCurrentHeading.text(videoNewHeading);
      $(this).closest(".video-list__item").find(".video-list__item-heading").find("a").text(videoTempHeading);
      
      // swap caption

      videoCurrentCaption.text(videoNewCaption);
      $(this).closest(".video-list__item").find(".video-list__item-details").text(videoTempCaption);
      
      // swap video src

      $(".feature-block__video-wrapper .video-wrapper__video").attr("src", videoNewURL);
      $(this).attr("data-video", videoTempURL);

      // swap YouTube URL

      videoSwapComponent.find(".video-wrapper__video").attr("data-video", videoNewVideo)
      $(this).attr("href", videoTempVideo);

      // play video

      var videoVideoVideo = $(".feature-block__video-wrapper").find(".video-wrapper__video").attr("src");
      videoVideoVideo = videoVideoVideo += "&autoplay=1"
      $(".feature-block__video-wrapper").find(".video-wrapper__video").attr("src", videoVideoVideo);

      event.preventDefault();
      event.stopPropagation();

    });

    videoTitle.click(function() {
      
      var videoCurrentCaption = $(".feature-block__video-caption");
      var videoNewCaption = $(this).closest(".video-list__item ").find(".video-list__item-details").text();
      var videoTempCaption = $(".feature-block__video-caption").text();

      var videoCurrentHeading = $(".feature-block--video").find(".feature-block__video-heading");
      var videoNewHeading = $(this).closest(".video-list__item ").find(".video-list__item-heading").find("a").text();
      var videoTempHeading = $(".feature-block--video").find(".feature-block__video-heading").text();

      var videoCurrentURL = $(".video-wrapper__video").attr("src"); 
      var videoNewURL = $(this).closest(videoItem).attr("data-video"); 
      var videoTempURL = $(".video-wrapper__video").attr("src");

      var videoCurrentThumb = $(".video-wrapper").find("img").attr("src");
      var videoNewThumb = $(this).closest(".video-list__item").find("video-list__img-wrapper").find("img").attr("src");
      var videoTempThumb = $(".video-wrapper").find("img");

      var videoNewVideo = $(this).attr("href"); 
      var videoTempVideo = $(".video-wrapper__video").attr("data-video");

      // swap thumb

      $(this).closest(".video-list__item").find("video-list__img-wrapper").find("img").attr("src", videoCurrentThumb);
      $(".video-wrapper").find("img").attr("src", videoNewThumb)

      // swap heading

      videoCurrentHeading.text(videoNewHeading);
      $(this).closest(".video-list__item").find(".video-list__item-heading").find("a").text(videoTempHeading);
      
      // swap caption

      videoCurrentCaption.text(videoNewCaption);
      $(this).closest(".video-list__item").find(".video-list__item-details").text(videoTempCaption);
      
      // swap video src

      $(".feature-block__video-wrapper .video-wrapper__video").attr("src", videoNewURL);
      $(this).closest("video-list__item").attr("data-video", videoTempURL);

      // swap YouTube URL

      videoSwapComponent.find(".video-wrapper__video").attr("data-video", videoNewVideo)
      $(this).attr("href", videoTempVideo);

      // play video

      var videoVideoVideo = $(".feature-block__video-wrapper").find(".video-wrapper__video").attr("src");
      videoVideoVideo = videoVideoVideo += "&autoplay=1"
      $(".feature-block__video-wrapper").find(".video-wrapper__video").attr("src", videoVideoVideo);

      event.preventDefault();
      event.stopPropagation();

    });

  }
      
}

$(function() {

  videoSwap();

  // re-run function on resize
  window.addEventListener('resize', videoSwap, false);

}());