//
// modal for photo gallery -- dynamically use same images for thumbs and modal
//

$(function() {

  // populate carousel with ".image-gallery" items

  function populateImageGalleryModal() {

    var imageGallery = $(".image-gallery"), 
        imageGalleryItems = imageGallery.find(".thumb");

    imageGalleryItems.each(function (index, value){

      var //imageURLfragment = $(this).attr("data-image-url"), 
          // imageURLfragment = imageURLfragment + "@2x.jpg", 
          imgURL = $(this).find("img").attr("src"), 
          // imageTitle = "", 
          imageCaption = $(this).find(".thumb__caption").text();

      $(".carousel--photo-blocks").find(".carousel__list-wrapper ul").append("<li>" + 

        "<div class='photo-block'>" + 
          "<div class='photo-block__img-wrapper'>" + 

            // "<img srcset='" + 
            //   imageURLfragment + "@1x.jpg 1x, " + 
            //   imageURLfragment + "@2x.jpg 2x" + 
            //   "' class='photo-block__img' alt=''>" + 

            "<img src='" + imgURL + "' class='photo-block__img' alt=''>" + 

          "</div>" + 
          // "<h1 class='photo-block__heading heading heading--gamma'>" + 
          //   "Title" + 
          // "</h1>" + 
          "<p class='photo-block__caption'>" + 
            imageCaption + 
          "</p>" + 
        "</div>" + 
      "</li>");
    
    });

  }

  populateImageGalleryModal();

  // move modal in DOM -- takes into account z-index values for other other elements

  function moveImageGalleryModal() {

    $("#modal-carousel").insertAfter(".site-footer");

  }

  moveImageGalleryModal();

  // init Unslider on carousel markup

  function initImageGalleryCarousel() {

    var photoBlockSlider = $('.carousel--photo-blocks .carousel__list-wrapper');

    // wrap navigation arrows in additional <div> for further CSS ontrol

    photoBlockSlider.on('unslider.ready', function() {
      $(".photo-block__carousel-arrow").wrapAll("<div class='photo-block__carousel-arrows'></div>");
    });

    // init Unslider

    photoBlockSlider.unslider({
      autoplay: true,
      delay: 4000, 
      animation: "fade",
      animateHeight: true,
      nav: true,
      arrows: {
        prev: "<a class='unslider-arrow prev photo-block__carousel-arrow' href='javascript://'><span class='visually-hidden'>Prev</span><i class='icon-keyboard-arrow-left'></i></a>",
        next: "<a class='unslider-arrow next photo-block__carousel-arrow' href='javascript://'><span class='visually-hidden'>Next</span><i class='icon-keyboard-arrow-right'></i></a>"
      }
    });

    // when clicking thumb, show corresponding carousel image

    $(".image-gallery .thumb").click(function(e) {

      var imageNumber = $(this).attr("data-image-number"), 
          imageNumber = imageNumber - 1, // slides are zero-indexed, so substract 1
          firstRun = true;

        photoBlockSlider.data('unslider').animate(imageNumber); // resource: https://github.com/idiot/unslider/issues/522

      // when clicking thumbs, prevent scrolling to top of page

      var x = window.pageXOffset,
          y = window.pageYOffset;
          
      $(window).one('scroll', function () {
        window.scrollTo(x, y);
      })
      
    });
  
  }

  initImageGalleryCarousel();

}());
