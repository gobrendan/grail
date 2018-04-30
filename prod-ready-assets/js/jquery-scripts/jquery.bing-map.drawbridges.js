//
// bing map -- drawbridges
//

$(document).ready(function() {

  if ( $('#drawbridges').length > 0 ) {

    //init the bing map with map options
    $('#drawbridges').NCDOTBingMap({
      mapCenterLat:35.26356186215209,
      mapCenterLong: -77.091064453125,
      zoom:7,
      showMapTypeSelector:false
    });

    /* since the pin data could come from a variety of sources, the call to get the pins
    stays in the HTML, not in the jQuery plugin */

    //make the call to load the map pin data
    $.ajax({
      type: 'GET',
      url: '../../assets/xml/drawbridges.xml',
      data: {},
      contentType: "application/xml; charset=utf-8",
      dataType: "xml",
      success: setDrawBridgePins
    });

    function setDrawBridgePins(response) {

      //grab the array of pins
      //var xmlBody = $.parseXML(response.childNodes[0].outerHTML);
      //var pinArrayFromXML = $(xmlBody).find('item');
      var pinArrayFromXML = $(response).find('item');
      var pinArray = [];

      //loop through the pins
      for (var i = 0 ; i < pinArrayFromXML.length; i++) {

          var parsedItem = {};

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

            if (value.nodeName === 'georss:point') {
              var stringArray = value.textContent.split(' ');
              parsedItem.coordinates = {lat: stringArray[0], long:stringArray[1]};
            }

            parsedItem.iconPath = '../../assets/images/maps/bing/bridge.svg';

            parsedItem.pinWidth = 45;
            parsedItem.pinHeight = 45;



          });

          pinArray.push(parsedItem);

      }


        /* the setPin function can take an object with the following properties:

        coordinates: an object with 'lat' and 'long' properties,
        title: the name of this pin
        description: the infobox description
        iconPath: the path to the custom icon

        */

      $('#drawbridges').data('NCDOTBingMap').setPins(pinArray);


    }

  }

});
