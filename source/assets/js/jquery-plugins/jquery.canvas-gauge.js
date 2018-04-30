/* global RadialGauge */

(function($) {
  $.CanvasGauge = function(element, options) {
    try {
      var settings = $.extend({}, $.CanvasGauge.defaultOptions, options);
      var randomId = Date.now();

      var templateScript = "<div id='{{ canvasGaugeContainerId }}'></div>";

      // Compile the template
      var template = Handlebars.compile(templateScript);

      // Define data object
      var context = {
        canvasGaugeContainerId: "canvasGaugeContainerId-" + settings.id + randomId
      };

      // render template and add to attached element
      var renderedHtml = template(context);
      $(element).html(renderedHtml);

      $(document).ready(function() {
        // initialize chart
        var gauge = new RadialGauge({
          renderTo: document.createElement("canvas"),
          width: 300,
          height: 300,
          units: "",
          title: false,
          value: 0,
          // startAngle: 90,
          // ticksAngle: 180,
          minValue: settings.chartLowMinValue,
          maxValue: settings.chartHighMaxValue,
          majorTicks: [],
          minorTicks: 1,
          strokeTicks: false,
          highlights: [
            {
              from: settings.chartLowMinValue,
              to: settings.chartLowMaxValue,
              color: settings.chartType === "ryg" ? "red" : "green"
            },
            {
              from: settings.chartLowMaxValue,
              to: settings.chartMediumMaxValue,
              color: "#FFCC00"
            },
            {
              from: settings.chartMediumMaxValue,
              to: settings.chartHighMaxValue,
              color: settings.chartType === "ryg" ? "green" : "red"
            }
          ],
          highlightsWidth: 35,
          colorPlate: "#FFF",
          colorMajorTicks: "transparent",
          colorMinorTicks: "transparent",
          colorNumbers: "transparent",
          borders: false,
          borderShadowWidth: 0,
          needleType: "arrow",
          needleWidth: 3,
          colorNeedle: "#222",
          colorNeedleEnd: "#222",
          needleCircleSize: 2,
          needleCircleOuter: true,
          needleCircleInner: true,
          animationRule: "quad",
          animationDuration: 1500,
          valueBox: settings.displayValueBox,
          valueBoxStroke: 0,
          valueBoxBorderRadius: 0,
          valueText: settings.chartValue,
          valueBoxWidth: 25
          // colorValueBoxRect: "#FF0000",
          // colorValueBoxRectEnd: "#FF0000",
          // colorValueBoxBackground: "#FFF",
          // colorValueBoxShadow: "#FF0000"
        });

        $("#" + context.canvasGaugeContainerId).html(gauge.options.renderTo);
        // draw initially and set value
        gauge.draw();
        gauge.value = settings.chartValue;
      });
    } catch (error) {
      console.log(error);
    }
  };

  $.CanvasGauge.defaultOptions = {
    id: 0,
    chartValue: 92,
    chartLowMinValue: 0,
    chartLowMaxValue: 40,
    chartMediumMaxValue: 90,
    chartHighMaxValue: 100,
    chartType: "ryg",
    displayValueBox: false
  };

  $.fn.canvasGauge = function(options) {
    return this.each(function() {
      new $.CanvasGauge($(this), options);
    });
  };
})(jQuery);
