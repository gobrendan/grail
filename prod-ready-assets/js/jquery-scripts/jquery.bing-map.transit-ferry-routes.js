//
// bing map -- transitFerryRoutes
//

$(document).ready(function() {

  if ( $('#transitFerryRoutes').length > 0 ) {

    //init the bing map with map options
    $('#transitFerryRoutes').NCDOTBingMap({
      mapCenterLat:35.24399356363098,
      mapCenterLong: -75.65060775,
      zoom:7,
      showMapTypeSelector:false
    });

    /* since the pin data could come from a variety of sources, the call to get the pins
    stays in the HTML, not in the jQuery plugin */

    //make the call to load the map pin data
    $.ajax({
      type: 'GET',
      url: '../../assets/xml/transit-ferry-routes.xml',
      data: {},
      contentType: "application/xml; charset=utf-8",
      dataType: "xml",
      success: setFerryRoutePins
    });

    function setFerryRoutePins(response) {

      //grab the array of pins
      //var xmlBody = $.parseXML(response.childNodes[0].outerHTML);
      //var pinArrayFromXML = $(xmlBody).find('item');
      var pinArrayFromXML = $(response).find('item');
      var pinArray = [];

      //loop through the pins
      for (var i = 0 ; i < pinArrayFromXML.length; i++) {

          var parsedItem = {};
          parsedItem.coordinates = {};

          //var itemChildren = pinArrayFromXML[i].childNodes;
          var itemChildren = Array.prototype.slice.call(pinArrayFromXML[i].childNodes)

          itemChildren.forEach(function(value, key) {

            if (value.nodeName === 'title') {
              parsedItem.title = value.textContent.replace('&amp;', '&');
            }

            if (value.nodeName === 'description') {

              var desc = value.textContent.replace('<![CDATA[', '').replace(']]>', '').replace(/^"(.*)"$/, '$1');
              parsedItem.description = desc;
            }

            if (value.nodeName === 'geo:lat') {
              parsedItem.coordinates.lat = value.textContent;
            }

            if (value.nodeName === 'geo:long') {
              parsedItem.coordinates.long = value.textContent;
            }

          });

          parsedItem.iconPath = '../../assets/images/maps/bing/ferry-pin--border-white.svg';

          parsedItem.pinWidth = 45;
          parsedItem.pinHeight = 45;


          pinArray.push(parsedItem);

      }

      // Add pins
      $('#transitFerryRoutes').data('NCDOTBingMap').setPins(pinArray);

      // Populate <select>
      $('#transitFerryRoutes').data('NCDOTBingMap').createDropdownControl($('#transitFerryRoutes_mapPinList')[0]);

    }

    function displayError() {
      console.log('display error');
    }

  }

});
