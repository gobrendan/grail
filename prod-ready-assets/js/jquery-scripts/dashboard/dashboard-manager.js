/* global NCDOTUtilities */

(function($) {
  $.DashboardManager = function(element, options) {
    try {
      var settings = $.extend({}, $.DashboardManager.defaultOptions, options);

      var templateScript =
        "<section class='page-layout__section'>" +
        "  <div class='page-layout__section-inner'>" +
        "    <div class='dashboard__item-group'></div'>" +
        "  </div>" +
        "</section>";

      // Compile the template
      var template = Handlebars.compile(templateScript);

      // Define data object
      var context = {
        definitions: []
      };

      init();

      function init() {
        $.when(getDashboardJsonData())
          .fail(function() {
            console.log("error in dashboard json");
          })
          .done(function() {
            dataReady();
          });
      }

      function getDashboardJsonData() {
        var dfd = $.Deferred();
        $.getJSON(settings.jsonFile, function(data) {
          $.each(data, function(index, item) {
            context.definitions.push(item);
          });
          dfd.resolve("");
        });
        return dfd.promise();
      }

      function dataReady() {
        // render template and add to attached element
        var renderedHtml = template(context);
        $(element).html(renderedHtml);

        $(document).ready(function() {
          getHtmlItems();
        });
      }

      function getHtmlItems() {
        var dashboardItemGroup = $(".dashboard__item-group");

        $.each(context.definitions, function(index, item) {

          // if (NCDOTUtilities._contains(settings.selectedIds, item.id)) {
          // if (settings.ids.includes(item.id) === true) {

            $(dashboardItemGroup).append("<div id='ID" + item.id + "'></div>");
            if (item.dataType === "header") {
              $("#ID" + item.id).dashboardHeader({
                definition: item
              });
            } else if (item.dataType === "goal-table") {
              $("#ID" + item.id).dashboardGoalTable({
                definition: item
              });
            } else if (item.dataType === "dashboard-module") {
              $("#ID" + item.id).dashboardModuleManager({
                definition: item
              });
            }

          // }

        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  $.DashboardManager.defaultOptions = {
    jsonFile: "",
    selectedIds: []
  };

  $.fn.dashboardManager = function(options) {
    return this.each(function() {
      new $.DashboardManager($(this), options);
    });
  };
})(jQuery);

// if (!Array.prototype.includes) {
//   Object.defineProperty(Array.prototype, "includes", {
//     value: function(searchElement, fromIndex) {
//       if (this === null) {
//         throw new TypeError('"this" is null or not defined');
//       }

//       // 1. Let O be ? ToObject(this value).
//       var o = Object(this);

//       // 2. Let len be ? ToLength(? Get(O, "length")).
//       var len = o.length >>> 0;

//       // 3. If len is 0, return false.
//       if (len === 0) {
//         return false;
//       }

//       // 4. Let n be ? ToInteger(fromIndex).
//       // (If fromIndex is undefined, this step produces the value 0.)
//       var n = fromIndex | 0;

//       // 5. If n ≥ 0, then
//       // a. Let k be n.
//       // 6. Else n < 0,
//       // a. Let k be len + n.
//       // b. If k < 0, let k be 0.
//       var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

//       function sameValueZero(x, y) {
//         return x === y || (typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y));
//       }

//       // 7. Repeat, while k < len
//       while (k < len) {
//         // a. Let elementK be the result of ? Get(O, ! ToString(k)).
//         // b. If SameValueZero(searchElement, elementK) is true, return true.
//         if (sameValueZero(o[k], searchElement)) {
//             return true;
//         }
//         // c. Increase k by 1.
//         k++;
//       }

//       // 8. Return false
//       return false;
//     }
//   });
// }