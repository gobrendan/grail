//
// slick -- carousel
//
// http://kenwheeler.github.io/slick/
//

$(function() {

  // basic carousel

  $(".gr-c-carousel--default").find(".gr-c-carousel__set").slick({

    arrows: true, 
    dots: true, 
    infinite: true, 
    speed: 500,
    autoplay: true, 
    autoplaySpeed: 3000, 
    slidesToShow: 1, 
    slidesToScroll: 1

  });

  // media box carousel

  $(".gr-c-carousel--media-box").find(".gr-c-carousel__set").slick({

    arrows: true, 
    dots: true, 
    infinite: true, 
    speed: 500,
    autoplay: true, 
    autoplaySpeed: 3000, 
    slidesToShow: 1, 
    slidesToScroll: 1

  });

  // carousel with thumbnails

  $(".gr-c-carousel--w-thumbs").find(".gr-c-carousel__set").slick({

    arrows: true, 
    dots: true, 
    infinite: true, 
    speed: 500,
    autoplay: true, 
    autoplaySpeed: 3000, 
    slidesToShow: 1, 
    slidesToScroll: 1

  });

  $(".gr-c-carousel--w-thumbs").find(".gr-c-carousel__thumb-wrapper").click(function() {

    $(this).closest(".gr-c-carousel").find('.gr-c-carousel__set').slick('slickGoTo', $(this).index());

  });

  // card carousel

  $(".gr-c-carousel--cards").find(".gr-c-carousel__set").slick({

    arrows: false, 
    dots: false, 
    infinite: true, 
    speed: 500,
    autoplay: true, 
    autoplaySpeed: 3000, 
    slidesToShow: 1, 
    slidesToScroll: 1, 
    centerMode: true//,
    //centerPadding: '2rem'

  });


}());
