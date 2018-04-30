
(function($) {
  $.DashboardModuleGauge = function(element, options) {
    try {
      var settings = $.extend({}, $.DashboardModuleGauge.defaultOptions, options);
      var randomId = Date.now();

      var templateScript =
        "<div class='gauge-box__gauge-wrapper'>" +
        "    <div class='gauge-box__gauge dashboard-circle'>" +
        "      <div id='{{gaugeId}}'></div>" +
        "    </div>" +
        "    <div class='dashboard-component-details'>" +
        "      <p>" +
        "        <span>{{{summary}}}</span>" +
        "      </p>" +
        "    </div>" +
        "  </div>" +
        "</div>";

      // Compile the template
      var template = Handlebars.compile(templateScript);

      // Define data object
      var context = {
        gaugeId: "gaugeId-" + settings.widget.id + randomId,
        countyName: settings.countyName,
        summary: settings.widget.summary ? settings.widget.summary : "",
        currentYearValue: getCurrentYearValue()
      };

      dataReady();

      function getCurrentYearValue() {
        if (settings.widget.chartValue) return settings.widget.chartValue;
        if (settings.dataRecord) {
          var propName = settings.widget.propName;
          return settings.dataRecord[propName];
        }
        return 0;
      }

      function dataReady() {
        // render template and add to attached element
        var renderedHtml = template(context);
        $(element).html(renderedHtml);

        $(document).ready(function() {
          $("#" + context.gaugeId).canvasGauge({
            id: settings.widget.id,
            chartValue: context.currentYearValue,
            chartLowMinValue: settings.widget.chartLowMinValue,
            chartLowMaxValue: settings.widget.chartLowMaxValue,
            chartMediumMaxValue: settings.widget.chartMediumMaxValue,
            chartHighMaxValue: settings.widget.chartHighMaxValue,
            chartType: settings.widget.chartType
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  $.DashboardModuleGauge.defaultOptions = {
    countyName: "Statewide",
    dataArray: [],
    widget: {}
  };

  $.fn.dashboardModuleGauge = function(options) {
    return this.each(function() {
      new $.DashboardModuleGauge($(this), options);
    });
  };
})(jQuery);
