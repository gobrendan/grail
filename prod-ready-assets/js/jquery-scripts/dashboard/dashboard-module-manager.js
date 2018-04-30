function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

(function($) {
  $.DashboardModuleManager = function(element, options) {
    try {
      var settings = $.extend({}, $.DashboardModuleManager.defaultOptions, options);
      var randomId = Date.now();
      var pageUpdated = false;

      var templateScript =
        "<section class='page-layout__section'>" +
        "  <div class='page-layout__section-inner'>" +
        "    <p>{{{summary}}}</p>" +
        // "    {{#if_eq displayRegionMap 'true'}}" +
        "    <div id='{{regionId}}' class='no-print' style='margin-top:40px;'></div>" +
        // "    {{/if_eq}}" +
        "    <h3 class='heading heading--gamma'>{{dataFrequencyTitle}}</h3>" +
        "    <div id='{{dashboardId}}' class='dashboard-component gauge-box'></div>" +
        "    <p>{{{footnote}}}</p>" +
        "  </div>" +
        "</section>";

      // Compile the template
      var template = Handlebars.compile(templateScript);

      // Define data object
      var context = {
        dashboardId: "dashboardId-" + randomId,
        regionId: "regionId-" + randomId,
        summary: settings.definition.summary ? settings.definition.summary : "",
        footnote: settings.definition.footnote ? settings.definition.footnote : "",
        dataFrequencyTitle: settings.definition.dataFrequencyTitle ? settings.definition.dataFrequencyTitle : "",
        countyName: "Statewide",
        displayRegionMap: settings.definition.displayRegionMap === false ? "false" : "true",
        currentYearValue: 0,
        dataArray: [],
        dataRecord: null
      };

      init();

      function init() {
        if (settings.definition.webServices) {
          runDashboardQuery();
        } else {
          dataReady();
        }
      }

      function runDashboardQuery() {
        var queries = [];
        $.each(settings.definition.webServices, function(index, service) {
          var url = getServiceUrl(service);
          var loadLastRecord = service.loadLastRecord === true;
          queries.push(getDashboardServerData(url, loadLastRecord));
        });
        $.when
          .apply($, queries)
          .fail(function() {
            console.log("error in dashboard module queries");
          })
          .done(function() {
            dataReady();
          });
      }

      function getServiceUrl(service) {
        if (service.queryCountyId === false) {
          return service.appendCounty === true ? service.url + context.countyName : service.url;
        }
        if (service.appendCounty === true) {
          return context.countyId === undefined || context.countyId.toString() === "-1"
            ? service.url
            : service.url + context.countyId;
        }
        return service.url;
      }

      function getDashboardServerData(url, loadLastRecord) {
        var dfd = $.Deferred();
        $.ajax({
          url: url,
          method: "GET",
          crossDomain: true,
          success: function(data) {
            if (data.constructor === Array) {
              context.dataArray = data;
              if (loadLastRecord === true) {
                context.dataRecord = data.length > 0 ? data[data.length - 1] : null;
              }
            } else {
              context.dataRecord = data;
            }
            dfd.resolve("");
          },
          error: function() {
            console.log("error in dashboard server data");
            dfd.resolve("");
          }
        });

        return dfd.promise();
      }

      function dataReady() {
        // render template and add to attached element
        if (pageUpdated === false) {
          var renderedHtml = template(context);
          $(element).html(renderedHtml);
        }

        $(document).ready(function() {
          if (pageUpdated === false) {
            // $("#" + context.regionId).regionMap({
            //   wrapInSection: true,
            //   svgFile: "/assets/images/ncstatemap.svg",
            //   onCountyClick: function(countyId, countyName, event) {
            //     event.preventDefault();
            //     context.countyName = countyName;
            //     context.countyId = countyId;
            //     init();
            //   }
            // });

            pageUpdated = true;
          }

          var dashboardItemGroup = $("#" + context.dashboardId);

          dashboardItemGroup.empty();

          $.each(settings.definition.widgets, function(index, widget) {
            $(dashboardItemGroup).append("<div id='ID" + widget.id + "'></div>");
            if (widget.dataType === "header") {
              $("#ID" + widget.id).dashboardModuleHeader({
                widget: widget,
                currentYearValue: context.currentYearValue,
                countyName: context.countyName
              });
            } else if (widget.dataType === "gauge") {
              $("#ID" + widget.id).dashboardModuleGauge({
                widget: widget,
                countyName: context.countyName,
                data: context.dataArray,
                dataRecord: context.dataRecord
              });
            } else if (widget.dataType === "barchart") {
              $("#ID" + widget.id).dashboardModuleBarChart({
                widget: widget,
                data: widget.responseFormat === "hardcode" ? widget.data : context.dataArray
              });
            } else if (widget.dataType === "table") {
              $("#ID" + widget.id).dashboardModuleTable({
                widget: widget,
                data: widget.responseFormat === "hardcode" ? widget.data : context.dataArray
              });
            }
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  $.DashboardModuleManager.defaultOptions = {
    definition: ""
  };

  $.fn.dashboardModuleManager = function(options) {
    return this.each(function() {
      new $.DashboardModuleManager($(this), options);
    });
  };
})(jQuery);
