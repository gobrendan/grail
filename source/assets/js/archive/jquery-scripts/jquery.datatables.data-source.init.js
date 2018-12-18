//
// DataTables init -- use data source
//

$(function() {

  $("#employeeDirectory").DataTable({

    "searching": true,         // Filter field
    // "paging": false,           // Pagination
    // "bSort": false,            // Column sorting -- 'true' by default
    // "order": [[ 0, "asc" ]],   // Default sorting -- use '[]' for no default sorting
    // "bInfo" : false,           // "Showing 1 of 2" text,
    responsive : true,            // Relies on DataTables responsive plugin
    "bLengthChange": false,
    "iDisplayLength": 25,
    "ajax": "../../assets/text/employees.txt",

    // "language": {
    //   "search": "Search:"
    // },

    "initComplete": function(settings, json) {

      // Apply custom styling to <select> element

      $(this).closest(".dataTables_wrapper").find(".dataTables_length select").selectBoxIt();

      // Apply custom sizing to custom <select> element

      $(this).closest(".dataTables_wrapper").find(".selectboxit-container .selectboxit").addClass("selectboxit--small");
      $(this).closest(".dataTables_wrapper").find(".selectboxit-container .selectboxit-options").addClass("selectboxit-options--small");

    }

  });

}());
