//
// Dashboard > Incident Duration
//

//(function(window, $, undefined){
$(function() {

  if ( $("#serviceReliabilityComponents").length > 0 ) {

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

                    loadIncidentDuration(title);

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

  }

//})(this, jQuery);
}());

$(function() {

  if ( $("#serviceReliabilityComponents").length > 0 ) {

    //these vars are used throughout this script
    var countyName = 'statewide';
    var lastUpdate = '';

    //document.addEventListener("DOMContentLoaded", function(event) {

      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart', 'gauge'],'callback': function() {

        //set the action for the dropdown to reload fatality data
        document.querySelector('#ListCounty').onchange = function(e) {
            loadIncidentDuration(this.value);
        }

        //make the first call to load the statewide fatality data
        loadIncidentDuration('Statewide');

      }});

    //});

  }

}());

function loadIncidentDuration(whichCounty) {

    countyName = whichCounty;

    //this is currently set to load the data from a static JSON file that was dumped from DOT
    //webservice.  This needs to be configured to load from the DOT webservice. The URL
    //for the webservice is commented out below

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../../assets/text/incident-duration.txt');
    //xhr.open('GET', 'https://apps.ncdot.gov/dot/dashboard/api/incidentduration/'+whichCounty);
    xhr.onload = function() {
        if (xhr.status === 200) {
            drawIncidentDuration(this.responseText);
        }
        else {
            alert('Could not load data');
        }
    };
    xhr.send();
}

function drawIncidentDuration(objData) {

    ///////

    //the JSON data is structured a little differently since you can call each county directly.  Once this data
    //comes from the DOT webservice, you won't need these lines
    objData = JSON.parse(objData);
    //grab the last updated date
    lastUpdate = objData.ArrayOfCountyData.lastUpdate;
    //set the objData variable to the correct level in the JSON
    var countyData = objData.ArrayOfCountyData.CountyData;
    //find which county you need
    for (var c=0; c <= (countyData.length-1); c++) {
        if (countyData[c].CountyName === countyName) {
            incidentClearanceTime = countyData[c].AverageClearanceTime;
            break;
        }
    }

    ///////

    var incidentData = google.visualization.arrayToDataTable([
                  ['Label', 'Value'],
                  ["Minutes", Number(incidentClearanceTime)],
                ]);

    //set the header text for each gauge chart
    if (countyName !== 'Statewide') {
        countyName += ' County';
    }

    document.getElementById('clearanceTimeHeading').innerHTML = 'Incident Clearance Time: ' + countyName;

    var options = {
      width: 500, height: 200,
      redFrom:110, redTo: 120,
      yellowFrom: 90 , yellowTo: 110,
      greenFrom: 60, greenTo: 90,
      minorTicks: 0,
      max:120,
      min:60,
      redColor: '#A83338',
      yellowColor: '#C05411',
      greenColor: '#588023'
    };

    var incidentDurationChart = new google.visualization.Gauge(document.getElementById('incidentDurationChart'));
    incidentDurationChart.draw(incidentData, options);

}

//this function will take the text strings that are numbers and format them with commas
//and 2 decimal places
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
