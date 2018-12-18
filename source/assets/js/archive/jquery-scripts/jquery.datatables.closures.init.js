//
// DataTables init -- init for "Closures and Traffic" table (DOT homepage)
//

$(function() {
  
    $("#closures_trafficXXX").DataTable({
  
      "searching": false,        // Filter field
      "bSort": false,            // Column sorting -- 'true' by default
      "order": [[ 0, "asc" ]],  // Default sorting -- use '[]' for no default sorting
      //"bInfo" : true,         //
      //"sDom" : "fitip",         //
      //responsive : true,        // Relies on DataTables responsive plugin
      //"pageLength" : 2,       // Rows per "page"

      "scrollY":        "200px",
      "scrollCollapse": true,
      "paging":         false, 
  
      "initComplete": function(settings, json) {
  
        // Initalize "selectBoxIt" plugin on "length" <select> element
        // $(this).closest(".dataTables_wrapper").find(".dataTables_length select").selectBoxIt();
  
        // Add class (modifier) to custom "length" menu
        // $(this).closest(".dataTables_wrapper").find(".selectboxit-container .selectboxit").addClass("selectboxit--small");
        // $(this).closest(".dataTables_wrapper").find(".selectboxit-container .selectboxit-options").addClass("selectboxit-options--small");
  
      }
  
    });
  
  }());
  