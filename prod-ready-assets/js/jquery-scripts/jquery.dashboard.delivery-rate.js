//
// Dashboard > Delivery Rate
//

$(function() {

  if ( $("#deliveryRateComponents").length > 0 ) {

    //document.addEventListener("DOMContentLoaded", function(event) {

      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart', 'gauge'],'callback': function() {

            //this needs to be changed to load data from the DOT's webservice
            //couldn't do that due to cross-domain restrictions

            var xhr = new XMLHttpRequest();
            xhr.open('GET', '../../assets/xml/delivery-rate.xml');
            //xhr.open('GET', 'https://apps.ncdot.gov/dot/dashboard/api/safety/'+whichCounty);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    drawDeliveryRate(this.responseText);
                }
                else {
                    alert('Could not load data');
                }
            };
            xhr.send();

      }});

    //});

    function drawDeliveryRate(response) {

        ///////

        //the XML should come back from the DOT webservice the same as it loads from the local XML file here
        //but just an FYI this might need to be changed
        var xmlBody = $.parseXML(response);

        var DeliveryRateStat = $(xmlBody).find('DeliveryRate');
        var EnvironmentalScore = $(xmlBody).find('EnvironmentalScore');
        var NonSTIPProjectDevSuccess = $(xmlBody).find('NonSTIPProjectDevelopmentSuccessRate');
        var STIPProjectDevSuccess = $(xmlBody).find('STIPProjectDevelopmentSuccessRate');


        ///////

        //set the data arrays for each chart
        var STIPSuccessData = google.visualization.arrayToDataTable([
                      ['Label', 'Value'],
                      ["", Number(STIPProjectDevSuccess[0].innerHTML)],
                    ]);


        var nonSTIPSuccessData = google.visualization.arrayToDataTable([
                      ['Label', 'Value'],
                      ["", Number(NonSTIPProjectDevSuccess[0].innerHTML)],
                    ]);

        var EnvironmentalScore = google.visualization.arrayToDataTable([
                      ['Label', 'Value'],
                      ["", Number(EnvironmentalScore[0].innerHTML)],
                    ]);


        var options = {
          width: 450, height: 200,
          redFrom:0, redTo: 33.333,
          yellowFrom: 33.333 , yellowTo: 66.666,
          greenFrom: 66.66, greenTo: 100,
          minorTicks: 0,
          max:100,
          redColor: '#A83338',
          yellowColor: '#C05411',
          greenColor: '#588023'
        };

        var STIPSuccessChart = new google.visualization.Gauge(document.getElementById('STIPProjectSuccessRateChart'));
        STIPSuccessChart.draw(STIPSuccessData, options);

        var nonSTIPSuccessChart = new google.visualization.Gauge(document.getElementById('nonSTIPProjectSuccessRateChart'));
        nonSTIPSuccessChart.draw(nonSTIPSuccessData, options);

        var environmentalChart = new google.visualization.Gauge(document.getElementById('environmentalChart'));
        environmentalChart.draw(EnvironmentalScore, options);

    }

  }

}());
