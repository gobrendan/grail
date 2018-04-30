//
// DataTables init -- generic init for tables
//

$(function() {

  $(".ms-rteTable-default, .ncdotTable-default, .table--custom").not(".table--length-search, .table--reset-search, .table--length-reset-search").DataTable({

    "searching": true, 
    "paging": true, 
    "bSort": true, 
    "order": [[ 0, "asc" ]], 
    "sDom" : "iftip",
    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], 
    responsive : true, 

    "initComplete": function(settings, json) {

      //

    }

  });

  $(".table--length-search").DataTable({
    
    "searching": true, 
    "paging": true, 
    "bSort": true, 
    "order": [[ 0, "asc" ]], 
    //"sDom" : "fitip", 
    "sDom" : "lfitip", 
    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], 
    // "bPaginate": true,
    // "bLengthChange": 25, 
    // "iDisplayLength": 25, 
    responsive : true, 

    "initComplete": function(settings, json) {

      // Initalize "selectBoxIt" plugin on "length" <select> element
      $(this).closest(".dataTables_wrapper").find(".dataTables_length select").selectBoxIt();

      // Add class (modifier) to custom "length" menu
      $(this).closest(".dataTables_wrapper").find(".selectboxit-container .selectboxit").addClass("selectboxit--small");
      $(this).closest(".dataTables_wrapper").find(".selectboxit-container .selectboxit-options").addClass("selectboxit-options--small");

    }

  });

  $(".table--reset-search").DataTable({
    
    "searching": true, 
    "paging": true, 
    "bSort": true, 
    "order": [[ 0, "asc" ]], 
    "sDom" : "if<'dataTables_reset'>tip",
    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], 
    responsive : true, 

    "initComplete": function(settings, json) {

      var resetButton = "<a id='btnReset' class='btn btn--ghost' href='javascript:;'>Reset</a>";
      
      $(".dataTables_reset").html(resetButton);

    }

  });
  
  $(".table--length-reset-search").DataTable({
    
    "searching": true, 
    "paging": true, 
    "bSort": true, 
    "order": [[ 0, "asc" ]], 
    "sDom" : "lf<'dataTables_reset'>itip",
    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]], 
    responsive : true, 

    "initComplete": function(settings, json) {

      // Initalize "selectBoxIt" plugin on "length" <select> element
      $(this).closest(".dataTables_wrapper").find(".dataTables_length select").selectBoxIt();

      // Add class (modifier) to custom "length" menu
      $(this).closest(".dataTables_wrapper").find(".selectboxit-container .selectboxit").addClass("selectboxit--small");
      $(this).closest(".dataTables_wrapper").find(".selectboxit-container .selectboxit-options").addClass("selectboxit-options--small");


      var resetButton = "<a id='btnReset' class='btn btn--ghost' href='javascript:;'>Reset</a>";
      
      $(".dataTables_reset").html(resetButton);

    }

  });

}());
