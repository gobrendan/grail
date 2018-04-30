//
// bing map -- airports
//

$(document).ready(function() {

  if ( $('#airports').length > 0 ) {

    //init the bing map with map options
    $('#airports').NCDOTBingMap({
      enablePinZoom:true,
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
      url: '../../assets/xml/airports.xml',
      data: {},
      contentType: "application/xml; charset=utf-8",
      dataType: "xml",
      success: setAirportPins
    });

    function setAirportPins(response) {

      //grab the array of pins
      //var xmlBody = $.parseXML(response.childNodes[0].outerHTML);
      //var pinArrayFromXML = $(xmlBody).find('item');
      var pinArrayFromXML = $(response).find('item');
      var pinArray = [];

      //loop through the pins
      for (var i = 0 ; i < pinArrayFromXML.length; i++) {

          var parsedItem = {};
          var coordinates = {};
          //var itemChildren = pinArrayFromXML[i].childNodes;
          var itemChildren = Array.prototype.slice.call(pinArrayFromXML[i].childNodes)

          itemChildren.forEach(function(value, key) {

            if (value.nodeName === 'title') {
              //parsedItem.title = value.innerHTML;
              parsedItem.title = value.textContent;
            }

            if (value.nodeName === 'description') {

              //var desc = value.innerHTML.replace('<![CDATA[', '').replace(']]>', '').replace(/^"(.*)"$/, '$1');
              var desc = value.textContent.replace('<![CDATA[', '').replace(']]>', '').replace(/^"(.*)"$/, '$1');
              parsedItem.description = desc;
            }

            if (value.nodeName === 'geo:lat') {
              //coordinates.lat = value.innerHTML;
              coordinates.lat = value.textContent;
            }

            if (value.nodeName === 'geo:long') {
              //coordinates.long = value.innerHTML;
              coordinates.long = value.textContent;
            }

            if (value.nodeName === 'icon') {
              //var pinType = value.innerHTML;
              var pinType = value.textContent;

              if (pinType.indexOf('passenger') !== -1) {
                parsedItem.iconPath = '../../assets/images/maps/bing/passengerAirport.svg';
                parsedItem.tinyIconPath = '../../assets/images/maps/bing/passengerAirport-tiny.svg';
              } else {
                parsedItem.iconPath = '../../assets/images/maps/bing/privateAirport.svg';
                parsedItem.tinyIconPath = '../../assets/images/maps/bing/privateAirport-tiny.svg';
              }
            }

          });

          parsedItem.coordinates = coordinates;

          parsedItem.pinWidth = 45;
          parsedItem.pinHeight = 45;


          pinArray.push(parsedItem);

            /* the setPin function can take an object with the following properties:

            coordinates: an object with 'lat' and 'long' properties,
            title: the name of this pin
            description: the infobox description
            iconPath: the path to the custom icon
            tinyIconPath: the path to the 'tiny' or zoomed out icon (this is only used if the pinZoom option is enabled
            when the map is created)

            */
      }

      // Add pins
      $('#airports').data('NCDOTBingMap').setPins(pinArray);

      // Populate <select>
      $('#airports').data('NCDOTBingMap').createDropdownControl($('#airports_mapPinList')[0]);


    }

  }

});
