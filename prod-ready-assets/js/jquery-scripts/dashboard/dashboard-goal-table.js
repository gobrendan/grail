/* global CountUp */

(function($) {
  $.DashboardGoalTable = function(element, options) {
    try {
      var settings = $.extend({}, $.DashboardGoalTable.defaultOptions, options);
      var randomId = Date.now();

      var templateScript =
        "<section class='page-layout__section'>" +
        "  <div class='page-layout__section-inner'>" +
        "    <h3 class='heading heading--gamma'>{{title}}</h3>" +
        "    <p><strong>Objective: </strong>{{{summary}}}</p>" +
        "    <p><strong>Performance measure: </strong><a href='{{moreLinkUrl}}'>{{moreLinkTitle}}</a></p>" +
        "    <div table-wrapper'>" +
        "      <table class='table--alt'>" +
        "        <thead>" +
        "          <tr>" +
        "            <th>" +
        "              <span>" +
        "                Previous Result" +
        "              </span>" +
        "            </th>" +
        "            <th>" +
        "              <span>" +
        "                Current Result" +
        "              </span>" +
        "            </th>" +
        "            <th>" +
        "              <span>" +
        "                Target Met" +
        "              </span>" +
        "            </th>" +
        "          </tr>" +
        "        </thead>" +
        "        <tbody>" +
        "          <tr>" +
        "            <td id='{{goalTableResultsId1}}'></td>" +
        "            <td id='{{goalTableResultsId2}}'></td>" +
        "            <td id='{{goalTableResultsId3}}'></td>" +
        "          </tr>" +
        "        </tbody>" +
        "      </table>" +
        "    </div>" +
        // "    {{#if_eq displayCaption 'true'}}" +
        "    <p class='table-wrapper__caption'>{{caption}}</p>" +
        // "    {{/if_eq}}" +
        "  </div>" +
        "</section>";

      // Compile the template
      var template = Handlebars.compile(templateScript);

      // Define data object
      var context = {
        jsCountUp: "js-countup" + randomId,
        goalTableResultsId1: "goalTableResultsId1-" + randomId,
        goalTableResultsId2: "goalTableResultsId2-" + randomId,
        goalTableResultsId3: "goalTableResultsId3-" + randomId,
        title: settings.definition.title ? settings.definition.title : "",
        summary: settings.definition.summary ? settings.definition.summary : "",
        moreLinkUrl: settings.definition.moreLinkUrl ? settings.definition.moreLinkUrl : "",
        moreLinkTitle: settings.definition.moreLinkTitle ? settings.definition.moreLinkTitle : "",
        displayCaption: settings.definition.caption !== undefined ? "true" : "false",
        caption: settings.definition.caption ? settings.definition.caption : "",
        previousResult: "",
        currentResult: "",
        targetMetResult: ""
      };

      init();

      function init() {
        if (settings.definition.webService) {
          runDashboardQuery();
        } else {
          dataReady();
        }
      }

      function runDashboardQuery() {
        $.when(getDashboardServerData())
          .fail(function() {
            console.log("error in dashboard query");
          })
          .done(function() {
            dataReady();
          });
      }

      function getDashboardServerData() {
        var goal = settings.definition;
        var dfd = $.Deferred();
        $.ajax({
          url: goal.webService.url,
          method: "GET",
          crossDomain: true,
          success: function(data) {
            var currentYearValue = "";
            var previousYearValue = "";
            if (goal.webService.current === "last") {
              var currentYear = data[data.length - 1];
              if (currentYear[goal.webService.propName]) {
                currentYearValue = currentYear[goal.webService.propName];
                goal.currentResult = currentYearValue;
              }
            }
            if (goal.webService.previous === "last-1") {
              var previousYear = data[data.length - 2];
              if (previousYear[goal.webService.propName]) {
                previousYearValue = previousYear[goal.webService.propName];
                goal.previousResult = previousYearValue;
              }
            }
            if (goal.webService.current === "record") {
              if (data[goal.webService.propName]) {
                currentYearValue = data[goal.webService.propName];
                goal.currentResult = currentYearValue;
              }
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
        var renderedHtml = template(context);
        $(element).html(renderedHtml);

        $(document).ready(function() {
          var goal = settings.definition;
          var td1 = getGoalResultHtml(
            goal.previousResult,
            goal.previousResultPrefix,
            goal.previousResultSuffix,
            goal.decimals
          );
          var td2 = getGoalResultHtml(
            goal.currentResult,
            goal.currentResultPrefix,
            goal.currentResultSuffix,
            goal.decimals
          );
          var td3 = getGoalTargetHtml();
          $("#" + context.goalTableResultsId1).replaceWith(td1);
          $("#" + context.goalTableResultsId2).replaceWith(td2);
          $("#" + context.goalTableResultsId3).replaceWith(td3);

          $.each($("." + context.jsCountUp), function() {
            var count = $(this).data("count");
            var decimals = $(this).data("decimals");
            var numAnim = new CountUp(this, 0, count, decimals, 3.0);
            numAnim.start();
          });
        });
      }

      function getGoalResultHtml(result, prefix, suffix, decimals) {
        var value = result;
        var valuePrefix = prefix ? prefix : "";
        var valueSuffix = suffix ? suffix : "";
        var jsCountClass = context.jsCountUp.toString();
        decimals = decimals ? decimals : 0;
        if (value === "N/A") {
          return "<td>" + "<span>" + value + "</span>" + "</td>";
        }
        if (value === "N/A") {
          return "<td>" + "<span>" + value + "</span>" + "</td>";
        }
        return (
          "<td>" +
          "<span>" +
          valuePrefix +
          "<span data-count='" +
          value +
          "' data-decimals='" +
          decimals +
          "' class='numberToBeCounted " +
          jsCountClass +
          "'>" +
          value +
          "</span>" +
          valueSuffix +
          "</span>" +
          "</td>"
        );
      }

      function getGoalTargetValuel() {
        var goal = settings.definition;
        if (goal.currentResult === "N/A" || goal.previousResult === "N/A") return true;
        if (goal.targetMetType === "lessThanTarget") {
          return goal.currentResult < goal.targetGoal;
        }

        if (goal.targetMetType === "greaterThanTarget") {
          return goal.currentResult > goal.targetGoal;
        }

        return true;
      }

      function getGoalTargetHtml() {
        var targetMet = getGoalTargetValuel();
        var className = targetMet ? "icon-check-circle icon--success" : "icon-close-box-outline icon--error";
        return "<td><span class='fade-in one'><i class='" + className + "'></i></span></td>";
      }
    } catch (error) {
      console.log(error);
    }
  };

  $.DashboardGoalTable.defaultOptions = {
    definition: ""
  };

  $.fn.dashboardGoalTable = function(options) {
    return this.each(function() {
      new $.DashboardGoalTable($(this), options);
    });
  };
})(jQuery);
