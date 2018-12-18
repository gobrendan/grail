//
// fullcalendar init -- custom calendar displays
//

$(function() {

  $("#calendar").fullCalendar({

    eventLimit: 4, 

    events: [
      {
        title  : 'Conference',
        start  : '2018-09-03T08:00:00', 
        allDay : false,  // will make the time show

        color: '#ce0000'

      },
      {
        title  : 'Office Meeting',
        start  : '2018-09-05', 
        end    : '2018-09-07', 
        
        color: '#028abe'

      },
      {
        title  : 'Office Meeting',
        start  : '2018-09-05', 
        end    : '2018-09-07', 
        
        color: '#98cb4e'

      }, 
      {
        title  : 'Office Meeting',
        start  : '2018-09-05', 
        end    : '2018-09-07', 

        color: '#f47c2e'

      }, 
      {
        title  : 'Office Meeting',
        start  : '2018-09-05', 
        end    : '2018-09-07', 

        color: '#069'

      }, 
      {
        title  : 'Office Meeting',
        start  : '2018-09-05', 
        end    : '2018-09-07', 

        color: '#069'

      }, 
      {
        title  : 'Office Meeting',
        start  : '2018-09-05', 
        end    : '2018-09-07', 

        color: '#069'

      }, 
      {
        title  : 'Office Meeting',
        start  : '2018-09-05', 
        end    : '2018-09-07', 

        color: '#069'
        
      }
    ]
    
  });

}());