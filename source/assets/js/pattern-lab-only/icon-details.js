//
// Show icon name for Material Design icons on hover -- only when viewing in Atoms > Icons
//

$(function() {

  var MD_icon = $(".sg-icon-list--MD").find(".material-icons");

  MD_icon.each(function(){
    $(this).hover(function(){

      var iconName,
          iconChar;

      if ($(this).data("name")) {

        iconName = $(this).data("name");

      }

      else {

        iconName = $(this).text();

      }

      if ($(this).data("char")) {

        iconChar = $(this).data("char");

        $(this).append("<div class='sg-icon-list__icon-detail'> \
            <span class='sg-icon-list__icon-name'>" + iconName + "</span> \
            &#60;i class='material-icons'&#62;<span>&</span>#x" + iconChar + ";&#60;/i&#62; \
            </div>");
      }

      else {

        iconChar = $(this).text();

        $(this).append("<div class='sg-icon-list__icon-detail'> \
            <span class='sg-icon-list__icon-name'>" + iconName + "</span> \
            &#60;i class='material-icons'&#62;" + iconChar + "&#60;/i&#62; \
            </div>");

      }

      $(this).addClass("sg-icon-list__icon--hover");

      // console.log(iconName);
      // console.log(iconChar);

    }, function(){

      $(this).removeClass("sg-icon-list__icon--hover");
      $(this).find(".sg-icon-list__icon-detail").remove();

    });

  });

}());
