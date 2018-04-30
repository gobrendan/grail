/* global NCDOTUtilities */

(function($) {
  $.DashboardModuleTable = function(element, options) {
    try {
      var settings = $.extend({}, $.DashboardModuleHeader.defaultOptions, options);
      var randomId = Date.now();

      var templateScript =
        "<table id='{{ tableBlockId }}' class='js-table--sortable'>" +
        "<caption class='visuallyhidden'>" +
        "{{title}}" +
        "</caption>" +
        "</table>" +
        "<p class='table-wrapper__caption'>{{caption}}</p>";

      // Compile the template
      var template = Handlebars.compile(templateScript);

      // Define data object
      var context = {
        tableBlockId: "tableBlockId-" + randomId,
        title: "Performance Dashboard Table",
        caption: settings.widget.caption ? settings.widget.caption : ""
      };

      dataReady();

      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      function getColumns() {
        var columns = settings.widget.columns.map(function(col) {
          var column = {
            title: col.title,
            data: col.data,
            orderable: col.orderable
          };
          if (col.dataFormat) {
            if (col.dataFormat === "number") {
              var prefix = col.prefix ? col.prefix : "";
              var suffix = col.suffix ? col.suffix : "";
              column.render = function(data) {
                return prefix + numberWithCommas(data) + suffix;
              };
            }
          }
          return column;
        });
        return columns;
      }

      function dataReady() {
        // render template and add to attached element
        var renderedHtml = template(context);
        $(element).html(renderedHtml);

        $.fn.dataTableExt.sErrMode = "mute";
        $("#" + context.tableBlockId).DataTable({
          responsive: true,
          sDom: "ft",
          data: settings.data,
          columns: getColumns(),
          order: [[0, "desc"]],
          bLengthChange: false,
          iDisplayLength: 500,
          searching: false
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  $.DashboardModuleTable.defaultOptions = {
    data: [],
    widget: []
  };

  $.fn.dashboardModuleTable = function(options) {
    return this.each(function() {
      new $.DashboardModuleTable($(this), options);
    });
  };
})(jQuery);
