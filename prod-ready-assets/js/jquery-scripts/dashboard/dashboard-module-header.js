function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

(function($) {
  $.DashboardModuleHeader = function(element, options) {
    try {
      var settings = $.extend({}, $.DashboardModuleHeader.defaultOptions, options);

      var templateScript =
        "<h3 class='heading heading--gamma dashboard-component__heading chart-box__heading'>" +
        "<span class='dashboard-component__heading-inner--first'>{{title}}</span>" +
        "<span class='dashboard-component__heading-inner--last'>{{subtitle}}</span>" +
        "</h3>";

      // Compile the template
      var template = Handlebars.compile(templateScript);

      // Define data object
      var context = {
        title: settings.widget ? buildTitle() : "",
        subtitle: settings.widget ? buildSubtitle() : ""
      };

      dataReady();

      function buildTitle() {
        var countyName = settings.countyName ? settings.countyName : "";
        var value = settings.currentYearValue ? settings.currentYearValue : "";
        return settings.widget.title
          ? settings.widget.title.replace("%countyname%", countyName).replace("%value%", value)
          : "";
      }

      function buildSubtitle() {
        return settings.widget.subtitle ? settings.widget.subtitle : "";
      }

      function dataReady() {
        // render template and add to attached element
        var renderedHtml = template(context);
        $(element).html(renderedHtml);
      }
    } catch (error) {
      console.log(error);
    }
  };

  $.DashboardModuleHeader.defaultOptions = {
    widget: {},
    countyName: "Statewide",
    currentYearValue: 0
  };

  $.fn.dashboardModuleHeader = function(options) {
    return this.each(function() {
      new $.DashboardModuleHeader($(this), options);
    });
  };
})(jQuery);
