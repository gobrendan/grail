//
// bing map -- IMAP
//

$(document).ready(function() {

  if ( $('#IMAP').length > 0 ) {

    //init the bing map with map options
    $('#IMAP').NCDOTBingMap({
      mapCenterLat:35.3460,
      mapCenterLong: -79.4170,
      zoom:7,
      showMapTypeSelector:false
    });

    /* since the pin data could come from a variety of sources, the call to get the pins
    stays in the HTML, not in the jQuery plugin */

    //make the call to load the map pin data
    $.ajax({
      type: 'GET',
      url: '../../assets/xml/IMAP-stations.xml',
      data: {},
      contentType: "application/xml; charset=utf-8",
      dataType: "xml",
      success: setIMAPPins
    });

    function setIMAPPins(response) {

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
              parsedItem.title = value.textContent;
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

          parsedItem.iconPath = '../../assets/images/maps/bing/imap-pin.svg';
          parsedItem.pinWidth = 45;
          parsedItem.pinHeight = 45;

          pinArray.push(parsedItem);

      }

      $('#IMAP').data('NCDOTBingMap').setPins(pinArray);

    }

  }

});
