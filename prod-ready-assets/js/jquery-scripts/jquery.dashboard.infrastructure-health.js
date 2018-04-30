//
// Dashboard > Infrastructure Health
//

//(function(window, $, undefined){
$(function() {

  if ( $("#infrastructureHealthComponents").length > 0 ) {

    // - - - - - - tooltip functions
    function newTooltip(){

      $("body").append("<div id='new-tooltip' class='ncsvgmap-tooltip'>&nbsp;</div>");
      $("#new-tooltip").css({
        "display"       : "none",
        "position"      : "absolute",
        "z-index"       : 3,
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

    //Add onClick to dropdown/*/*/*/*/*/*/*/*/*/*/*/*/*////////////////////////////////////////////////////////////////////////////////////////////////////

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

                  //GetCountyId($(title));
                  //the infrastructure charts don't get redrawn every time the
                  //county changes.  So pass 'false' to the function that draws
                  //these to tell it to just redraw the county gauge charts
                  loadInfrastructureData(title, false);

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

          complete:function(svgdata, geodata) {
            var self = this;
            //console.log({context:self, arguments:arguments});

            if ($("body.lt-ie9").length == 1) {
              alert("svg not supported.");
            }
            else {
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

  }

//})(this, jQuery);
}());

function loadInfrastructureData(whichCounty, buildStateCharts) {

    countyName = whichCounty;

    //this is currently set to load the data from a static JSON file that was dumped from DOT
    //webservice.  This needs to be configured to load from the DOT webservice. The URL
    //for the webservice is commented out below

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../../assets/text/infrastructure-health.txt');
    //xhr.open('GET', 'https://apps.ncdot.gov/dot/dashboard/api/infrastructure/'+whichCounty);
    xhr.onload = function() {
        if (xhr.status === 200) {
            if (buildStateCharts) {
                drawInfrastructureCharts(this.responseText);
            }

            drawGaugeCharts(this.responseText);
        }
        else {
            alert('Could not load data');
        }
    };
    xhr.send();
}

function drawGaugeCharts(objData) {

    ///////

    //the JSON data is structured a little differently since you can call each county directly.  Once this data
    //comes from the DOT webservice, you won't need these lines
    objData = JSON.parse(objData);
    //set the objData variable to the correct level in the JSON
    var dataArray = objData.ArrayOfCountyData.CountyData;

    //pull out the county data and the statewide data
    var countyData = dataArray.filter(function(county) {
        if (county.CountyName === countyName) {
            return true;
        }
    });

    //the data for the gauge charts is always the LAST (most recent) object in the Infrastructure Health History array
    var countyInfraData = countyData[0].InfrastructureHealthHistory[countyData[0].InfrastructureHealthHistory.length-1];

    //append 'county' to the name of the county, since it doesn't come through in the JSON
    if (countyName !== 'Statewide') {
        countyName += ' County';
    }

    ///////


    var BridgeData = google.visualization.arrayToDataTable([
                  ['Label', 'Value'],
                  ["Bridge", Number(countyInfraData.BridgeHealth)],
                ]);

    //set the header text for each gauge chart
    //document.querySelector('.bridgeHealthGaugeHeading').innerHTML = 'Bridge Health Index<br />' + countyName;
    document.getElementById('bridgeHealthHeading').innerHTML = 'Bridge Health Index &ndash; ' + countyName;
    //document.querySelector('.gauge-box__sub-heading--bridge-health').innerHTML = countyName;

    var PavementConditionData = google.visualization.arrayToDataTable([
                  ['Label', 'Value'],
                  ["Pavement", Number(countyInfraData.PavementCondition)],
                ]);

    //document.querySelector('.pavementConditionGaugeHeading').innerHTML = 'Pavement Condition<br>' + countyName;
    document.getElementById('pavementConditionHeading').innerHTML = 'Pavement Condition &ndash; ' + countyName;

    var RoadsideData = google.visualization.arrayToDataTable([
                  ['Label', 'Value'],
                  ["Roadside", Number(countyInfraData.RoadsideFeatureCondition)],
                ]);


    //document.querySelector('.roadsideGaugeHeading').innerHTML = 'Roadside Feature Condition &ndash; ' + countyName;
    document.getElementById('roadsideFeatureHeading').innerHTML = 'Roadside Feature Condition &ndash; ' + countyName;

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

    var Bridgechart = new google.visualization.Gauge(document.getElementById('bridgeHealthGauge'));
    Bridgechart.draw(BridgeData, options);

    var Pavementchart = new google.visualization.Gauge(document.getElementById('pavementConditionGauge'));
    Pavementchart.draw(PavementConditionData, options);

    var Roadsidechart = new google.visualization.Gauge(document.getElementById('roadsideGauge'));
    Roadsidechart.draw(RoadsideData, options);


}

function drawInfrastructureCharts(objData) {

    ///////

    //the JSON data is structured a little differently since you can call each county directly.  Once this data
    //comes from the DOT webservice, you won't need these lines

    objData = JSON.parse(objData);
    //set the objData variable to the correct level in the JSON
    var dataArray = objData.ArrayOfCountyData.CountyData;

    //pull out the county data and the statewide data
    var statewideInfraData = dataArray.filter(function(county) {
        if (county.CountyName === 'Statewide') {
            return true;
        }
    });

    ///////

    //this will need be tweaked based on how the data comes back from DOT
    //couldn't match our test data exactly

    //build the statewide table chart
    var stateInfraHealthTable = document.createElement('table');
    //stateInfraHealthTable.classList.add('table','table-striped','table-hover');
    stateInfraHealthTable.className += 'table';
    stateInfraHealthTable.className += ' table-striped';
    stateInfraHealthTable.className += ' table-hover';

    var tableBodyTag = document.createElement('tbody');
    stateInfraHealthTable.appendChild(tableBodyTag);

    var stateInfraHealthTableHeader = stateInfraHealthTable.insertRow();
    stateInfraHealthTableHeader.insertCell().outerHTML = '<th>Year</th>';
    stateInfraHealthTableHeader.insertCell().outerHTML = '<th>Bridge Health</th>';
    stateInfraHealthTableHeader.insertCell().outerHTML = '<th>Pavement Condition</th>';
    stateInfraHealthTableHeader.insertCell().outerHTML = '<th>Roadside Feature Condition</th>';

    //set up datatable to draw the statewide column charts
    var stateWideInfraDataTable = new google.visualization.DataTable();
    stateWideInfraDataTable.addColumn('string', 'Year');
    stateWideInfraDataTable.addColumn('number', 'Bridge Health');
    stateWideInfraDataTable.addColumn('number', 'Pavement Condition');
    stateWideInfraDataTable.addColumn('number', 'Roadside Feature');

    for (var a=0; a <= (statewideInfraData[0].InfrastructureHealthHistory.length-1); a++) {

        var item = statewideInfraData[0].InfrastructureHealthHistory[a];
        //add row for the statewide datato the column chart data
        stateWideInfraDataTable.addRows(
            [
                [item.Year.toString(), Number(item['BridgeHealth']), Number(item['PavementCondition']), Number(item['RoadsideFeatureCondition'])]
            ]);

        //add the HTML row to table chart
        var stateWideInfraDataTableRow = stateInfraHealthTable.insertRow();

        var newCell = stateWideInfraDataTableRow.insertCell();
        var newText = document.createTextNode(item.Year.toString());
        newCell.appendChild(newText);

        newCell = stateWideInfraDataTableRow.insertCell();
        newText = document.createTextNode(item.BridgeHealth.toString());
        newCell.appendChild(newText);

        newCell = stateWideInfraDataTableRow.insertCell();
        newText = document.createTextNode(item.PavementCondition.toString());
        newCell.appendChild(newText);

        newCell = stateWideInfraDataTableRow.insertCell();
        newText = document.createTextNode(item.RoadsideFeatureCondition.toString());
        newCell.appendChild(newText);

        //var stateWideInfraDataTableContainer = document.querySelector('.yearlyStatisticsTable');
        var stateWideInfraDataTableContainer = document.getElementById('yearlyStatisticsTable');
        stateWideInfraDataTableContainer.appendChild(stateInfraHealthTable);

    }

    var statewideBarChartOptions = {
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
          title: '',
          logScale: false,
          format: '#\'%\''
        },
        colors: ['#397AAC','#A83338','#588023']
      };


    //append the HTML state table to the DOM
    var stateInfraHealthChart = new google.visualization.ColumnChart(document.getElementById('chartInfrastructureHealth'));
    stateInfraHealthChart.draw(stateWideInfraDataTable, statewideBarChartOptions);

}

function formatCommas(number) {

    number += '';
    x = number.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] + '0' : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2.substring(0,3);
}

$(function() {

  if ( $("#infrastructureHealthComponents").length > 0 ) {

    //document.addEventListener("DOMContentLoaded", function(event) {

      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart', 'gauge', 'bar'],'callback': function() {

        //set the action for the dropdown to reload fatality data
        document.querySelector('#ListCounty').onchange = function(e) {
            //the infrastructure charts don't get redrawn every time the
            //county changes.  So pass 'false' to the function that draws
            //these to tell it to just redraw the county gauge charts
            var selectedCounty = $("#ListCounty :selected").text();
            //make sure you didn't select the default
            if (selectedCounty != '- Select County -') {
                //GetCountyId($(title));
                loadInfrastructureData(selectedCounty, false);
            }
        }

        //make the first call to load the statewide fatality data
        loadInfrastructureData('Statewide', true);

      }});

    //});

  }

}());
