import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

function Calendar() {

    const handleDateClick = (arg) => { 
        alert(arg.dateStr)
    }

    return (
        <FullCalendar
        plugins={[ dayGridPlugin , interactionPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={[
          { title: 'event 1', date: '2021-03-01' },
          { title: 'event 2', date: '2021-03-02' },
        ]}
        eventColor="blue"
        dateClick={handleDateClick}
      />
    )
}

export default Calendar
