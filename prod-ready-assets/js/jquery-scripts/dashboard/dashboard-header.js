(function($) {
  $.DashboardHeader = function(element, options) {
    try {
      var settings = $.extend({}, $.DashboardHeader.defaultOptions, options);

      var templateScript = "<h2 class='heading heading--beta'>{{title}}</h2><p>{{summary}}</p>";

      // Compile the template
      var template = Handlebars.compile(templateScript);

      // Define data object
      var context = {
        title: settings.definition.title ? settings.definition.title : "",
        summary: settings.definition.summary ? settings.definition.summary : ""
      };

      // render template and add to attached element
      var renderedHtml = template(context);
      $(element).append(renderedHtml);
    } catch (error) {
      console.log(error);
    }
  };

  $.DashboardHeader.defaultOptions = {
    defintion: null
  };

  $.fn.dashboardHeader = function(options) {
    return this.each(function() {
      new $.DashboardHeader($(this), options);
    });
  };
})(jQuery);
