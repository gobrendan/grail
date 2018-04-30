//
// bing map -- restAreaMap
//

$(document).ready(function() {

  if ( $('#restAreaMap').length > 0 ) {

    //init the bing map with map options
    $('#restAreaMap').NCDOTBingMap({
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
      url: '../../assets/xml/travel_restareas.xml',
      data: {},
      contentType: "application/xml; charset=utf-8",
      dataType: "xml",
      success: setRestAreaPins
    });

    function setRestAreaPins(response) {

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

            if (value.nodeName === 'icon') {

              var iconTypeFromXML = value.textContent;

              if (iconTypeFromXML.indexOf('_visitor') > -1) {
                //vistor center icon
                parsedItem.iconPath = '../../assets/images/maps/bing/visitorcenter-pin.svg';
              } else if (iconTypeFromXML.indexOf('_welcome') > -1) {
                //welcome center icon
                parsedItem.iconPath = '../../assets/images/maps/bing/welcomecenter-pin.svg';
              } else {
                //rest area icon
                parsedItem.iconPath = '../../assets/images/maps/bing/restarea-pin.svg';
              }

            }

          });

          //create directions link for each pin (if there is a description)
              //need to get the directions link out of the HTML and build the href for it
          if (parsedItem.description && parsedItem.description.indexOf('directionsLink') > -1) {
              parsedItem.description = parsedItem.description.replace('class="directionsLink" href=""','class="directionsLink" target="_blank" href="https://www.bing.com/maps?rtp=~pos.' + parsedItem.coordinates.lat + '_' + parsedItem.coordinates.long + '_' + parsedItem.title + '&rtop=0~1~0"');
          }

          parsedItem.pinWidth = 45;
          parsedItem.pinHeight = 45;

          pinArray.push(parsedItem);

      }

      /* the setPin function can take an object with the following properties:

      coordinates: an object with 'lat' and 'long' properties,
      title: the name of this pin
      description: the infobox description
      iconPath: the path to the custom icon

      */

      // Add pins
      $('#restAreaMap').data('NCDOTBingMap').setPins(pinArray);

      // Populate <select>
      $('#restAreaMap').data('NCDOTBingMap').createDropdownControl($('#restAreaMap_mapPinList')[0]);


    }

  }

});
