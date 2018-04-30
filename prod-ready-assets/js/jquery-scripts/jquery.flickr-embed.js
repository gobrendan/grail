//
// Flickr embed code
// https://gist.github.com/arigesher/8932051
//

// $(document).ready(function() {
//     $(".flickr-embed iframe").each(function(index) {
//         var ratio = $(this).height() / $(this).width();
//         var origHeight = $(this).height();
//         var origWidth  = $(this).width();
//         var self = this;
//         // bind to window with closure that references the
//         // iframe since the iframe doesn't get resize events
//         // until (you know) we resize it.
//         $(window).resize(function() {
//             if($(self).parent().width() > origWidth) {
//                 $(self).width(origWidth);
//                 $(self).height(origHeight);
//             } else {
//                 $(self).width($(self).parent().width());
//                 $(self).height($(self).parent().width() * ratio);
//             }
//         });
//     });
//     $(window).resize();
// });
