//
// bing map -- NC12projects
//

$(document).ready(function() {

  if ( $('#NC12projects').length > 0 ) {

    //init the bing map with map options
    $('#NC12projects, NC12projects2').NCDOTBingMap({
      mapCenterLat:35.44654711408664,
      mapCenterLong: -75.79854052600098,
      zoom:9,
      showMapTypeSelector:false
    });

    /* since the pin data could come from a variety of sources, the call to get the pins
    stays in the HTML, not in the jQuery plugin */

    //make the call to load the map pin data
    $.ajax({
      type: 'GET',
      url: '../../assets/xml/NC12-projects.xml',
      data: {},
      contentType: "application/xml; charset=utf-8",
      dataType: "xml",
      success: setNC12Pins
    });

    function setNC12Pins(response) {

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
              parsedItem.title = value.textContent.replace('&amp;', '&');
            }

            if (value.nodeName === 'description') {

              var desc = value.textContent.replace('<![CDATA[', '').replace(']]>', '').replace(/^"(.*)"$/, '$1');
              parsedItem.description = desc;
            }

            if (value.nodeName === 'georss:point') {
              var stringArray = value.textContent.split(' ');
              parsedItem.coordinates = {lat: stringArray[0], long:stringArray[1]};
            }
          });

          parsedItem.iconPath = '../../assets/images/maps/bing/nc12projects-pin.svg';
          parsedItem.pinWidth = 45;
          parsedItem.pinHeight = 45;

          pinArray.push(parsedItem);

      }

      $('#NC12projects').data('NCDOTBingMap').setPins(pinArray);

      //load the directions module to highlight sections of route 12 on the map
      Microsoft.Maps.loadModule('Microsoft.Maps.Directions', { callback: directionsModuleLoaded });

    }

    function directionsModuleLoaded()
    {

      var routeRequestOptions = {routeDraggable:false};
      var routeRenderOptions = {waypointPushpinOptions: {visible:false}, autoUpdateMapView: false};


      // Initialize drawing the Buxton route
      buxtonRouteLine = new Microsoft.Maps.Directions.DirectionsManager($('#NC12projects').data('NCDOTBingMap').map);
      buxtonRouteLine.setRequestOptions(routeRequestOptions);
      buxtonRouteLine.setRenderOptions(routeRenderOptions);

      // Create start and end waypoints
      var startWaypoint = new Microsoft.Maps.Directions.Waypoint({ location: new Microsoft.Maps.Location(35.331477, -75.507531)});
      var endWaypoint = new Microsoft.Maps.Directions.Waypoint({ location : new Microsoft.Maps.Location(35.260163,-75.585508)});

      buxtonRouteLine.addWaypoint(startWaypoint);
      buxtonRouteLine.addWaypoint(endWaypoint);

      // Specify a handler for when an error and success occurs
      Microsoft.Maps.Events.addHandler(buxtonRouteLine, 'directionsError', displayError);

      // Calculate directions, which displays a route on the map
      buxtonRouteLine.calculateDirections();

      // Draw the Hatteras village route
      hatterasRouteLine = new Microsoft.Maps.Directions.DirectionsManager($('#NC12projects').data('NCDOTBingMap').map);
      hatterasRouteLine.setRequestOptions(routeRequestOptions);
      hatterasRouteLine.setRenderOptions(routeRenderOptions);

      // Create start and end waypoints
      var startWaypoint = new Microsoft.Maps.Directions.Waypoint({ location: new Microsoft.Maps.Location(35.228093, -75.635161)});
      var endWaypoint = new Microsoft.Maps.Directions.Waypoint({ location : new Microsoft.Maps.Location(35.215656,-75.67548)});

      hatterasRouteLine.addWaypoint(startWaypoint);
      hatterasRouteLine.addWaypoint(endWaypoint);

      // Specify a handler for when an error and success occurs
      Microsoft.Maps.Events.addHandler(hatterasRouteLine, 'directionsError', displayError);

      // Calculate directions, which displays a route on the map
      hatterasRouteLine.calculateDirections();

      // Draw the Hatteras village route
      ocracokeIslandRouteLine = new Microsoft.Maps.Directions.DirectionsManager($('#NC12projects').data('NCDOTBingMap').map);
      ocracokeIslandRouteLine.setRequestOptions(routeRequestOptions);
      ocracokeIslandRouteLine.setRenderOptions(routeRenderOptions);

      // Create start and end waypoints
      var startWaypoint = new Microsoft.Maps.Directions.Waypoint({ location: new Microsoft.Maps.Location(35.188891,-75.779743)});
      var endWaypoint = new Microsoft.Maps.Directions.Waypoint({ location : new Microsoft.Maps.Location(35.148968,-75.868363)});

      ocracokeIslandRouteLine.addWaypoint(startWaypoint);
      ocracokeIslandRouteLine.addWaypoint(endWaypoint);

      // Specify a handler for when an error and success occurs
      Microsoft.Maps.Events.addHandler(ocracokeIslandRouteLine, 'directionsError', displayError);

      // Calculate directions, which displays a route on the map
      ocracokeIslandRouteLine.calculateDirections();





    }

    function displayError() {
      console.log('display error');
    }

  }

});
