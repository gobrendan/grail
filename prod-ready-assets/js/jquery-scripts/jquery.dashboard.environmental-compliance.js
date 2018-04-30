//
// Dashboard > Environmental Compliance
//


$(function() {

  if ($("#environmentalComplianceComponents").length > 0 ) {

    function newTooltip() {

      //$("body").append("<div id='new-tooltip' class='ncsvgmap-tooltip'>&nbsp;</div>");
      //$(".toolz").append("<div id='new-tooltip' class='ncsvgmap-tooltip'>&nbsp;</div>");
      $("html").append("<div id='new-tooltip' class='ncsvgmap-tooltip'>&nbsp;</div>");

      $("#new-tooltip").css({

        "display"       : "none",
        "position"      : "absolute",
        //"z-index"       : 3,
        "z-index"       : 999999999999999,
        "margin-left"   : "-75px",
        "margin-top"    : "-64px",
        "border-radius" : "3px",
        "text-transform": "none"

      });

      $(document).bind('mousemove', function(e){

        $("#new-tooltip").css({

          left:  e.pageX,
          top:   e.pageY

        });

      });

    }

    function updateTooltip(text){
        $("#new-tooltip").html(text).css("display","block");
    }
    function clearTooltip(){
        $("#new-tooltip").html("&nbsp;").css("display","none");
    }
    newTooltip();

    //Add onClick to dropdown/*/*/*/*/*/*/*/*/*/*/*/*/*///////////////////////////////////////////////////////////////////////////////////////////////

    // - - - - - - init
    function init(){

        $.ncsvgmap({
            displayelement: $('#mapStage'),
            svgfile:        '../../assets/images/maps/svg/ncstatemap.svg',
            svgselector:    ['.county > g','.ncsvgmap-datapoint', 'select'],
            hover:          'ncsvgmap-hover',

            //-- add whatever events you want, just remember you have to filter the element triggers
            events:
            {
               mouseover:function(event, svgdata, geodata, tooltip, sidedisplay)
                {
                },

                click:function(event, svgdata, geodata, tooltip, sidedisplay)
                {
                    var title = this.getAttribute("data-name");
                    if (title == 'Mcdowell County') { title = 'McDowell County';}
                    $("input[name='term']").val(title);
                    title = title.replace(" County","");
                    $("select[name='county'] option").each(function(){
                        if ($(this).text() == title) {$(this).attr("selected","selected"); return;}
                    });
                    $("input[type='submit']").addClass("loading");

                    //Interface
                    $('#ListCounty').val(title).attr("selected", "selected");

                    loadEnvironmentalCompliance(title);

                    // Give active class to clicked county, remove active class from other counties
                    $(".ncsvgmap-hover").removeClass("active");
                    $(this).addClass("active");

                },

                mouseout:function(event, svgdata, geodata, tooltip, sidedisplay)
                {
                },

                change:function()
                {
                    var self = this;
                    console.log({context:self, arguments:arguments});
                },

                callback:function() {
                    console.log('callback');
                }




            },


            //-- add some coordinates and labels
            geodata:function() //-- able to use deferreds
            {
                var def = new $.Deferred();

                setTimeout(function(){
                    def.resolve( [
                     //   {id:0,          lat:35.2270869, lon:-80.8431267, desc:'wooot one'},
                     //   {id:"second",   lat:35.772096,  lon:-78.6386145, desc:'woot two'},
                     //   {id:"third",    lat:35.9131996, lon:-79.0558445, desc:'woot three'}
                    ] );
                },1000);

                return def.promise();
            },

            //-- create a dropdown list based off of the same SVG/XML
            unsupported:function(svgdata)
            {
                var template = $('<select></select>');

                svgdata.nodes.sort(function(a,b)
                {
                    var name1 = $(a).attr('id'),
                        name2 = $(b).attr('id');
                    return name1 > name2;
                });

                $(svgdata.nodes).each(function()
                {
                    var jself       = $(this),
                        realid      = $.trim(jself.attr('data-id')),
                        name        = $.trim(jself.attr('data-name')),
                        desc        = $.trim(jself.attr('data-desc')),
                        option      = $( '<option value="{0}">{1}</option>'.replace('{0}', realid).replace('{1}', name) );

                    template.append(option);
                });

                return template;
            },

            error:null,

            complete:function(svgdata, geodata)
            {
                var self = this;
                //console.log({context:self, arguments:arguments});

                if ($("body.lt-ie9").length == 1) {
                    alert("svg not supported.");
                } else {

                        $(".county > g").bind("mouseover",function(){
                            var title = $(this).attr("data-name");
                            if (title == 'Mcdowell County') { title = 'McDowell County';}
                            updateTooltip(title);
                        });
                        $(".county > g").bind("mouseout",function(){
                             clearTooltip();
                        });
                        $(svgdata.data.parent).addClass('ncsvgmap-fadein');
               }
            }
        });


        //make the first call to load the statewide fatality data
        // loadInfrastructureData('Statewide', true);

    }

    init();

    //these vars are used throughout this script
    var countyName = 'statewide';
    var lastUpdate = '';

    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart', 'gauge'],'callback': function() {

          //this needs to be changed to load data from the DOT's webservice
          //couldn't do that due to cross-domain restrictions

          //set the action for the dropdown to reload fatality data
          document.getElementById('ListCounty').onchange = function(e) {
              loadEnvironmentalCompliance(this.value);
          }

          //make the first call to load the statewide fatality data
          loadEnvironmentalCompliance('Statewide');


    }});

  }

}());

function loadEnvironmentalCompliance(whichCounty) {

    countyName = whichCounty;

    //this is currently set to load the data from a static JSON file that was dumped from DOT
    //webservice.  This needs to be configured to load from the DOT webservice. The URL
    //for the webservice is commented out below

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../../assets/text/environmental-compliance.txt');
    //xhr.open('GET', 'https://apps.ncdot.gov/dot/dashboard/api/incidentduration/'+whichCounty);
    xhr.onload = function() {
        if (xhr.status === 200) {
            drawEnvironmentalCompliance(this.responseText);
        }
        else {
            alert('Could not load data');
        }
    };
    xhr.send();
}

function drawEnvironmentalCompliance(response) {


    ///////

    //the JSON data is structured a little differently since you can call each county directly.  Once this data
    //comes from the DOT webservice, you won't need these lines
    objData = JSON.parse(response);
    //set the objData variable to the correct level in the JSON
    var countyData = objData.ArrayOfCountyData.CountyData;

    //find which county you need
    for (var c=0; c <= (countyData.length-1); c++) {
        if (countyData[c].CountyName === countyName) {

            //append 'county' to the name of the county, since it doesn't come through in the JSON
            if (countyData[c].CountyName !== 'Statewide') {
                countyName += ' County';
            }

            countyData = countyData[c].EnvironmentalCompliance;
            break;
        }
    }

    ///////

    //set the header text for the charts based on the county that's selected



    document.getElementById('environmentalGaugeHeader').innerHTML = 'Environmental Compliance: ' + countyName;

    document.getElementById('environmentalChartHeader').innerHTML = 'Monthly Averages for Project Compliance Ratings: ' + countyName;




    //the gauge charts display the YTD average. So for the current county need to loop through all the months
    //that come back and get the average

    var roadMaintenanceAvg = 0;
    var bridgeMaintenanceAvg = 0;
    var contractConstructionAvg = 0;

    var environmentalBarChartDataTable = new google.visualization.DataTable();
    environmentalBarChartDataTable.addColumn('string', 'Year');
    environmentalBarChartDataTable.addColumn('number', 'Road Maintenance');
    environmentalBarChartDataTable.addColumn('number', 'Bridge Maintenance');
    environmentalBarChartDataTable.addColumn('number', 'Contract Construction');

    for (var d=0; d<= (countyData.length-1); d++) {

      roadMaintenanceAvg += countyData[d].RoadMaintenance;
      bridgeMaintenanceAvg += countyData[d].BridgeMaintenance;
      contractConstructionAvg += countyData[d].ContractConstruction;

      environmentalBarChartDataTable.addRows(
          [
              [countyData[d].InspectionDate, Number(countyData[d].RoadMaintenance), Number(countyData[d].BridgeMaintenance), Number(countyData[d].ContractConstruction)]
          ]
      );
    }

    //divide each total by the number of months that come back from the service
    roadMaintenanceAvg = parseFloat((roadMaintenanceAvg/countyData.length).toFixed(2));
    bridgeMaintenanceAvg = parseFloat((bridgeMaintenanceAvg/countyData.length).toFixed(2));
    contractConstructionAvg = parseFloat((contractConstructionAvg/countyData.length).toFixed(2));

    //set the data arrays for each chart
    var roadMaintenanceData = google.visualization.arrayToDataTable([
                  ['Label', 'Value'],
                  ["", roadMaintenanceAvg],
                ]);


    var bridgeMaintenanceData = google.visualization.arrayToDataTable([
                  ['Label', 'Value'],
                  ["", bridgeMaintenanceAvg],
                ]);

    var contractConstructionData = google.visualization.arrayToDataTable([
                  ['Label', 'Value'],
                  ["", contractConstructionAvg],
                ]);


    var options = {
      width: 450, height: 200,
      redFrom:0, redTo: 3.333,
      yellowFrom: 3.333 , yellowTo: 6.666,
      greenFrom: 6.66, greenTo: 10,
      minorTicks: 0,
      max:10,
      redColor: '#A83338',
      yellowColor: '#C05411',
      greenColor: '#588023'
    };

    var roadMaintenanceChart = new google.visualization.Gauge(document.getElementById('roadMaintenanceChart'));
    roadMaintenanceChart.draw(roadMaintenanceData, options);

    var bridgeMaintenanceChart = new google.visualization.Gauge(document.getElementById('bridgeMaintenanceChart'));
    bridgeMaintenanceChart.draw(bridgeMaintenanceData, options);

    var contractConstructionChart = new google.visualization.Gauge(document.getElementById('contractConstructionChart'));
    contractConstructionChart.draw(contractConstructionData, options);


    //once you have the gauge charts drawn, draw the bar chart from the data table you made earlier
    var environmentalBarChartOptions = {
        legend: { position: 'top' },
        hAxis: {
          title: 'Year',
          logScale: true
        },
        animation: {
            duration: 1500,
            startup: true, //This is the new option,
            easing:'inAndOut'
        },
        vAxis: {
          title: 'Quantity',
          logScale: false
        },
        colors: ['#3F7D97','#A83338','#588023']
      };


    //append the HTML state table to the DOM
    var environmentalBarChart = new google.visualization.ColumnChart(document.getElementById('environmentalBarChart'));
    environmentalBarChart.draw(environmentalBarChartDataTable, environmentalBarChartOptions);



}
