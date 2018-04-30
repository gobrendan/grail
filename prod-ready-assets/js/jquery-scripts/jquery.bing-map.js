//
// bing map
//

$(document).ready(function() {

  // Generic map

  if ( $('#bingMap').length > 0 ) {

    var lat = 35.785510,
        long = -78.642670;

    $('#bingMap, #bingMap2').NCDOTBingMap({

      enablePinZoom: false,
      zoom: 12,
      mapCenterLat: lat,
      mapCenterLong: long,
      showMapTypeSelector: false

    });

    var pinArray = [{

        coordinates: {
        lat: lat,
        long: long

      }
    }];

    $('#bingMap').data("NCDOTBingMap").setPins(pinArray);
    $('#bingMap2').data("NCDOTBingMap").setPins(pinArray);
    
  }

  // else {
  //
  //   $('#bingMap').NCDOTBingMap({
  //     enablePinZoom: false,
  //     zoom: 12,
  //     mapCenterAddress: item.fullAddress,
  //     showMapTypeSelector: false
  //   });
  //
  //   var pinArray = [{
  //     coordinates: item.fullAddress
  //   }];
  // }


  // Station map 1

  if ( $('#stationMap1').length > 0 ) {

    var lat = 36.030659,
        long = -78.967179;

    $('#stationMap1').NCDOTBingMap({

      enablePinZoom: false,
      zoom: 12,
      mapCenterLat: lat,
      mapCenterLong: long,
      showMapTypeSelector: false

    });

    var pinArray = [{

        coordinates: {
        lat: lat,
        long: long

      }
    }];

    $('#stationMap1').data("NCDOTBingMap").setPins(pinArray);

  }


  // Station map 2

  if ( $('#stationMap2').length > 0 ) {

    var lat = 36.030794,
        long = -78.890651;

    $('#stationMap2').NCDOTBingMap({

      enablePinZoom: false,
      zoom: 12,
      mapCenterLat: lat,
      mapCenterLong: long,
      showMapTypeSelector: false

    });

    var pinArray = [{

        coordinates: {
        lat: lat,
        long: long

      }
    }];

    $('#stationMap2').data("NCDOTBingMap").setPins(pinArray);

  }

  // Map box 1

  if ( $('#mapBoxDemo1').length > 0 ) {

    var lat = 35.785510,
        long = -78.642670;

    $('#mapBoxDemo1').NCDOTBingMap({

      enablePinZoom: false,
      zoom: 12,
      mapCenterLat: lat,
      mapCenterLong: long,
      showMapTypeSelector: false

    });

    var pinArray = [{

        coordinates: {
        lat: lat,
        long: long

      }
    }];

    $('#mapBoxDemo1').data("NCDOTBingMap").setPins(pinArray);

  }


  // Media block 1

  if ( $('#mediaBlockDemo1').length > 0 ) {

    var lat = 35.785510,
        long = -78.642670;

    $('#mediaBlockDemo1').NCDOTBingMap({

      enablePinZoom: false,
      zoom: 12,
      mapCenterLat: lat,
      mapCenterLong: long,
      showMapTypeSelector: false

    });

    var pinArray = [{

        coordinates: {
        lat: lat,
        long: long

      }
    }];

    $('#mediaBlockDemo1').data("NCDOTBingMap").setPins(pinArray);

  }


  // Media block 2

  if ( $('#mediaBlockDemo2').length > 0 ) {

    var lat = 35.785510,
        long = -78.642670;

    $('#mediaBlockDemo2').NCDOTBingMap({

      enablePinZoom: false,
      zoom: 12,
      mapCenterLat: lat,
      mapCenterLong: long,
      showMapTypeSelector: false

    });

    var pinArray = [{

        coordinates: {
        lat: lat,
        long: long

      }
    }];

    $('#mediaBlockDemo2').data("NCDOTBingMap").setPins(pinArray);

  }


  // Location block 1

  if ( $('#locationBlockDemo1').length > 0 ) {

    var lat = 35.768087,
        long = -78.694565;

    $('#locationBlockDemo1').NCDOTBingMap({

      enablePinZoom: false,
      zoom: 12,
      mapCenterLat: lat,
      mapCenterLong: long,
      showMapTypeSelector: false

    });

    var pinArray = [{

        coordinates: {
        lat: lat,
        long: long

      }
    }];

    $('#locationBlockDemo1').data("NCDOTBingMap").setPins(pinArray);

  }


  // Location block 2

  if ( $('#locationBlockDemo2').length > 0 ) {

    var lat = 35.768087,
        long = -78.694565;

    $('#locationBlockDemo2').NCDOTBingMap({

      enablePinZoom: false,
      zoom: 12,
      mapCenterLat: lat,
      mapCenterLong: long,
      showMapTypeSelector: false

    });

    var pinArray = [{

        coordinates: {
        lat: lat,
        long: long

      }
    }];

    $('#locationBlockDemo2').data("NCDOTBingMap").setPins(pinArray);

  }


  // Media block alt 1

  if ( $('#mediaBlockAlt1').length > 0 ) {

    var lat = 35.785510,
        long = -78.642670;

    $('#mediaBlockAlt1').NCDOTBingMap({

      enablePinZoom: false,
      zoom: 12,
      mapCenterLat: lat,
      mapCenterLong: long,
      showMapTypeSelector: false

    });

    var pinArray = [{

        coordinates: {
        lat: lat,
        long: long

      }
    }];

    $('#mediaBlockAlt1').data("NCDOTBingMap").setPins(pinArray);

  }


  // Bridge

  if ( $('#bridgeMap').length > 0 ) {

    var lat = 35.790560,
        long = -78.649760;

    $('#bridgeMap').NCDOTBingMap({

      enablePinZoom: false,
      zoom: 12,
      mapCenterLat: lat,
      mapCenterLong: long,
      showMapTypeSelector: false

    });

    var pinArray = [{

        coordinates: {
        lat: lat,
        long: long

      }
    }];

    $('#bridgeMap').data("NCDOTBingMap").setPins(pinArray);

  }

});
