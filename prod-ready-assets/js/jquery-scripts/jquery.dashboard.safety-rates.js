//
// Dashboard > Fatality Rate
//

//(function(window, $, undefined){
$(function() {

  if ( $("#safetyRatesComponents").length > 0 ) {

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

                    loadFatalityData(title);

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

  //these vars are used throughout this script
  var countyName = 'statewide';
  var lastUpdate = '';

  if ( $("#safetyRatesComponents").length > 0 ) {

    //document.addEventListener("DOMContentLoaded", function(event) {

      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart'],'callback': function() {

        //set the action for the dropdown to reload fatality data
        document.querySelector('#ListCounty').onchange = function(e) {
            loadFatalityData(this.value);
        }

        //make the first call to load the statewide fatality data
        loadFatalityData('Statewide');

      }});

    //});

  }

}());

function loadFatalityData(whichCounty) {

    countyName = whichCounty;

    //this is currently set to load the data from a static JSON file that was dumped from DOT
    //webservice.  This needs to be configured to load from the DOT webservice. The URL
    //for the webservice is commented out below

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../../assets/text/fatality-rate.txt');
    //xhr.open('GET', 'https://apps.ncdot.gov/dot/dashboard/api/safety/'+whichCounty);
    xhr.onload = function() {
        if (xhr.status === 200) {
            drawFatalityChart(this.responseText);
        }
        else {
            alert('Could not load data');
        }
    };
    xhr.send();
}

function drawFatalityChart(objData) {

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
            objData = countyData[c].CrashRateByYear;
            break;
        }
    }

    ///////

    /* below here should remain the same once you are able to call the DOT webservice */
    var dataFatality = new google.visualization.DataTable();
    var dataCrashes = new google.visualization.DataTable();
    var dataInjuries = new google.visualization.DataTable();
    var yearlyStatistics = new google.visualization.DataTable();

    dataFatality.addColumn('string', 'Year');
    dataCrashes.addColumn('string', 'Year');
    dataInjuries.addColumn('string', 'Year');

    //dataFatality.addColumn({type: 'number', "Fatalities", role: 'style'});
    dataFatality.addColumn('number', "Fatalities");
    dataCrashes.addColumn('number', "Crashes");
    dataInjuries.addColumn('number', "Injuries");

    var yearlyStatisticsTable = document.createElement('table');
    //add bootstrap classes in
    //yearlyStatisticsTable.classList.add('table','table-striped','table-hover');
    yearlyStatisticsTable.className += 'table';
    yearlyStatisticsTable.className += ' table-striped';
    yearlyStatisticsTable.className += ' table-hover';

    var tableBodyTag = document.createElement('tbody');
    yearlyStatisticsTable.appendChild(tableBodyTag);

    var yearlyStatisticsTableHeader = yearlyStatisticsTable.insertRow();
    yearlyStatisticsTableHeader.insertCell().outerHTML = '<th>Year</th>';
    yearlyStatisticsTableHeader.insertCell().outerHTML = '<th>Crashes</th>';
    yearlyStatisticsTableHeader.insertCell().outerHTML = '<th>Fatalities</th>';
    yearlyStatisticsTableHeader.insertCell().outerHTML = '<th>Injuries</th>';
    yearlyStatisticsTableHeader.insertCell().outerHTML = '<th>VMT(100MVM)</th>';
    yearlyStatisticsTableHeader.insertCell().outerHTML = '<th>Crash Rate</th>';
    yearlyStatisticsTableHeader.insertCell().outerHTML = '<th>Fatality Rate</th>';
    yearlyStatisticsTableHeader.insertCell().outerHTML = '<th>Injury Rate</th>';

    var fatalityTotal = 0;
    var crashesTotal = 0;
    var injuryTotal = 0;


    for (var i=0; i <= (objData.length-1); i++) {

        var item = objData[i];
        var yearlyStatTableRow = document.createElement('tr');

        //Fatalities
        dataFatality.addRows([[item.Year.toString(), Number(item.Fatalities)]]);

        //Crashes
        dataCrashes.addRows([[item.Year.toString(), Number(item.Crashes)]]);

        //Injuries
        dataInjuries.addRows([[item.Year.toString(), Number(item.Injuries)]]);

        //append table cells to the yearly stat table row
        var newYearlyStatRow = yearlyStatisticsTable.insertRow();

        var newCell = newYearlyStatRow.insertCell();
        var newText = document.createTextNode(item.Year.toString());
        newCell.appendChild(newText);

        newCell = newYearlyStatRow.insertCell();
        newText = document.createTextNode(formatCommas(item.Crashes.toString()));
        newCell.appendChild(newText);

        newCell = newYearlyStatRow.insertCell();
        newText = document.createTextNode(formatCommas(item.Fatalities.toString()));
        newCell.appendChild(newText);

        newCell = newYearlyStatRow.insertCell();
        newText = document.createTextNode(formatCommas(item.Injuries.toString()));
        newCell.appendChild(newText);

        newCell = newYearlyStatRow.insertCell();
        newText = document.createTextNode(formatCommas(item.VMT.toString()));
        newCell.appendChild(newText);

        newCell = newYearlyStatRow.insertCell();
        newText = document.createTextNode(formatCommas(item.CrashRate.toString()));
        newCell.appendChild(newText);

        newCell = newYearlyStatRow.insertCell();
        newText = document.createTextNode(formatCommas(item.FatalityRate.toString()));
        newCell.appendChild(newText);

        newCell = newYearlyStatRow.insertCell();
        newText = document.createTextNode(formatCommas(item.InjuryRate.toString()));
        newCell.appendChild(newText);


        if (i == objData.length-1) {
            //the totals are the last item in the array
            fatalityTotal = item.Fatalities;
            crashesTotal = item.Crashes;
            injuryTotal = item.Injuries;
        }
    }

    //clear out the old yearly stat table
    var yearlyStatTableContainer = document.getElementById('yearlyStatistics');

    while (yearlyStatTableContainer.firstChild) {
        yearlyStatTableContainer.removeChild(yearlyStatTableContainer.firstChild);
    }

    //append the yearly stat table to the DOM
    yearlyStatTableContainer.appendChild(yearlyStatisticsTable);


    var options = {
        legend: { position: 'top' },
        hAxis: {
          title: 'Year',
          logScale: true,
          showTextEvery:2
        },
        animation: {
            duration: 1500,
            easing: 'inAndOut',
            startup: true //This is the new option
        },
        vAxis: {
          title: 'Quantity',
          logScale: false
        },
       'fontName': 'TransportHeavy',
       'fontSize': '16px',
       'colors': ['#5F6C7B']
    };

    //append 'county' to the name of the county, since it doesn't come through in the JSON
    if (countyName !== 'Statewide') {
        countyName += ' County';
    }

    var chartFatalities = new google.visualization.ColumnChart(document.getElementById('chartFatalities'));
    chartFatalities.draw(dataFatality, options);

    //set the total fatalities
    var fatalityTotalHeader = document.getElementById('fatalityTotalHeader');
    fatalityTotalHeader.innerHTML = 'Total ' + countyName + ' Fatalities: ' + formatCommas(fatalityTotal);


    var chartInjuries = new google.visualization.ColumnChart(document.getElementById('chartInjuries'));
    chartInjuries.draw(dataInjuries, options);

    //set the total injuries
    var injuryTotalHeader = document.getElementById('injuryTotalHeader');
    injuryTotalHeader.innerHTML = 'Total ' + countyName + ' Injuries: ' + formatCommas(injuryTotal);


    var chartCrashes = new google.visualization.ColumnChart(document.getElementById('chartCrashes'));
    chartCrashes.draw(dataCrashes, options);

    //set the total crashes
    //var crashesTotalHeader = document.querySelector('.crashesTotalHeader');
    var crashesTotalHeader = document.getElementById('crashesTotalHeader');
    crashesTotalHeader.innerHTML = 'Total ' + countyName + ' Crashes: ' + formatCommas(crashesTotal);

    var statTotalHeader = document.getElementById('yearlyStatHeader');
    statTotalHeader.innerHTML = '<span class="dashboard-component__heading-inner--first">Yearly Statistics: ' + countyName + '</span><span class="dashboard-component__heading-inner--last">Data current as of: ' + lastUpdate + '</span>';

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
