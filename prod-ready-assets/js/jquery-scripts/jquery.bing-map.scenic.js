//
// bing map -- scenic
//

$(document).ready(function() {

  if ( $('#scenic').length > 0 ) {

    //init the bing map with map options
    $('#scenic').NCDOTBingMap({
      showMapTypeSelector:false
    });

    /* since the pin data could come from a variety of sources, the call to get the pins
    stays in the HTML, not in the jQuery plugin */

    //make the call to load the map pin data
    $.ajax({
      type: 'GET',
      url: '../../assets/xml/scenic-coastal.xml',
      data: {},
      contentType: "application/xml; charset=utf-8",
      dataType: "xml",
      success: setScenicPins
    });

    $.ajax({
      type: 'GET',
      url: '../../assets/xml/scenic-mountain.xml',
      data: {},
      contentType: "application/xml; charset=utf-8",
      dataType: "xml",
      success: setScenicPins
    });

    $.ajax({
      type: 'GET',
      url: '../../assets/xml/scenic-piedmont.xml',
      data: {},
      contentType: "application/xml; charset=utf-8",
      dataType: "xml",
      success: setScenicPins
    });

    function setScenicPins(response) {

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

          var hasTitle = false;
          var hasOwnPoint = false;

          itemChildren.forEach(function(value, key) {

            if (value.nodeName === 'title') {
              parsedItem.title = value.textContent;
              hasTitle = true;
            }

            if (value.nodeName === 'description') {

              var desc = value.textContent.replace('<![CDATA[', '').replace(']]>', '').replace(/^"(.*)"$/, '$1');
              parsedItem.description = desc;
            }

            if (value.nodeName === 'georss:point') {
              var stringArray = value.textContent.split(' ');
              parsedItem.coordinates = {lat: stringArray[0], long:stringArray[1]};
              hasOwnPoint = true;
            }

            //parse out coordinates for drawing the scenic byway route
            if (value.nodeName === 'georss:line') {
              var coordinatesArray = value.textContent.split(' ');
              var coordinateCount = coordinatesArray.length;
              lineLocationArray = [];

              for (var j=0; j < coordinateCount/2; j++) {
                lineLocationArray.push(new Microsoft.Maps.Location(coordinatesArray.shift(), coordinatesArray.shift()));
              }

              drawLine(lineLocationArray);

            }

          });

            if (!hasOwnPoint && hasTitle) {
              var middleCoordinates = lineLocationArray[Math.floor(lineLocationArray.length/2)];
              parsedItem.coordinates = {lat: middleCoordinates.latitude.toString(), long: middleCoordinates.longitude.toString()};
            }

            if (parsedItem.coordinates) {
              //set the custon icon path
              parsedItem.iconPath = '../../assets/images/maps/bing/scenic-pin.svg';
              pinArray.push(parsedItem);
            }




      }

      function drawLine(coordinateArray) {

        // Create a polyline
        //var line = new Microsoft.Maps.Polyline(coordinateArray);

        var line = new Microsoft.Maps.Polyline(coordinateArray, {
          strokeColor: new Microsoft.Maps.Color(255,88,128,35)
        });

        Microsoft.Maps.Events.addHandler(line, 'click', function() {
          console.log('line clicked');
        });

        // Add the polyline to the map
        $('#scenic').data('NCDOTBingMap').map.entities.push(line);






      }

      $('#scenic').data('NCDOTBingMap').setPins(pinArray);


    }

  }

});
