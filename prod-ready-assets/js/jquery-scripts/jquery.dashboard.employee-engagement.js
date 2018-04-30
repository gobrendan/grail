//
// Dashboard > Employee Enagement
//

$(function() {

  if ( $("#employeeEngagementComponents").length > 0 ) {

    //document.addEventListener("DOMContentLoaded", function(event) {

      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart', 'gauge'],'callback': function() {

            //this needs to be changed to load data from the DOT's webservice
            //couldn't do that due to cross-domain restrictions

            var xhr = new XMLHttpRequest();
            xhr.open('GET', '../../assets/xml/employee-engagement.xml');
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

  }

}());

function drawDeliveryRate(response) {

    ///////

    //the XML should come back from the DOT webservice the same as it loads from the local XML file here
    //but just an FYI this might need to be changed
    var xmlBody = $.parseXML(response);

    var CommitmentStat = $(xmlBody).find('EmotionalCommitment');
    var DiscretionaryEffortStat = $(xmlBody).find('DiscretionaryEffort');
    var IntentToStayStat = $(xmlBody).find('IntentToStay');

    ///////

    //set the data arrays for each chart
    var CommitmentData = google.visualization.arrayToDataTable([
                  ['Label', 'Value'],
                  ["", Number(CommitmentStat[0].innerHTML)],
                ]);


    var DiscretionaryEffortData = google.visualization.arrayToDataTable([
                  ['Label', 'Value'],
                  ["", Number(DiscretionaryEffortStat[0].innerHTML)],
                ]);

    var IntentToStayData = google.visualization.arrayToDataTable([
                  ['Label', 'Value'],
                  ["", Number(IntentToStayStat[0].innerHTML)],
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

    var CommitmentChart = new google.visualization.Gauge(document.getElementById('chartIncidentCommitment'));
    CommitmentChart.draw(CommitmentData, options);

    var DiscretionaryEffortChart = new google.visualization.Gauge(document.getElementById('chartIncidentDiscretionaryEffort'));
    DiscretionaryEffortChart.draw(DiscretionaryEffortData, options);

    var IntentToStayChart = new google.visualization.Gauge(document.getElementById('chartIncidentIntentToStay'));
    IntentToStayChart.draw(IntentToStayData, options);

}
