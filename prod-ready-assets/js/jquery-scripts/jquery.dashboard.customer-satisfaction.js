//
// Dashboard > Customer Satisfaction
//

$(function() {

  if ( $("#customerSatisfactionComponents").length > 0 ) {

    document.addEventListener("DOMContentLoaded", function(event) {

      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart', 'gauge'],'callback': function() {

        //draw the three gauge charts
       var CustomerSatisfactionRate = google.visualization.arrayToDataTable([
                      ['Label', 'Value'],
                      ["", 84],
                    ]);

        //set the header text for each gauge chart
        var ProgressRate = google.visualization.arrayToDataTable([
                      ['Label', 'Value'],
                      ["", 83],
                    ]);

        var StateComparisonRate = google.visualization.arrayToDataTable([
                      ['Label', 'Value'],
                      ["", 71],
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

        var customerSatisfactionChart = new google.visualization.Gauge(document.getElementById('customerSatisfactionChart'));
        customerSatisfactionChart.draw(CustomerSatisfactionRate, options);

        var ProgressChart = new google.visualization.Gauge(document.getElementById('ProgressChart'));
        ProgressChart.draw(ProgressRate, options);

        var StateComparisonChart = new google.visualization.Gauge(document.getElementById('StateComparisonChart'));
        StateComparisonChart.draw(StateComparisonRate, options);


      }});

    });

  }

}());
