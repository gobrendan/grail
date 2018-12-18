//
// datatables init -- provide functionality to tables (sort, filter, paginate, etc.)
//

$(function() {

  $('.gr-c-table--sortable').DataTable({

    "lengthMenu": [
      [5, 10, 25, -1], 
      [5, 10, 25, "All"]
    ], 

    // after dataTables initalizes

    "initComplete": function() {

      // init custom <select> styling

      $(this).closest(".dataTables_wrapper").find(".dataTables_length").find("select").dropkick();

    }

  });

}());