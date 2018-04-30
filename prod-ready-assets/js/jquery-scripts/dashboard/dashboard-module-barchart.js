/* global NCDOTUtilities, google */

(function($) {
  $.DashboardModuleBarChart = function(element, options) {
    try {
      var settings = $.extend({}, $.DashboardModuleBarChart.defaultOptions, options);
      var randomId = Date.now();

      var templateScript =
        "<h3 class='heading heading--gamma dashboard-component__heading chart-box__heading'>" +
        "  <span class='dashboard-component__heading-inner--first' id='{{titleId}}'>{{title}}</span>" +
        "  <span class='dashboard-component__heading-inner--last' id='{{subtitleId}}'>{{subtitle}}</span>" +
        "</h3>" +
        "<div id='{{barChartId}}' style='height:220px;'></div>" +
        "<p class='table-wrapper__caption'>{{caption}}</p>";

      // Compile the template
      var template = Handlebars.compile(templateScript);

      // Define data object
      var context = {
        barChartId: "barChartId-" + randomId,
        titleId: "titleId-" + randomId,
        subtitleId: "subtitleId-" + randomId,
        totalValue: 0,
        caption: settings.widget.caption ? settings.widget.caption : ""
      };

      dataReady();

      function buildTitle() {
        var countyName = settings.countyName ? settings.countyName : "";
        return settings.widget.title
          ? settings.widget.title.replace("%countyname%", countyName).replace("%value%", context.totalValue)
          : "";
      }

      function buildSubtitle() {
        return settings.widget.subtitle ? settings.widget.subtitle : "";
      }

      function formatData(value, formatType) {
        if (formatType === "m/yyyy") {
          var values = value.split("/");
          var month = parseInt(values[0]) - 1;
          var year = values[1];
          var date = new Date(year, month);
          var locale = "en-us";
          var monthStr = date.toLocaleString(locale, { month: "short" });
          return monthStr;
        } else if (formatType === "SFYyyyy") {
          return value.substring(3, 7);
        }
        return value;
      }

      function buildDataTable() {
        var hAxisPropName = settings.widget.hAxisPropName;
        var vAxisPropNames = settings.widget.vAxisPropNames;
        var vAxisColumnTitles = settings.widget.vAxisColumnTitles;
        var hAxisPropNameFormat = settings.widget.hAxisPropNameFormat;

        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn("string", hAxisPropName);
        $.each(vAxisColumnTitles, function(index, title) {
          dataTable.addColumn("number", title);
        });
        $.each(settings.data, function(index, row) {
          var dataRowArray = [];
          var dataRow = [];
          dataRow.push(formatData(row[hAxisPropName].toString(), hAxisPropNameFormat));
          $.each(vAxisColumnTitles, function(index2) {
            var numb = Number(row[vAxisPropNames[index2]]);
            dataRow.push(numb);
          });
          dataRowArray.push(dataRow);
          dataTable.addRows(dataRowArray);
        });
        return dataTable;
      }

      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      function calcTotal() {
        var vAxisPropNames = settings.widget.vAxisPropNames;
        if (vAxisPropNames.length === 1 && settings.data.length > 0) {
          var propName = vAxisPropNames[0];
          var record = settings.data[settings.data.length - 1];
          var total = record[propName];
          context.totalValue = numberWithCommas(total);
        }
      }

      function dataReady() {
        // render template and add to attached element
        var renderedHtml = template(context);
        $(element).html(renderedHtml);

        $(document).ready(function() {
          google.charts.load("current", { packages: ["corechart"] });
          google.charts.setOnLoadCallback(drawChart);

          function drawChart() {
            var dataTable = buildDataTable();
            calcTotal();
            var title = buildTitle();
            var subtitle = buildSubtitle();

            var options = {
              legend: { position: "top" },
              hAxis: {
                title: settings.widget.hAxisCaption,
                logScale: true,
                format: "MMM"
              },
              animation: {
                duration: 1500,
                easing: "inAndOut",
                startup: true
              },
              vAxis: {
                title: settings.widget.vAxisCaption,
                logScale: false
              },
              fontName: "TransportHeavy",
              fontSize: "16px",
              colors: ["#397AAC", "#A83338", "#588023"]
            };

            var barChart = new google.visualization.ColumnChart(document.getElementById(context.barChartId));
            barChart.draw(dataTable, options);

            $("#" + context.titleId).html(title);
            $("#" + context.subtitleId).html(subtitle);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  $.DashboardModuleBarChart.defaultOptions = {
    countyName: "Statewide",
    widget: {},
    data: []
  };

  $.fn.dashboardModuleBarChart = function(options) {
    return this.each(function() {
      new $.DashboardModuleBarChart($(this), options);
    });
  };
})(jQuery);
