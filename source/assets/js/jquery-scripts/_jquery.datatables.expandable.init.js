//
// DataTables init -- show child row toggle
//


// sample table

function hiddenCountyInfoNew(d) {

  return '<table class="table--clean table--auto-width">'+
    '<tr>'+
      '<td>Website:</td>'+
      '<td><a href=' + d.website + '>'+d.website+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td>Email:</td>'+
      '<td><a href=mailto:' + d.email + '>'+d.email+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td>Fax:</td>'+
      '<td>'+d.fax+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td>Mailbox:</td>'+
      '<td>'+d.mailbox+'</td>'+
    '</tr>'+
  '</table>'

}

$(document).ready(function() {
  var table = $('#sampleExpandableTable').DataTable({

    "ajax": "../../assets/text/expandable-table-demo.txt",

    "columns": [
      {
        "className":      'details-control',
        "orderable":      false,
        "data":           null,
        "defaultContent": ''
      },
      {
        "data": "county",
        "orderable": true
      },
      {
        "data": "address",
        "orderable": false
      },
      {
        "data": "phone",
        "orderable": false
      }
    ],

    "searching" : false,
    "paging" : false,
    "bInfo" : false,
    "lengthMenu" : false,
    "bLengthChange": false,
    "iDisplayLength": 25,

    // "order": [[1, "asc"]],
    // "lengthMenu": [
    //   [10, 25, 50, -1],
    //   [10, 25, 50, "All"]
    // ],
    // "iDisplayLength": 25,

    "initComplete": function(settings, json) {

      //

    }

  });

  // Add event listener for opening and closing details
  $('#sampleExpandableTable tbody').on('click', 'td.details-control', function () {

    var tr = $(this).closest('tr');
    var row = table.row( tr );

    if ( row.child.isShown() ) {
      // This row is already open - close it
      row.child.hide();
      tr.removeClass('shown');
    }

    else {
      // Open this row
      row.child( hiddenCountyInfoNew(row.data()) ).show();
      tr.addClass('shown');
    }

  });
});


// County Tax Offices

function hiddenCountyInfo(d) {

  return '<table class="table--clean table--auto-width">'+
    '<tr>'+
      '<td>Website:</td>'+
      '<td><a href=' + d.website + '>'+d.website+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td>Email:</td>'+
      '<td><a href=mailto:' + d.email + '>'+d.email+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td>Fax:</td>'+
      '<td>'+d.fax+'</td>'+
    '</tr>'+
    '<tr>'+
      '<td>Mailbox:</td>'+
      '<td>'+d.mailbox+'</td>'+
    '</tr>'+
  '</table>'

}

$(document).ready(function() {
  var table = $('#countyTaxOffices').DataTable({

    "ajax": "../../assets/text/tax-offices.txt",

    "columns": [
      {
        "className":      'details-control',
        "orderable":      false,
        "data":           null,
        "defaultContent": ''
      },
      {
        "data": "county",
        "orderable": true
      },
      {
        "data": "address",
        "orderable": false
      },
      {
        "data": "phone",
        "orderable": false
      }
    ],

    "order": [[1, "asc"]],
    "lengthMenu": [
      [10, 25, 50, -1],
      [10, 25, 50, "All"]
    ],
    "iDisplayLength": 25,

    "initComplete": function(settings, json) {

      // Apply custom styling to <select> element

      $(this).closest(".dataTables_wrapper").find(".dataTables_length select").selectBoxIt();

      // Apply custom sizing to custom <select> element

      $(this).closest(".dataTables_wrapper").find(".selectboxit-container .selectboxit").addClass("selectboxit--small");
      $(this).closest(".dataTables_wrapper").find(".selectboxit-container .selectboxit-options").addClass("selectboxit-options--small");

    }

  });

  // Add event listener for opening and closing details
  $('#countyTaxOffices tbody').on('click', 'td.details-control', function () {

    var tr = $(this).closest('tr');
    var row = table.row( tr );

    if ( row.child.isShown() ) {
      // This row is already open - close it
      row.child.hide();
      tr.removeClass('shown');
    }

    else {
      // Open this row
      row.child( hiddenCountyInfo(row.data()) ).show();
      tr.addClass('shown');
    }

  });
});


// Project Progress Report > Active Construction & Maintenance table

function hiddenConstructionInfo(d) {
  // `d` is the original data object for the row

  return '' +
  '<h4 class="heading u-no-top-margin">' +
    'Key Metrics' +
  '</h4>' +
  '<table class="table--clean table--auto-width">' +
    '<tr>' +
      '<td>Contract Amount:</td>' +
      '<td>' + d.contractAmount + '</td>' +
    '</tr>' +
    '<tr>' +
      '<td class="u-text-no-wrap">Work Began:</td>' +
      '<td>' + d.workBegan + '</td>' +
    '</tr>' +
    '<tr>' +
      '<td class="u-text-no-wrap">Location Description:</td>' +
      '<td>' + d.locationDesc + '</td>' +
    '</tr>' +
  '</table>' +
  '<h4 class="heading">' +
    'Project Profile' +
  '</h4>' +
  '<table class="table--clean table--auto-width">' +
    '<tr>' +
      '<td class="u-text-no-wrap">Location Description:</td>' +
      '<td>' + d.profileLocationDesc + '</td>' +
    '</tr>' +
    '<tr>' +
      '<td class="u-text-no-wrap">Contractor Name:</td>' +
      '<td>' + d.contractorName + '</td>' +
    '</tr>' +
    '<tr>' +
      '<td>Route:</td>' +
      '<td>' + d.route + '</td>' +
    '</tr>' +
    '<tr>' +
      '<td>County:</td>' +
      '<td>' + d.county + '</td>' +
    '</tr>' +
    '<tr>' +
      '<td class="u-text-no-wrap">Federal Aid Number:</td>' +
      '<td>' + d.federalAidNum + '</td>' +
    '</tr>' +
    '<tr>' +
      '<td>Length:</td>' +
      '<td>' + d.length + '</td>' +
    '</tr>' +
  '</table>'
}

$(document).ready(function() {
  var table = $('#activeConstruction').DataTable({

    "ajax": "../../assets/text/active-construction.txt",

    "columns": [
      {
        "className":      'details-control',
        "orderable":      false,
        "data":           null,
        "defaultContent": ''
      },
      {
        "data": "contractNumber",
        "orderable": true
      },
      {
        "data": "typeOfWork",
        "orderable": true
      }
    ],

    "order": [[1, "asc"]],
    "lengthMenu": [
      [10, 25, 50, -1],
      [10, 25, 50, "All"]
    ],
    "iDisplayLength": 25,

    "initComplete": function(settings, json) {

      // Apply custom styling to <select> element

      $(this).closest(".dataTables_wrapper").find(".dataTables_length select").selectBoxIt();

      // Apply custom sizing to custom <select> element

      $(this).closest(".dataTables_wrapper").find(".selectboxit-container .selectboxit").addClass("selectboxit--small");
      $(this).closest(".dataTables_wrapper").find(".selectboxit-container .selectboxit-options").addClass("selectboxit-options--small");

    }

  });

  // Add event listener for opening and closing details
  $('#activeConstruction tbody').on('click', 'td.details-control', function () {

    var tr = $(this).closest('tr');
    var row = table.row( tr );

    if ( row.child.isShown() ) {
      // This row is already open - close it
      row.child.hide();
      tr.removeClass('shown');
    }

    else {
      // Open this row
      row.child( hiddenConstructionInfo(row.data()) ).show();
      tr.addClass('shown');
    }

  });
});
